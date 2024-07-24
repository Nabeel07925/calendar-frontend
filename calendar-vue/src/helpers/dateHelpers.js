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
    console.log("changed date is ", date)

    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    console.log("utc date is ", utcDate)

    // Format the UTC time as a string
    const utcHours = String(utcDate.getHours()).padStart(2, '0');
    const utcMinutes = String(utcDate.getMinutes()).padStart(2, '0');

    return `${utcHours}:${utcMinutes}`;
}