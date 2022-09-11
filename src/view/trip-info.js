import {convertDate} from '../utils.js';

export const createTripInfoTemplate = (points) => {
  const citiesList = [];

  const createRoute = () => points.map((point) => {
    const result = citiesList[citiesList.length - 1] === point.destination
      ? ''
      : point.destination;

    citiesList.push(point.destination);


    return result;
  }).filter((point) => point !== '').reverse().join(' &mdash;&nbsp;');

  const firsDate = points[points.length - 1].startTime;
  const secondDate = points[0].endTime;

  return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${createRoute()}</h1>
        <p class="trip-info__dates">${convertDate(firsDate, 'MMM DD')}&nbsp;&mdash;&nbsp;${convertDate(secondDate, 'DD')}</p>
      </div>
    </section>
  `;
};
