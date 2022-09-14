import {createElement} from '../utils';

const createTripCostTemplate = (points) => {

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    const summarizePrice = (offer) => {
      totalPrice += offer.price;
    };

    points.map((point) => {
      totalPrice += point.basePrice;

      point.offers.offers.map(summarizePrice);
    });

    return totalPrice;
  };

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateTotalPrice()}</span>
    </p>`
  );
};

export default class TripCostView {
  #element = null;
  #datas = null;

  constructor(datas) {
    this.#datas = datas;
  }

  get template() {
    return createTripCostTemplate(this.#datas);
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
