import AbstractView from './abstract.js';
import {replace} from '../utils/render.js';

export default class SmartView extends AbstractView {
  #state = {};

  #restoreHandlers = () => {
    throw new Error('Abstract method not implemented: restoreHandlers');
  };

  #updateElement = () => {
    const currentElement = this.element;
    this.removeElement();
    const newElement = this.element();
    replace(newElement, currentElement);
    this.#restoreHandlers();
  };

  #updateData = (update, isText) => {
    if (!update) {
      return;
    }

    this.#state = {...this.#state, update};

    if (!isText) {
      this.#updateElement();
    }
  };
}
