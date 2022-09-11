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

export const generateParameter = (array) => array[getRandomInteger(0, array.length - 1)];

export const convertDate = (time, format) => dayjs(time).format(format);

export const calculatePrice = (prices) => {
  let result = 0;
  prices.offers.forEach((price) => {
    result +=  price.price;
  });

  return result;
};
