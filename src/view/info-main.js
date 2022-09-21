import {convertDate} from '../utils/point.js';
import AbstractView from '../view/abstract.js';

const createInfoMainTemplate = (points) => {
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

  const firsDate = convertDate(points[0].startTime, 'MMM DD');
  const secondDate = convertDate(points[points.length - 1].endTime, 'DD');


  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${createRoute()}</h1>
      <p class="trip-info__dates">${firsDate}&nbsp;&mdash;&nbsp;${secondDate}</p>
    </div>`
  );
};

export default class InfoMainView extends AbstractView {
  #datas = null;

  constructor(datas) {
    super();

    this.#datas = datas;
  }

  get template() {
    return createInfoMainTemplate(this.#datas);
  }
}
