import {convertDate} from '../utils/point.js';
import AbstractView from '../view/abstract.js';
import {calculatePrice} from '../utils/common.js';

const calculateDuration = (startTime, endTime) => {
  if ((endTime - startTime) < 3600000) {
    return `${Math.floor((endTime - startTime) / 60000)}M`;
  }
  if ((endTime - startTime) >= 3600000 & (endTime - startTime) < 86400000) {
    return `${Math.floor( (endTime - startTime) / 3600000 )}H ${Math.floor((((endTime - startTime) / 3600000) - Math.floor( (endTime - startTime) / 3600000 )) * 60)}M`;
  }
  if ((endTime - startTime) >= 86400000) {
    return `${Math.floor( (endTime - startTime) / 86400000 )}D ${ Math.floor((((endTime - startTime) / 86400000) - Math.floor((endTime - startTime) / 86400000)) * 24)}H ${Math.floor((((endTime - startTime) / 3600000) - Math.floor( (endTime - startTime) / 3600000 )) * 60)}M`;
  }
};

const createOffersTemplate = (offers) =>  `
<ul class="event__selected-offers">
  ${offers.map((offer) => `
  <li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </li>`).join('')}
</ul>
`;

const createPointTeplate = (point) => {
  const {description, type, startTime, endTime, isFavorite, offers, basePrice} = point;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${convertDate(startTime, 'YYYY-MM-DD')}">${convertDate(startTime, 'MMM D')}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${description.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${convertDate(startTime, 'YYYY-MM-DDTHH:mm')}">${convertDate(startTime, 'HH:mm')}</time>
            &mdash;
            <time class="event__end-time" datetime="${convertDate(endTime, 'YYYY-MM-DDTHH:mm')}">${convertDate(endTime, 'HH:mm')}</time>
          </p>
          <p class="event__duration">${calculateDuration(startTime, endTime)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${calculatePrice(offers, basePrice)}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        ${createOffersTemplate(offers)}
        <button class="event__favorite-btn${isFavorite ? ' event__favorite-btn--active' : ''}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class PointView extends AbstractView {
  #datas = null;

  constructor(datas) {
    super();

    this.#datas = datas;
  }

  get template() {
    return createPointTeplate(this.#datas);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  setEditClickHangler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };
}
