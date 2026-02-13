const timeToMinutes = (timeInHours) => {
  const timeInMinutes = Number(timeInHours.split(':')[0]) * 60 + Number(timeInHours.split(':')[1]);

  return timeInMinutes;
};

const checkMeetingLength = (startDayTime, endDayTime, startMeetingTime, meetingLength) => {
  const startDayMinutes = timeToMinutes(startDayTime);
  const endDayMinutes = timeToMinutes(endDayTime);
  const startMeetingMinutes = timeToMinutes(startMeetingTime);

  return (startMeetingMinutes + meetingLength <= endDayMinutes) && (startMeetingMinutes + meetingLength > startDayMinutes) && (startDayMinutes <= startMeetingMinutes);
};

console.log(checkMeetingLength('14:00', '17:30', '08:0', 370));
