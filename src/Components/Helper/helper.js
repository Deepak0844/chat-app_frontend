//message time
const timeFormat = (date) => {
  let hours = new Date(date).getHours();
  let minutes = new Date(date).getMinutes();
  hours = hours <= 9 && hours !== "00" ? `0${hours}` : hours;
  minutes = minutes <= 9 ? `0${minutes}` : minutes;
  const time = `${hours}:${minutes}`;

  let tempHour = new Date().getHours();
  let tempMinute = new Date().getMinutes();
  tempHour = tempHour <= 9 && tempHour !== "00" ? `0${tempHour}` : tempHour;
  tempMinute = tempMinute <= 9 ? `0${tempMinute}` : tempMinute;
  const tempTime = `${tempHour}:${tempMinute}`;
  return time === "NaN:NaN" ? tempTime : time;
};

export default timeFormat;
