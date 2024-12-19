export const format = (seconds) => {
	if (isNaN(seconds)) return '0:00';

	let hours = Math.floor(seconds / 3600);
	let minutes = Math.floor((seconds - (hours * 3600)) / 60);
	seconds = Math.floor(seconds % 60);

	if (seconds < 10)
		seconds = `0${seconds}`;

	if (hours > 0 && minutes < 10)
		minutes = `0${minutes}`;

	if (hours > 0)
		return `${hours}:${minutes}:${seconds}`;
	else
		return `${minutes}:${seconds}`;
};

export const formatDuration = (duration) => {
	if (isNaN(duration)) return '0 min';

	let hours = Math.floor(duration / 3600);
	let minutes = Math.floor((duration - (hours * 3600)) / 60);

	if (hours > 0)
		return `${hours} hr ${minutes} min`;
	else
		return `${minutes} min`;
};

export const formatDate = (date) => {
	return new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}