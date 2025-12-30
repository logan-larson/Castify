<script>
	import '../app.css';
</script>

<div class="min-h-screen">
	<header class="bg-white shadow-sm">
		<div class="max-w-4xl mx-auto px-4 py-6">
			<h1 class="text-3xl font-bold text-indigo-600">Podcast Quiz Generator</h1>
		</div>
	</header>

	<main class="max-w-4xl mx-auto px-4 py-8">
		<slot />
	</main>

	<footer class="text-center py-8 text-gray-500 text-sm">
		<p>Powered by AI - Generate quizzes from podcast transcripts</p>
	</footer>
</div>
