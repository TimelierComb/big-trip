import {render, replace, RenderPosition} from '../utils/render.js';
import PointView from '../view/point.js';
import EditPointView from '../view/edit-point.js';

export default class PointPresenter {
  #pointContainer = null;
  #point = {};

  #pointComponent = null;
  #editPointComponent = null;

  constructor(pointsContainer) {
    this.#pointContainer = pointsContainer;
  }

  init = (point) =>  {
    this.#point = point;

    this.#pointComponent = new PointView(this.#point);
    this.#editPointComponent = new EditPointView(this.#point);

    this.#pointComponent.setEditClickHangler(this.#handleEditClick);
    this.#editPointComponent.setSubmitHandler(this.#handleFormSubmit);
    this.#editPointComponent.setCloseHandler(this.#handleFormClose);

    render(this.#pointContainer, this.#pointComponent, RenderPosition.BEFOREEND);
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

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
  };

  #handleFormClose = () => {
    this.#replaceFormToCard();
  };
}
