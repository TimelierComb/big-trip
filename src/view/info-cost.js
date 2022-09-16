import {createElement} from '../render.js';

const createInfoCostTemplate = (points) => {
  let totalPrice = 0;
  if (points.length !== 0) {
    const summarizePrice = (offer) => {
      totalPrice += offer.price;
    };

    points.map((point) => {
      totalPrice += point.basePrice;

      point.offers.offers.map(summarizePrice);
    });
  }

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>`
  );
};

export default class InfoCostView {
  #element = null;
  #datas = null;

  constructor(datas) {
    this.#datas = datas;
  }

  get template() {
    return createInfoCostTemplate(this.#datas);
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
