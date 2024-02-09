<script>
    import { currentEpisode, currentTime, duration } from "$lib/stores/player";
    import { RangeSlider } from "@skeletonlabs/skeleton";
    import { format } from "$lib/utils/formatting";

    export let inFullPlayer = false;

    $: formattedCurrentTime = format($currentTime);
    $: formattedDuration = format($duration);

    currentEpisode.subscribe((value) => {
        formattedCurrentTime = format($currentTime);
        formattedDuration = format($duration);
    });
</script>

<!-- Scrubber -->
<RangeSlider name="timeline" min="0" max="{$duration}" step="1" bind:value={$currentTime} class="w-[90%] mb-4 md:mb-0 md:w-[40%] {inFullPlayer ? 'md:hidden' : ''}">
    <div class="flex justify-between items-center">
        <!-- Current Time -->
        <div class="text-white text-xs">{formattedCurrentTime}</div>

        <!-- Total Time -->
        <div class="text-white text-xs">{formattedDuration}</div>
    </div>
</RangeSlider>