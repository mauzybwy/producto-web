export const toTimestring = (num) => {
  if (num <= 0 || typeof(num) !== "number") {
    return "--:--:--";
  }

  const hours = Math.floor(num / 3600).toString().padStart(2,'0');
  const minutes = Math.floor((num % 3600) / 60).toString().padStart(2,'0');
  const seconds = Math.floor(num % 60).toString().padStart(2,'0') // SECONDS
  const timeString = `${hours}:${minutes}:${seconds}`
  
  /* var date = new Date(0); */
  /* date.setSeconds(num); // specify value for SECONDS here */
  /* var timeString = date.toISOString().substring(11, 19); */
  
  return timeString;
}

export const strippedUrl = url => url.toLowerCase().replace(/(^\w+:|^)\/\//, '');
