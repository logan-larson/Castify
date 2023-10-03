<script>

</script>

<!-- Timestamps and Scrubber -->
<div class="flex items-center space-x-4">
	<!-- Current Time -->
	<span class="text-white text-xs">21:50</span>
	
	<!-- Scrubber -->
	<div class="relative flex-grow">
		<input type="range" min="0" max="100" value="50" class="slider w-full h-1.5 cursor-pointer rounded-full bg-gray-600 appearance-none outline-none">
		<div class="absolute top-[10px] left-0 h-1.5 w-1/2 bg-white rounded-full"></div>
	</div>
	
	<!-- Total Time -->
	<span class="text-white text-xs">22:30</span>
</div>

<!-- TailwindCSS for the custom range slider -->
<style>
    .slider::-webkit-slider-thumb {
        height: 10px;
        width: 10px;
        background-color: white;
        cursor: pointer;
        appearance: none;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-top: -4px; /* For proper vertical alignment */
    }
    .slider::-moz-range-thumb {
        height: 10px;
        width: 10px;
        background-color: white;
        cursor: pointer;
        appearance: none;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-top: -4px; /* For proper vertical alignment */
    }
</style>