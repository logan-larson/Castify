import { writable } from 'svelte/store';

export const quizStore = writable({
	questions: [],
	currentQuestionIndex: 0,
	answers: [],
	isComplete: false
});

export function resetQuiz() {
	quizStore.set({
		questions: [],
		currentQuestionIndex: 0,
		answers: [],
		isComplete: false
	});
}

export function setQuestions(questions) {
	quizStore.update(state => ({
		...state,
		questions,
		currentQuestionIndex: 0,
		answers: new Array(questions.length).fill(null),
		isComplete: false
	}));
}

export function answerQuestion(questionIndex, answerIndex) {
	quizStore.update(state => {
		const newAnswers = [...state.answers];
		newAnswers[questionIndex] = answerIndex;
		return {
			...state,
			answers: newAnswers
		};
	});
}

export function nextQuestion() {
	quizStore.update(state => ({
		...state,
		currentQuestionIndex: state.currentQuestionIndex + 1
	}));
}

export function previousQuestion() {
	quizStore.update(state => ({
		...state,
		currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1)
	}));
}

export function completeQuiz() {
	quizStore.update(state => ({
		...state,
		isComplete: true
	}));
}
