import AbstractView from '../view/abstract.js';

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

export default class InfoCostView extends AbstractView {
  #datas = null;

  constructor(datas) {
    super ();

    this.#datas = datas;
  }

  get template() {
    return createInfoCostTemplate(this.#datas);
  }
}
