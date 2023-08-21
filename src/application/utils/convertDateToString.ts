export default function convertDateToString(date: Date){
    const day = String(date.getDate()+1);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}