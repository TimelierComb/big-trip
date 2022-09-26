export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower +1));
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const calculatePrice = (offers, basePrice) => {
  if (isNaN(basePrice)) {
    basePrice = 0;
  }

  ++basePrice;

  let result = basePrice;
  offers.forEach((offer) => {
    result +=  ++offer.price;
  });

  return result;
};

export const sortByDay = (pointA, pointB) => pointA.startTime - pointB.startTime;

export const sortByDuration = (pointA, pointB) => (pointA.endTime - pointA.startTime) - (pointB.endTime - pointB.startTime);

export const sortByPrice = (pointA, pointB) => {
  const pointAPrice = calculatePrice(pointA.offers, pointA.basePrice);
  const pointBPrice = calculatePrice(pointB.offers, pointB.basePrice);

  return pointAPrice - pointBPrice;
};
