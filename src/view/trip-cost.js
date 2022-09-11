export const createTripCostTemplate = (points) => {

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    points.map((point) => {
      totalPrice += point.basePrice;

      point.offers.offers.map((offer) => totalPrice += offer.price);
    });

    return totalPrice;
  };

  calculateTotalPrice();
  return `
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateTotalPrice()}</span>
    </p>
  `;
};
