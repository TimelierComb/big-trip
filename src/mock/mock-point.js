import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower +1));
};

const POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'transport',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const CITIES = [
  'Los Angeles',
  'Berlin',
  'Rome',
  'Florence',
  'New York',
  'Miamy',
];

const INFOS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const TITLES = [
  'Add luggage',
  'Swicth to comfort',
  'Add meal',
  'Choose seats',
  'Travel by train',
];

const generateType = () => POINT_TYPES[getRandomInteger(0, POINT_TYPES.length - 1)];

const generateCity = () => CITIES[getRandomInteger(0, CITIES.length - 1)];

const generateInfo = () => {
  const generateText = () => INFOS[getRandomInteger(0, CITIES.length - 1)];
  const text = Array.from({length: getRandomInteger(0, 5)}, generateText).join(' ');

  const generatePhoto = () => `http://picsum.photos/248/152?r=${getRandomInteger(0, 100)}`;
  const photos = Array.from({length: getRandomInteger(0,5)}, generatePhoto);

  return {
    text,
    photos,
  };
};

const generateTitle = () => TITLES[getRandomInteger(0, TITLES.length)]

const generateOffer = () => {
  const MIN_PRICE = 10;
  const MAX_PRICE = 100;

  return {
    title: generateTitle(),
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
  };
};

const generateOffers = () => {
  const offers = Array.from({length: getRandomInteger(0, 5)}, generateOffer)

  return {
    type: generateType(),
    offers,
  };
};

const generateDate = () => {
  const maxDaysGap = 3;
  const maxMinutesGap = 180;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const minutesGap = getRandomInteger(-maxMinutesGap, maxMinutesGap);

  return dayjs().add(daysGap, 'day').add(minutesGap, 'minute').toDate();
};

const generatePoint = () => {
  const firsDate = generateDate();
  const secondDate = generateDate();

  const datas = Array.of(firsDate, secondDate).sort((a, b) => a - b);

  return {
    type: generateType(),
    destination: generateCity(),
    offers: generateOffers(),
    info: generateInfo(),
    startTime: datas[0],
    endTime: datas[1],
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

export {generatePoint};
