import {CITIES, POINT_TYPES, TITLES, MIN_PRICE, MAX_PRICE} from '../const.js';
import {convertDate} from '../utils/point.js';
import {getRandomInteger} from '../utils/common.js';
import SmartView from './smart.js';

const createTypesTemplate = (types, currentType) =>  (
  `<fieldset class="event__type-group">
    <legend class="visually-hidden">Event type</legend>
    ${types.map((type) => `
      <div class="event__type-item">
        <input id="event-type-${type}-2" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === type ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${type}" data-type="${type}" for="event-type-${type}-2">${type}</label>
      </div>
    `).join('')}
  </fieldset>`
);

const createDestinationOptionTemplate = (cities) => (
  `<datalist id="destination-list-2">
    ${cities.map((city) => `
      <option value="${city}"></option>
    `).join('')}
  </datalist>`
);

const createOfferName = (name) => {
  if (name === 'Add luggage') {
    return 'luggage';
  }
  if (name === 'Swicth to comfort') {
    return 'comfort';
  }
  if (name === 'Add meal') {
    return 'meal';
  }
  if (name === 'Choose seats') {
    return 'seats';
  }
  if (name === 'Travel by train') {
    return 'train';
  }
};

const createOffersTemplate = (specials, offers) =>  (
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${specials.map((special) => `
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${createOfferName(special)}-2" type="checkbox" name="event-offer-${createOfferName(special)}" ${offers.offers.some((offer) => offer.title === special)  ? 'checked' : ''}>
          <label class="event__offer-label" for="event-offer-${createOfferName(special)}-2">
            <span class="event__offer-title">${special}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${getRandomInteger(MIN_PRICE, MAX_PRICE)}</span>
          </label>
        </div>
      `).join('')}
    </div>
  </section>`
);

const createPhotosTemplate = (images) => `
  <div class="event__photos-tape">
    ${images.map((image)=> `
      <img class="event__photo" src="${image}" alt="Event photo">
    `).join('')}
  </div>
`;

const createOpenFormButtonTemplate = () => (
  `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Close event</span>
  </button>`
);

const POINT_BLANK = {
  destination : '',
  type : POINT_TYPES[0],
  startTime : '',
  info : {
    text: '',
    photos: [],
  },
  endTime : '',
  isFavorite : false,
  offers : {
    offers: [],
    type: '',
  }
};

const createNewPointTemplate = (point) => {
  const {destination, type, startTime, info, endTime, offers, basePrice} = point;

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-2">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-2" type="checkbox">

            <div class="event__type-list">

              ${createTypesTemplate(POINT_TYPES, type)}

            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-2">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-2" type="text" name="event-destination" value="${destination}" list="destination-list-2">

            ${createDestinationOptionTemplate(CITIES)}

          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-2">From</label>
            <input class="event__input  event__input--time" id="event-start-time-2" type="text" name="event-start-time" value="${startTime === '' ? 'Укажите дату' : convertDate(startTime, 'DD/MM/YY HH:mm')}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-2">To</label>
            <input class="event__input  event__input--time" id="event-end-time-2" type="text" name="event-end-time" value="${startTime === '' ? 'Укажите дату' : convertDate(endTime, 'DD/MM/YY HH:mm')}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-2">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-2" type="text" name="event-price" value="${basePrice === ''? '': basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${destination === ''? 'Cancel' : 'Delete'}</button>
          ${destination === ''? '' : createOpenFormButtonTemplate()}
        </header>
        <section class="event__details">
          ${createOffersTemplate(TITLES, offers)}

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${info.text}</p>

            <div class="event__photos-container">
              ${createPhotosTemplate(info.photos)}
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
};

export default class EditPointView extends SmartView {
  #point = null;

  constructor(point = POINT_BLANK) {
    super();

    this.#point = point;
    this.#parseDataToState();
    this.element.addEventListener('click', this.#changeTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#changeBasePriceHandler);
  }

  get template() {
    return createNewPointTemplate(this._state);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#parseStateToData();
    this._callback.formSubmit(this.#point);
  };

  setSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this._callback.formClose();
  };

  setCloseHandler = (callback) => {
    this._callback.formClose = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formCloseHandler);
  };

  restoreHandlers = () => {
    this.setCloseHandler(this._callback.formClose);
    this.setSubmitHandler(this._callback.formSubmit);
    this.element.addEventListener('click', this.#changeTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#changeBasePriceHandler);
  };

  #changeTypeHandler = (evt) => {
    if (evt.target.matches('.event__type-label')) {
      this.updateData({type: evt.target.dataset.type}, false);
    }
  };

  #changeDestinationHandler = (evt) => {
    this.updateData({destination: evt.target.value}, true);
  };

  #changeBasePriceHandler = (evt) => {
    if (!isNaN(evt.target.value)) {
      this.updateData({basePrice: evt.target.value}, true);
    }
  };

  #parseDataToState = () => {
    this._state = this.#point;
  };

  #parseStateToData = () => {
    this.#point = this._state;
  };
}
