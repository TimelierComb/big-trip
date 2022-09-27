import {nanoid} from 'nanoid';
import {TITLES, INFOS, CITIES, POINT_TYPES, MAX_PRICE, MIN_PRICE} from '../const.js';
import {generateDate, generateParameter} from '../utils/point.js';
import {getRandomInteger, restItem} from '../utils/common.js';

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

const generatePictures = () => {
  const src = `http://picsum.photos/248/152?r=${getRandomInteger(0, 100)}`;

  return {
    description: generateParameter(INFOS),
    src,
  };
};

const generateDescription = (city) => {
  const pictures = Array.from({length: getRandomInteger(0,5)}, generatePictures);
  const generateText = () => INFOS[getRandomInteger(0, INFOS.length - 1)];
  const description = Array.from({length: getRandomInteger(0, 5)}, generateText).join(' ');

  return {
    description,
    name: city,
    pictures,
  };
};

const generateDescriptionList = () => CITIES.map((city) => generateDescription(city));
const descriptionList = generateDescriptionList();

const generatePoint = () => {
  const datas = Array.from({length: 2}, generateDate).sort((a, b) => a - b);
  const type = generateParameter(POINT_TYPES);

  const filteredOffers = offersList.slice().filter((offer) => offer.type === type).map((offer) => offer.offers);

  return {
    id: nanoid(),
    basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
    type,
    description: generateParameter(descriptionList),
    offers: restItem(...filteredOffers),
    startTime: datas[0],
    endTime: datas[1],
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

export {generatePoint, offersList, descriptionList};
