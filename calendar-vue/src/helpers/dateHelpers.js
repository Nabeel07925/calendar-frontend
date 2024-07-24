export const convertTimeToUTC = (timeString) => {
    const [time, modifier] = timeString.split(' ');
    let [hours, minutes] = time.split(':');

    if (modifier === 'PM' && hours !== '12') {
        hours = parseInt(hours, 10) + 12;
    }
    if (modifier === 'AM' && hours === '12') {
        hours = '00';
    }

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

    const utcHours = String(utcDate.getHours()).padStart(2, '0');
    const utcMinutes = String(utcDate.getMinutes()).padStart(2, '0');

    return `${utcHours}:${utcMinutes}`;
}

export const convertTimeToCurrentTimeZone = (timeString) => {
    let [hours, minutes] = timeString.split(':');
    let period = 'AM'

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    const currentTimeZoneTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

    let currentTimeZoneHours = String(currentTimeZoneTime.getHours()).padStart(2, '0');
    const currentTimeZoneMinutes = String(currentTimeZoneTime.getMinutes()).padStart(2, '0');

    if (currentTimeZoneHours >= '12') {
        period = 'PM'
        currentTimeZoneHours -= 12
    }

    return `${currentTimeZoneHours}:${currentTimeZoneMinutes}${period}`;
}