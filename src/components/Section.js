//Класс отвечающий за отрисовку элементов
export default class Section {
  constructor ({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(`.${containerSelector}`);
  }

  renderItems(data, userData){
    data.forEach((item) => {
      this._renderer(item, userData);
    });
  }

  addItem(element) {
    this._container.append(element);
  }

  addNewItem(element) {
    this._container.prepend(element);
  }
}
