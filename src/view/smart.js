import AbstractView from './abstract.js';
import {replace} from '../utils/render.js';

export default class SmartView extends AbstractView {
  _state = {};

  restoreHandlers = () => {
    throw new Error('Abstract method not implemented: restoreHandlers');
  };

  updateElement = () => {
    const currentElement = this.element;
    this.removeElement();
    const newElement = this.element;
    replace(newElement, currentElement);
    this.restoreHandlers();
  };

  updateData = (update, isText) => {
    if (!update) {
      return;
    }

    this._state = {...this._state, ...update};

    if (isText) {
      return;
    }

    this.updateElement();
  };
}
