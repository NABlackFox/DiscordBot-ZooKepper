module.exports = {
	formatTime: (seconds) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;

		// Ensure two-digit formatting for minutes and seconds
		const formattedMinutes = minutes.toString().padStart(2, '0');
		const formattedSeconds = secs.toString().padStart(2, '0');

		// If there are hours, format as hh:mm:ss; otherwise, mm:ss
		return hours > 0
			? `${hours}:${formattedMinutes}:${formattedSeconds}`
			: `${formattedMinutes}:${formattedSeconds}`;
	},
};
