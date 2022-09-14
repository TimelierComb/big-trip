import {CITIES, POINT_TYPES, TITLES, MIN_PRICE, MAX_PRICE} from '../const.js';
import {convertDate, getRandomInteger} from '../utils.js';
import {createElement} from '../render.js';

const createTypesTemplate = (items, type) =>  (
  `<fieldset class="event__type-group">
    <legend class="visually-hidden">Event type</legend>
    ${items.map((item) => `
      <div class="event__type-item">
        <input id="event-type-${item}-2" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}" ${type === item ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-2">${item}</label>
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
  const {destination, type, startTime, info, endTime, offers} = point;

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
            <input class="event__input  event__input--price" id="event-price-2" type="text" name="event-price" value="">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
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

export default class EditPointView {
  #element = null;
  #datas = null;

  constructor(datas = POINT_BLANK) {
    this.#datas = datas;
  }

  get template() {
    return createNewPointTemplate(this.#datas);
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
