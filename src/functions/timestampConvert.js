export const toTwitterDateFormat = (isoString) => {
    const now = new Date();
    const then = new Date(isoString);
    const diffInSeconds = Math.floor((now - then) / 1000);

    if (diffInSeconds < 60) {
        return 'just now';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes}m`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours}h`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return `${diffInDays}d`;
    }

    const optionsThisYear = { month: 'short', day: 'numeric' };
    const optionsOtherYear = { month: 'short', day: 'numeric', year: 'numeric' };

    const formatter = new Intl.DateTimeFormat('en-US', 
        then.getFullYear() === now.getFullYear() ? optionsThisYear : optionsOtherYear
    );

    return formatter.format(then);
}
