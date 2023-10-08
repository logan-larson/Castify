export const format = (seconds) => {
	if (isNaN(seconds)) return '0:00';

	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds - (hours * 3600)) / 60);
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