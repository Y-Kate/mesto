class Section {
  constructor ({ items, renderer} , containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderItems = () => {
    this._initialArray.forEach(item => {
      this._renderer(item);
    });
  }

  addItem = (element) => {
    this._containerElement.prepend(element)
  }
}

export default Section;