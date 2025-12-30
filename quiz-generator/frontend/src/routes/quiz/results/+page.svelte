<script>
	import { quizStore, resetQuiz } from '$lib/stores/quiz.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let score = 0;
	let percentage = 0;

	onMount(() => {
		if ($quizStore.questions.length === 0 || !$quizStore.isComplete) {
			goto('/');
			return;
		}

		// Calculate score
		score = $quizStore.answers.reduce((total, answer, index) => {
			if (answer === $quizStore.questions[index].correct) {
				return total + 1;
			}
			return total;
		}, 0);

		percentage = Math.round((score / $quizStore.questions.length) * 100);
	});

	function handleRetry() {
		resetQuiz();
		goto('/');
	}

	function getScoreColor(pct) {
		if (pct >= 80) return 'text-green-600';
		if (pct >= 60) return 'text-yellow-600';
		return 'text-red-600';
	}

	function getScoreMessage(pct) {
		if (pct === 100) return 'Perfect Score!';
		if (pct >= 80) return 'Excellent!';
		if (pct >= 60) return 'Good Job!';
		if (pct >= 40) return 'Not Bad!';
		return 'Keep Trying!';
	}
</script>

<svelte:head>
	<title>Quiz Results - Podcast Quiz Generator</title>
</svelte:head>

<div class="space-y-6">
	<!-- Score Card -->
	<div class="bg-white rounded-lg shadow-md p-8 text-center">
		<h2 class="text-3xl font-bold mb-4">Quiz Complete!</h2>
		<div class="mb-6">
			<div class="text-6xl font-bold {getScoreColor(percentage)} mb-2">
				{percentage}%
			</div>
			<div class="text-2xl font-semibold text-gray-700 mb-2">
				{getScoreMessage(percentage)}
			</div>
			<div class="text-lg text-gray-600">
				You got {score} out of {$quizStore.questions.length} questions correct
			</div>
		</div>

		<div class="flex gap-3 justify-center">
			<button
				on:click={handleRetry}
				class="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
			>
				Try Another Quiz
			</button>
		</div>
	</div>

	<!-- Question Review -->
	<div class="bg-white rounded-lg shadow-md p-6">
		<h3 class="text-xl font-semibold mb-6">Review Your Answers</h3>
		<div class="space-y-6">
			{#each $quizStore.questions as question, index}
				{@const userAnswer = $quizStore.answers[index]}
				{@const isCorrect = userAnswer === question.correct}
				<div class="border-l-4 pl-4 {isCorrect ? 'border-green-500' : 'border-red-500'}">
					<div class="flex items-start justify-between mb-2">
						<h4 class="font-medium text-gray-900 flex-1">
							{index + 1}. {question.question}
						</h4>
						{#if isCorrect}
							<span class="flex-shrink-0 ml-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
								Correct
							</span>
						{:else}
							<span class="flex-shrink-0 ml-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
								Incorrect
							</span>
						{/if}
					</div>

					<div class="space-y-2 mt-3">
						{#each question.options as option, optionIndex}
							<div
								class="p-3 rounded-lg {optionIndex === question.correct
									? 'bg-green-50 border-2 border-green-500'
									: optionIndex === userAnswer && !isCorrect
										? 'bg-red-50 border-2 border-red-500'
										: 'bg-gray-50 border border-gray-200'}"
							>
								<div class="flex items-center">
									{#if optionIndex === question.correct}
										<svg class="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
											<path
												fill-rule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clip-rule="evenodd"
											/>
										</svg>
										<span class="text-green-900 font-medium">{option}</span>
										<span class="ml-2 text-sm text-green-700">(Correct Answer)</span>
									{:else if optionIndex === userAnswer && !isCorrect}
										<svg class="w-5 h-5 text-red-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
											<path
												fill-rule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
												clip-rule="evenodd"
											/>
										</svg>
										<span class="text-red-900">{option}</span>
										<span class="ml-2 text-sm text-red-700">(Your Answer)</span>
									{:else}
										<span class="text-gray-700 ml-7">{option}</span>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
