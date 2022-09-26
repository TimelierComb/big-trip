import {nanoid} from 'nanoid';
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

const generateSpecials = () => {
  const title = generateParameter(TITLES);
  const price = getRandomInteger(MIN_PRICE, MAX_PRICE);

  return {
    title,
    price,
  };
};

const generateOffer = (pointType) => {
  const offers = Array.from({length: getRandomInteger(0, 5)}, generateSpecials);

  return {
    type: pointType,
    offers,
  };
};

const generateOffers = (pointTypes) => pointTypes.map((pointType) => generateOffer(pointType));
const offersList = generateOffers(POINT_TYPES);

const generatePoint = () => {
  const datas = Array.from({length: 2}, generateDate).sort((a, b) => a - b);
  const type = generateParameter(POINT_TYPES);

  const filteredOffers = offersList.slice().filter((offer) => offer.type === type).map((offer) => offer.offers);

  const decomposeOffers = (offers) => offers;

  return {
    id: nanoid(),
    basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
    type,
    destination: generateParameter(CITIES),
    offers: decomposeOffers(...filteredOffers),
    info: generateInfo(),
    startTime: datas[0],
    endTime: datas[1],
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

export {generatePoint};
