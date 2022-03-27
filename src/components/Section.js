//Класс отвечающий за отрисовку элементов
export default class Section {
  constructor ({data, renderer}, containerSelector) {
    this._items = data;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(`.${containerSelector}`);
  }

  renderItems(){
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._containerSelector.prepend(element);
  }
}
