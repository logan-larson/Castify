<script>
	import { quizStore, answerQuestion, nextQuestion, previousQuestion, completeQuiz } from '$lib/stores/quiz.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let selectedAnswer = null;

	$: currentQuestion = $quizStore.questions[$quizStore.currentQuestionIndex];
	$: isFirstQuestion = $quizStore.currentQuestionIndex === 0;
	$: isLastQuestion = $quizStore.currentQuestionIndex === $quizStore.questions.length - 1;
	$: progress = (($quizStore.currentQuestionIndex + 1) / $quizStore.questions.length) * 100;

	onMount(() => {
		if ($quizStore.questions.length === 0) {
			goto('/');
		}
		// Load saved answer for current question
		selectedAnswer = $quizStore.answers[$quizStore.currentQuestionIndex];
	});

	$: {
		// Update selected answer when question changes
		selectedAnswer = $quizStore.answers[$quizStore.currentQuestionIndex];
	}

	function selectAnswer(index) {
		selectedAnswer = index;
		answerQuestion($quizStore.currentQuestionIndex, index);
	}

	function handleNext() {
		if (isLastQuestion) {
			completeQuiz();
			goto('/quiz/results');
		} else {
			nextQuestion();
		}
	}

	function handlePrevious() {
		previousQuestion();
	}
</script>

<svelte:head>
	<title>Take Quiz - Podcast Quiz Generator</title>
</svelte:head>

{#if currentQuestion}
	<div class="space-y-6">
		<!-- Progress Bar -->
		<div class="bg-white rounded-lg shadow-md p-6">
			<div class="flex justify-between items-center mb-2">
				<span class="text-sm font-medium text-gray-700">
					Question {$quizStore.currentQuestionIndex + 1} of {$quizStore.questions.length}
				</span>
				<span class="text-sm font-medium text-indigo-600">
					{Math.round(progress)}% Complete
				</span>
			</div>
			<div class="w-full bg-gray-200 rounded-full h-2">
				<div
					class="bg-indigo-600 h-2 rounded-full transition-all duration-300"
					style="width: {progress}%"
				></div>
			</div>
		</div>

		<!-- Question Card -->
		<div class="bg-white rounded-lg shadow-md p-6 md:p-8">
			<h2 class="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
				{currentQuestion.question}
			</h2>

			<div class="space-y-3">
				{#each currentQuestion.options as option, index}
					<button
						on:click={() => selectAnswer(index)}
						class="w-full text-left p-4 rounded-lg border-2 transition-all duration-200 {selectedAnswer === index
							? 'border-indigo-600 bg-indigo-50'
							: 'border-gray-200 hover:border-indigo-300 bg-white'}"
					>
						<div class="flex items-center">
							<div
								class="flex-shrink-0 w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center {selectedAnswer === index
									? 'border-indigo-600 bg-indigo-600'
									: 'border-gray-300'}"
							>
								{#if selectedAnswer === index}
									<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
										<path
											fill-rule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clip-rule="evenodd"
										/>
									</svg>
								{/if}
							</div>
							<span class="text-gray-900 flex-1">{option}</span>
						</div>
					</button>
				{/each}
			</div>
		</div>

		<!-- Navigation -->
		<div class="flex gap-3">
			{#if !isFirstQuestion}
				<button
					on:click={handlePrevious}
					class="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
				>
					Previous
				</button>
			{/if}

			<button
				on:click={handleNext}
				disabled={selectedAnswer === null}
				class="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
			>
				{isLastQuestion ? 'Finish Quiz' : 'Next Question'}
			</button>
		</div>

		<!-- Question Navigator -->
		<div class="bg-white rounded-lg shadow-md p-6">
			<h3 class="text-sm font-medium text-gray-700 mb-3">Quick Navigation</h3>
			<div class="flex flex-wrap gap-2">
				{#each $quizStore.questions as _, index}
					<button
						on:click={() => {
							$quizStore.currentQuestionIndex = index;
						}}
						class="w-10 h-10 rounded-lg border-2 font-medium transition-all {index === $quizStore.currentQuestionIndex
							? 'border-indigo-600 bg-indigo-600 text-white'
							: $quizStore.answers[index] !== null
								? 'border-green-500 bg-green-50 text-green-700'
								: 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}"
					>
						{index + 1}
					</button>
				{/each}
			</div>
		</div>
	</div>
{/if}
