// const card = document.querySelector('#tmp-card');
// const template = document.querySelector('#card-template').content;

import { api } from './api.js';

// console.log({ card });
// console.log({ template });

export class Card {
  constructor(dataCat, selectorTemplate, onClickToEdit) {
    this._data = dataCat;
    this._selectorTemplate = selectorTemplate;
    this.onClickToEdit = onClickToEdit;
  }

  _getTemplate() {
    // возвращает содержимое шаблона в виде дом -узла
    // узел типа тег  btn div
    // узел типа text  какойто текст
    // узел типа 'элемент
    // узел типа - документ фрагмент у него свойство content
    return document
      .querySelector(this._selectorTemplate)
      .content.querySelector('.card');
    // документ фрагмент -  это легковесная версия ноды типа элемент.
  }
  getElement() {
    this.element = this._getTemplate().cloneNode(true);
    // const cardTitle = this.element.querySelector('.card__name');
    const cardImage = this.element.querySelector('.card__image');
    const cardLike = this.element.querySelector('.card__like');
    const deleteBtn = this.element.querySelector('.card__delete');
    const cardLink = this.element.querySelector('.card__link');

    this.cardTitle = this.element.querySelector('.card__name');

    deleteBtn.setAttribute('id', this._data.id);
    // this.element.setAttribute('id', this._data.id);

    deleteBtn.addEventListener('click', (e) => {
      console.log(e, '>>>', this._data.id);

      if (confirm('Are you sure?')) {
        api.deleteCatById(this._data.id).then(() => {
          const elem = document.getElementById(this._data.id);
          elem.parentElement.remove();
        });
      }
    });

    if (!this._data.favorite) {
      cardLike.remove();
    }

    this.cardTitle.textContent = this._data.name ?? 'Barsik';
    cardImage.src =
      this._data.image ||
      'https://rickandmortyapi.com/api/character/avatar/1.jpeg';

    cardLink.addEventListener('click', () => {
      this.onClickToEdit(this.element, this._data.id);
    });

    return this.element;
  }

  setEventListener() {
   
  }
}


