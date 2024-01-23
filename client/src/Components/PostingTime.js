 export const calculateTimeDifference = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const timeDifference = now - createdDate;
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));

    if (minutesDifference < 60) {
        return `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
    } else {
        const hoursDifference = Math.floor(minutesDifference / 60);

        if (hoursDifference < 24) {
            return `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
        } else {
            const daysDifference = Math.floor(hoursDifference / 24);

            if (daysDifference >= 7) {
                const formattedDate = createdDate.toLocaleDateString(undefined, {
                    month: 'short',  // 3-letter month abbreviation
                    day: 'numeric',
                    year: '2-digit',  // 2-digit year
                });

                return ` ${formattedDate}`;
            } else {
                // Exclude the days information for posts less than 7 days old
                const weeksDifference = Math.floor(daysDifference / 7);
                return `${weeksDifference} ${weeksDifference === 1 ? 'week' : 'weeks'} ago`;
            }
        }
    }
};
