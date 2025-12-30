package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
	"github.com/rs/cors"
	openai "github.com/sashabaranov/go-openai"
)

type QuizRequest struct {
	Transcript string `json:"transcript"`
}

type Question struct {
	Question string   `json:"question"`
	Options  []string `json:"options"`
	Correct  int      `json:"correct"` // Index of correct answer (0-3)
}

type QuizResponse struct {
	Questions []Question `json:"questions"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}

var openaiClient *openai.Client

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	apiKey := os.Getenv("OPENAI_API_KEY")
	if apiKey == "" {
		log.Fatal("OPENAI_API_KEY environment variable is required")
	}

	openaiClient = openai.NewClient(apiKey)

	mux := http.NewServeMux()
	mux.HandleFunc("/api/generate-quiz", handleGenerateQuiz)
	mux.HandleFunc("/health", handleHealth)

	// Configure CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // In production, specify exact origins
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: false,
	})

	handler := c.Handler(mux)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	server := &http.Server{
		Addr:         ":" + port,
		Handler:      handler,
		ReadTimeout:  120 * time.Second,
		WriteTimeout: 120 * time.Second,
	}

	log.Printf("Server starting on port %s...", port)
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}

func handleHealth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

func handleGenerateQuiz(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		respondWithError(w, http.StatusMethodNotAllowed, "Method not allowed")
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Failed to read request body")
		return
	}
	defer r.Body.Close()

	var req QuizRequest
	if err := json.Unmarshal(body, &req); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid JSON format")
		return
	}

	if req.Transcript == "" {
		respondWithError(w, http.StatusBadRequest, "Transcript is required")
		return
	}

	if len(req.Transcript) < 100 {
		respondWithError(w, http.StatusBadRequest, "Transcript is too short (minimum 100 characters)")
		return
	}

	// Generate quiz using OpenAI
	quiz, err := generateQuiz(req.Transcript)
	if err != nil {
		log.Printf("Error generating quiz: %v", err)
		respondWithError(w, http.StatusInternalServerError, "Failed to generate quiz")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(quiz)
}

func generateQuiz(transcript string) (*QuizResponse, error) {
	ctx := context.Background()

	systemPrompt := `You are a quiz generator. Create a multiple-choice quiz based on the podcast transcript provided.
Generate 5-10 questions that test understanding of the key concepts, facts, and discussions in the transcript.

Each question should have:
- A clear question
- Exactly 4 answer options
- One correct answer (indicated by its index 0-3)

Return the response as a valid JSON object with this exact structure:
{
  "questions": [
    {
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct": 0
    }
  ]
}

Make the questions engaging and test real comprehension, not just memorization.`

	userPrompt := fmt.Sprintf("Generate a quiz for this podcast transcript:\n\n%s", transcript)

	resp, err := openaiClient.CreateChatCompletion(
		ctx,
		openai.ChatCompletionRequest{
			Model: "gpt-4o-mini",
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleSystem,
					Content: systemPrompt,
				},
				{
					Role:    openai.ChatMessageRoleUser,
					Content: userPrompt,
				},
			},
			ResponseFormat: &openai.ChatCompletionResponseFormat{
				Type: openai.ChatCompletionResponseFormatTypeJSONObject,
			},
			Temperature: 0.7,
			MaxTokens:   2000,
		},
	)

	if err != nil {
		return nil, fmt.Errorf("OpenAI API error: %w", err)
	}

	if len(resp.Choices) == 0 {
		return nil, fmt.Errorf("no response from OpenAI")
	}

	content := resp.Choices[0].Message.Content

	var quiz QuizResponse
	if err := json.Unmarshal([]byte(content), &quiz); err != nil {
		return nil, fmt.Errorf("failed to parse quiz JSON: %w", err)
	}

	// Validate the quiz
	if len(quiz.Questions) == 0 {
		return nil, fmt.Errorf("no questions generated")
	}

	for i, q := range quiz.Questions {
		if len(q.Options) != 4 {
			return nil, fmt.Errorf("question %d has %d options, expected 4", i, len(q.Options))
		}
		if q.Correct < 0 || q.Correct > 3 {
			return nil, fmt.Errorf("question %d has invalid correct answer index: %d", i, q.Correct)
		}
	}

	return &quiz, nil
}

func respondWithError(w http.ResponseWriter, code int, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(ErrorResponse{Error: message})
}
