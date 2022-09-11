import {convertDate} from '../utils.js';

export const createPointTeplate = (point) => {
  const {destination, type, startTime, endTime, isFavorite, offers, basePrice} = point;

  const calculateDuration = () => {
    if ((endTime - startTime) < 3600000) {
      return `${ (endTime - startTime) / 60000 }M`;
    }
    if ((endTime - startTime) >= 3600000 & (endTime - startTime) < 86400000) {
      return `${Math.floor( (endTime - startTime) / 3600000 )}H ${Math.ceil((((endTime - startTime) / 3600000) - Math.floor( (endTime - startTime) / 3600000 )) * 60)}M`;
    }
    if ((endTime - startTime) >= 86400000) {
      return `${Math.floor( (endTime - startTime) / 86400000 )}D ${ Math.ceil((((endTime - startTime) / 86400000) - Math.floor((endTime - startTime) / 86400000)) * 24)}H ${Math.ceil((((endTime - startTime) / 3600000) - Math.floor( (endTime - startTime) / 3600000 )) * 60)}M`;
    }
  };

  const calculatePrice = (prices) => {
    let result = basePrice;
    prices.offers.forEach((price) => {
      result +=  price.price;
    });

    return result;
  };

  const favoriteClassName = isFavorite ? ' event__favorite-btn--active' : '';

  const createOffersTemplate = (specials) =>  `
  <ul class="event__selected-offers">
    ${specials.map((offer) => `
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`).join('')}
  </ul>
  `;

  return `
  <li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${convertDate(startTime, 'YYYY-MM-DD')}">${convertDate(startTime, 'MMM D')}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${convertDate(startTime, 'YYYY-MM-DDTHH:mm')}">${convertDate(startTime, 'HH:mm')}</time>
        &mdash;
        <time class="event__end-time" datetime="${convertDate(endTime, 'YYYY-MM-DDTHH:mm')}">${convertDate(endTime, 'HH:mm')}</time>
      </p>
      <p class="event__duration">${calculateDuration()}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${calculatePrice(offers)}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    ${createOffersTemplate(offers.offers)}
    <button class="event__favorite-btn${favoriteClassName}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
  </li>
  `;
};
