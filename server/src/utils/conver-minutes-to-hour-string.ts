

export function convertMinutesToHourString(minutes: number) {
    const hourDigit = Math.floor(minutes / 60);
    const minuteDigit = (minutes % 60);

    return `${String(hourDigit).padStart(2, '0')}:${String(minuteDigit).padStart(2, '0')}`
}