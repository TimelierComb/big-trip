import dayjs from 'dayjs';

export const createPointTeplate = (point) => {
  const {destination, type, startTime, endTime, isFavorite, offers} = point;

  const eventDay = dayjs(startTime).format('MMM D');
  const eventDayFormat = dayjs(startTime).format('YYYY-MM-DD');
  const startHour = dayjs(startTime).format('HH:mm');
  const startHourFormat = dayjs(startTime).format('YYYY-MM-DDTHH:mm');
  const endHour = dayjs(endTime).format('HH:mm');
  const endHourFormat = dayjs(endTime).format('YYYY-MM-DDTHH:mm');

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

  const favoriteClassName = isFavorite ? ' event__favorite-btn--active' : '';

  const renderOffers = () => {
    let offersMarkup = '';
    offers.offers.forEach((offer) => {
      const {price, title} = offer;

      offersMarkup += `
      <li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </li>
      `;
    });
    return offersMarkup;
  };

  const calculatePrice = (prices) => {
    let result = 0;
    prices.offers.forEach((price) => {
      result +=  price.price;
    });

    return result;
  };

  return `
  <li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${eventDayFormat}">${eventDay}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${startHourFormat}">${startHour}</time>
        &mdash;
        <time class="event__end-time" datetime="${endHourFormat}">${endHour}</time>
      </p>
      <p class="event__duration">${calculateDuration()}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${calculatePrice(offers)}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${renderOffers()}
    </ul>
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
