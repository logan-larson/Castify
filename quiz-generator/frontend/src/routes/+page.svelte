<script>
	import { goto } from '$app/navigation';
	import { setQuestions } from '$lib/stores/quiz.js';

	let transcript = '';
	let loading = false;
	let error = '';

	async function generateQuiz() {
		if (!transcript.trim()) {
			error = 'Please enter a transcript';
			return;
		}

		if (transcript.length < 100) {
			error = 'Transcript is too short (minimum 100 characters)';
			return;
		}

		loading = true;
		error = '';

		try {
			const response = await fetch('/api/generate-quiz', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ transcript })
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to generate quiz');
			}

			const data = await response.json();
			setQuestions(data.questions);
			goto('/quiz');
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}

	function loadSampleTranscript() {
		transcript = `Welcome to TechTalk, the podcast where we explore the latest in technology and innovation.
Today, we're diving deep into the world of artificial intelligence and machine learning.

Our guest today is Dr. Sarah Chen, a leading researcher in AI ethics at Stanford University.
Dr. Chen has been studying the implications of AI on society for over a decade.

One of the key topics we discussed is the concept of algorithmic bias. Dr. Chen explained that
AI systems can inadvertently perpetuate or even amplify existing biases present in training data.
For example, facial recognition systems have been shown to have higher error rates for people
with darker skin tones because the training datasets were predominantly composed of lighter-skinned individuals.

We also talked about the importance of transparency in AI systems. Dr. Chen emphasized that as AI
becomes more prevalent in critical decision-making processes - from loan approvals to medical diagnoses -
it's crucial that we can understand and explain how these systems arrive at their conclusions.

Another fascinating point was about the future of AI regulation. Dr. Chen believes that we need a
balanced approach that encourages innovation while protecting individuals from potential harm.
She mentioned the European Union's AI Act as a promising step in this direction.

Finally, we discussed the role of education in preparing the next generation for an AI-driven world.
Dr. Chen stressed that it's not just about teaching people to code, but also about fostering critical
thinking skills and ethical reasoning.

Thank you for listening to TechTalk. Join us next week when we'll be exploring quantum computing
with Professor James Rodriguez.`;
	}
</script>

<svelte:head>
	<title>Podcast Quiz Generator</title>
</svelte:head>

<div class="space-y-6">
	<div class="bg-white rounded-lg shadow-md p-6">
		<h2 class="text-2xl font-semibold mb-4">Generate a Quiz from Your Podcast Transcript</h2>
		<p class="text-gray-600 mb-6">
			Paste a podcast transcript below and our AI will generate a multiple-choice quiz to test
			comprehension of the key concepts discussed.
		</p>

		<div class="space-y-4">
			<div>
				<label for="transcript" class="block text-sm font-medium text-gray-700 mb-2">
					Podcast Transcript
				</label>
				<textarea
					id="transcript"
					bind:value={transcript}
					placeholder="Paste your podcast transcript here..."
					rows="12"
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y"
					disabled={loading}
				/>
				<p class="mt-1 text-sm text-gray-500">
					{transcript.length} characters (minimum 100 required)
				</p>
			</div>

			{#if error}
				<div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
					{error}
				</div>
			{/if}

			<div class="flex gap-3">
				<button
					on:click={generateQuiz}
					disabled={loading}
					class="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					{#if loading}
						<span class="flex items-center justify-center">
							<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							Generating Quiz...
						</span>
					{:else}
						Generate Quiz
					{/if}
				</button>

				<button
					on:click={loadSampleTranscript}
					disabled={loading}
					class="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					Load Sample
				</button>
			</div>
		</div>
	</div>

	<div class="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
		<h3 class="font-semibold text-indigo-900 mb-2">How it works:</h3>
		<ol class="list-decimal list-inside space-y-2 text-indigo-800">
			<li>Paste or type a podcast transcript (minimum 100 characters)</li>
			<li>Click "Generate Quiz" and wait for AI to create questions</li>
			<li>Answer the multiple-choice questions one by one</li>
			<li>Review your results and see which answers were correct</li>
		</ol>
	</div>
</div>
