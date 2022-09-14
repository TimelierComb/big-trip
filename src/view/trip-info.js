import {convertDate} from '../utils.js';
import {createElement} from '../render.js';

const createTripInfoTemplate = (points) => {

  const createRoute = () => {
    if (points.length > 3) {
      return `${points[points.length - 1].destination}&nbsp;&mdash;&nbsp;&#x2026;&nbsp;&mdash;&nbsp;${points[0].destination}`;
    } else {
      const citiesList = [];

      return points.map((point) => {
        const result = citiesList[citiesList.length - 1] === point.destination
          ? ''
          : point.destination;

        citiesList.push(point.destination);


        return result;
      }).filter((point) => point !== '').reverse().join(' &mdash;&nbsp;');
    }
  };


  const firsDate = points[points.length - 1].startTime;
  const secondDate = points[0].endTime;

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${createRoute()}</h1>
        <p class="trip-info__dates">${convertDate(firsDate, 'MMM DD')}&nbsp;&mdash;&nbsp;${convertDate(secondDate, 'DD')}</p>
      </div>
    </section>`
  );
};

export default class TripInfoView {
  #element = null;
  #datas = null;

  constructor(datas) {
    this.#datas = datas;
  }

  get template() {
    return createTripInfoTemplate(this.#datas);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
