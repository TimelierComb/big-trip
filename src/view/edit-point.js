import {CITIES, POINT_TYPES} from '../const.js';
import {convertDate} from '../utils/point.js';
import SmartView from './smart.js';
import {offersList, descriptionList} from '../mock/mock-point.js';
import {restItem} from '../utils/common.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

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

const createOffersTemplate = (offers, type) => (
  `<section class="event__section  event__section--offers">
  ${offers.map((offer) => {
    if (offer.type === type) {
      return (
        `<h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offer.offers.map((element) => (
          `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${createOfferName(element.title)}-2" type="checkbox" name="event-offer-${createOfferName(element.title)}" ${Math.round(Math.random())  ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-${createOfferName(element.title)}-2">
              <span class="event__offer-title">${element.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${element.price}</span>
            </label>
          </div>`
        )).join('')}
        </div>`
      );
    }
  }).join('')}
  </section>`
);

const createPhotosTemplate = (pictures) => `
  <div class="event__photos-tape">
    ${pictures.map((picture)=> `
      <img class="event__photo" src="${picture.src}" alt="${picture.description}">
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
  const {description, type, startTime, endTime, offers, basePrice} = point;

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
            <input class="event__input  event__input--destination" id="event-destination-2" type="text" name="event-destination" value="${description.name}" list="destination-list-2">

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
          <button class="event__reset-btn" type="reset">${description === ''? 'Cancel' : 'Delete'}</button>
          ${description === ''? '' : createOpenFormButtonTemplate()}
        </header>
        <section class="event__details">
          ${createOffersTemplate(offersList, type)}

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description.description}</p>

            <div class="event__photos-container">
              ${createPhotosTemplate(description.pictures)}
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
};

export default class EditPointView extends SmartView {
  #startDatepicker = null;
  #endDatepicker = null;


  constructor(point = POINT_BLANK) {
    super();

    this._state = EditPointView.parseDataToState(point);
    this.#innerHandlers();
    this.#setStartDatepicker();
    this.#setEndDatepicker();
  }

  get template() {
    return createNewPointTemplate(this._state);
  }

  removeElement() {
    super.removeElement();

    if (!this.#startDatepicker) {
      this.#startDatepicker.destroy();
      this.#startDatepicker = null;
    }

    if (!this.#endDatepicker) {
      this.#endDatepicker.destroy();
      this.#endDatepicker = null;
    }
  }

  #setStartDatepicker = () => {
    this.#startDatepicker = flatpickr(
      this.element.querySelector('#event-start-time-2'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.startTime,
        onChange: this.#startDateChangeHandler,
      },
    );
  };

  #setEndDatepicker = () => {
    this.#endDatepicker = flatpickr(
      this.element.querySelector('#event-end-time-2'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.endTime,
        onChange: this.#endDateChangeHandler,
      },
    );
  };

  #startDateChangeHandler = ([userTime]) => {
    this.updateData({
      startTime: userTime,
    }, true);
  };

  #endDateChangeHandler = ([userTime]) => {
    this.updateData({
      endTime: userTime,
    }, true);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditPointView.parseStateToData(this._state));
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
    this.#innerHandlers();
    this.#setStartDatepicker();
    this.#setEndDatepicker();
  };

  #changeTypeHandler = (evt) => {
    if (evt.target.matches('.event__type-label')) {
      this.updateData({type: evt.target.dataset.type}, false);
    }
  };

  #changeDescriptionHandler = (evt) => {
    this.updateData(this.#changeDescription(evt), true);
  };

  #changeDescription = (evt) => {
    const filteredDescriptions = descriptionList.slice().filter((descriptionItem) => descriptionItem.name === evt.target.value);

    return descriptionList.some((descriptionItem) => descriptionItem.name === evt.target.value)
      ? {
        description: restItem(...filteredDescriptions),
      }
      : {
        description: {
          name: evt.target.value,
          description: '',
          pictures: [],
        }
      };
  };

  #changeBasePriceHandler = (evt) => {
    if (!isNaN(evt.target.value)) {
      this.updateData({basePrice: evt.target.value}, true);
    }
  };

  static parseDataToState = (data) => ({
    ...data,
  }
  );

  static parseStateToData = (state) => state;

  #innerHandlers = () => {
    this.element.addEventListener('click', this.#changeTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDescriptionHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#changeBasePriceHandler);
  };
}
