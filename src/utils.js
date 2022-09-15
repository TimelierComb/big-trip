import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower +1));
};

export const generateDate = () => {
  const maxDaysGap = 3;
  const maxMinutesGap = 180;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const minutesGap = getRandomInteger(-maxMinutesGap, maxMinutesGap);

  return dayjs().add(daysGap, 'day').add(minutesGap, 'minute').toDate();
};

export const isPointInFuture = (startTime, endTime) => dayjs(startTime).isSame(dayjs(), 'D') || dayjs(startTime).isAfter(dayjs(), 'D') || (dayjs(startTime).isBefore(dayjs(), 'D') && dayjs(endTime).isAfter(dayjs(), 'D'));

export const isPointInPast = (startTime, endTime) => dayjs(endTime).isBefore(dayjs(), 'D') || (dayjs(startTime).isBefore(dayjs(), 'D') && dayjs(endTime).isAfter(dayjs(), 'D'));


export const generateParameter = (array) => array[getRandomInteger(0, array.length - 1)];

export const convertDate = (time, format) => dayjs(time).format(format);
