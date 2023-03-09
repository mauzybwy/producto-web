export const toTimestring = (num) => {
  if (num <= 0 || typeof(num) !== "number") {
    return "--:--:--";
  }
  
  var date = new Date(0);
  date.setSeconds(num); // specify value for SECONDS here
  var timeString = date.toISOString().substring(11, 19);
  return timeString;
}

export const strippedUrl = url => url.toLowerCase().replace(/(^\w+:|^)\/\//, '');
