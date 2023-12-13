export const convertMinutesToHHMM = (minutes) => {
    const sign = minutes < 0 ? "-" : ""; // Check if minutes is negative
    const absoluteMinutes = Math.abs(minutes); // Get the absolute value of minutes
  
    const hours = Math.floor(absoluteMinutes / 60);
    const mins = Math.floor(absoluteMinutes % 60);
    const secs = Math.floor((absoluteMinutes * 60) % 60); // Calculate seconds
  
    const hoursStr = hours.toString().padStart(2, "0");
    const minsStr = mins.toString().padStart(2, "0");
    const secsStr = secs.toString().padStart(2, "0");
  
    return `${sign}${hoursStr}:${minsStr}:${secsStr}`;
  };