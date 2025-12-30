# Podcast Quiz Generator

An AI-powered application that generates multiple-choice quizzes from podcast transcripts. Built with SvelteKit (frontend) and Go (backend).

## Features

- 📝 **Transcript Input**: Paste any podcast transcript to generate a quiz
- 🤖 **AI-Powered**: Uses OpenAI's GPT-4 to create intelligent, contextual questions
- 📱 **Responsive Design**: Works seamlessly on mobile and desktop
- ✅ **Interactive Quiz**: Clean, intuitive interface for taking quizzes
- 📊 **Results Review**: Detailed breakdown of correct and incorrect answers
- 🎯 **Progress Tracking**: Visual progress bar and question navigation

## Tech Stack

### Frontend
- **SvelteKit 2.0** - Modern web framework
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Vite 5** - Fast build tool

### Backend
- **Go 1.21** - High-performance backend
- **OpenAI API** - GPT-4o-mini for quiz generation
- **CORS Support** - Cross-origin resource sharing

## Prerequisites

- **Node.js** 18+ and npm
- **Go** 1.21+
- **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)

## Installation

### 1. Clone the repository

```bash
cd quiz-generator
```

### 2. Set up the Backend

```bash
cd backend

# Install Go dependencies
go mod download

# Create environment file
cp .env.example .env

# Edit .env and add your OpenAI API key
# OPENAI_API_KEY=your_api_key_here
```

### 3. Set up the Frontend

```bash
cd frontend

# Install dependencies
npm install
```

## Running the Application

You'll need to run both the backend and frontend servers.

### Terminal 1: Start the Backend

```bash
cd backend
go run main.go
```

The backend will start on `http://localhost:8080`

### Terminal 2: Start the Frontend

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

## Usage

1. Open your browser to `http://localhost:5173`
2. Paste a podcast transcript (minimum 100 characters)
3. Click "Generate Quiz" and wait for the AI to create questions
4. Answer the multiple-choice questions
5. Navigate between questions using Next/Previous buttons or the question navigator
6. Click "Finish Quiz" to see your results
7. Review which answers were correct/incorrect

## API Endpoints

### `POST /api/generate-quiz`

Generate a quiz from a transcript.

**Request Body:**
```json
{
  "transcript": "Your podcast transcript here..."
}
```

**Response:**
```json
{
  "questions": [
    {
      "question": "What is the main topic discussed?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct": 0
    }
  ]
}
```

### `GET /health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

## Project Structure

```
quiz-generator/
├── backend/
│   ├── main.go              # Go server with OpenAI integration
│   ├── go.mod               # Go dependencies
│   ├── .env.example         # Environment variables template
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── +layout.svelte      # Root layout
│   │   │   ├── +page.svelte        # Home page (transcript input)
│   │   │   └── quiz/
│   │   │       ├── +page.svelte    # Quiz interface
│   │   │       └── results/
│   │   │           └── +page.svelte # Results page
│   │   ├── lib/
│   │   │   └── stores/
│   │   │       └── quiz.js         # Quiz state management
│   │   ├── app.html                # HTML template
│   │   └── app.css                 # Global styles
│   ├── static/                     # Static assets
│   ├── package.json
│   ├── svelte.config.js
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

## Environment Variables

### Backend (.env)

```
OPENAI_API_KEY=your_openai_api_key
PORT=8080
```

## Building for Production

### Backend

```bash
cd backend
go build -o quiz-generator
./quiz-generator
```

### Frontend

```bash
cd frontend
npm run build
npm run preview
```

## Docker Support (Optional)

You can containerize the application for easier deployment:

### Backend Dockerfile

```dockerfile
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o quiz-generator

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/quiz-generator .
EXPOSE 8080
CMD ["./quiz-generator"]
```

### Frontend Dockerfile

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
RUN npm ci --production
EXPOSE 3000
CMD ["node", "build"]
```

## Troubleshooting

### Backend Issues

- **"OPENAI_API_KEY environment variable is required"**: Make sure you've created a `.env` file with your API key
- **CORS errors**: The backend is configured to allow all origins in development. For production, update the CORS settings in `main.go`

### Frontend Issues

- **API requests fail**: Ensure the backend is running on port 8080
- **Module not found**: Run `npm install` in the frontend directory
- **Build errors**: Make sure you're using Node.js 18+

## License

This project is part of the Castify repository.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
