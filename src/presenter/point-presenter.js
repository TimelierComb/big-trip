import {render, replace, remove, RenderPosition} from '../utils/render.js';
import PointView from '../view/point.js';
import EditPointView from '../view/edit-point.js';

export default class PointPresenter {
  #pointContainer = null;
  #changeData = null;
  #point = {};

  #pointComponent = null;
  #editPointComponent = null;

  constructor(pointsContainer, changeData) {
    this.#pointContainer = pointsContainer;
    this.#changeData = changeData;
  }

  init = (point) =>  {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView(this.#point);
    this.#editPointComponent = new EditPointView(this.#point);

    this.#pointComponent.setEditClickHangler(this.#handleEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#editPointComponent.setSubmitHandler(this.#handleFormSubmit);
    this.#editPointComponent.setCloseHandler(this.#handleFormClose);

    if (prevEditPointComponent === null || prevPointComponent === null) {
      render(this.#pointContainer, this.#pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#pointContainer.element.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointContainer.element.contains(prevEditPointComponent.element)) {
      replace(this.#editPointComponent, prevEditPointComponent.element);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  };

  #replaceCardToForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeydownHandler);
  };

  #replaceFormToCard = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeydownHandler);
  };

  #escKeydownHandler = (evt) =>  {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceFormToCard();
  };

  #handleFormClose = () => {
    this.#replaceFormToCard();
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
