import {TITLES, INFOS, CITIES, POINT_TYPES, MAX_PRICE, MIN_PRICE} from '../const.js';
import {generateDate, generateParameter} from '../utils/point.js';
import {getRandomInteger} from '../utils/common.js';

const generateInfo = () => {
  const generateText = () => INFOS[getRandomInteger(0, INFOS.length - 1)];
  const text = Array.from({length: getRandomInteger(0, 5)}, generateText).join(' ');

  const generatePhoto = () => `http://picsum.photos/248/152?r=${getRandomInteger(0, 100)}`;
  const photos = Array.from({length: getRandomInteger(0,5)}, generatePhoto);

  return {
    text,
    photos,
  };
};

const generateOffer = () => {
  const title = generateParameter(TITLES);
  const price = getRandomInteger(MIN_PRICE, MAX_PRICE);

  return {
    title,
    price,
  };
};

const generateOffers = () => {
  const offers = Array.from({length: getRandomInteger(0, 5)}, generateOffer);

  return {
    type: generateParameter(POINT_TYPES),
    offers,
  };
};

const generatePoint = () => {
  const datas = Array.from({length: 2}, generateDate).sort((a, b) => a - b);

  return {
    basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
    type: generateParameter(POINT_TYPES),
    destination: generateParameter(CITIES),
    offers: generateOffers(),
    info: generateInfo(),
    startTime: datas[0],
    endTime: datas[1],
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

export {generatePoint};
