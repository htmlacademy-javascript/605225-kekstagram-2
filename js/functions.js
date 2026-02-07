const timeToMinutes = (timeInHours) => {
  let timeInMinutes = +(timeInHours.split(':')[0]) * 60 + +(timeInHours.split(':')[1]);

  return timeInMinutes;
};

const checkMeetingLength = (startDayTime, endDayTime, startMeetingTime, meetingLength) => {
  let startDayMinutes = timeToMinutes(startDayTime);
  let endDayMinutes = timeTotimeToMinutes(endDayTime);
  let startMeetingMinutes = timeToMinutes(startMeetingTime);

  return (startMeetingMinutes + meetingLength <= endDayMinutes) && (startMeetingMinutes + meetingLength > startDayMinutes) && (startDayMinutes <= startMeetingMinutes);
};

console.log(checkMeetingLength('14:00', '17:30', '08:0', 370));
