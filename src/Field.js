export default class Field {
  constructor(container, size = 4) {
    this.container = container;
    this.size = size;
    this.cells = [];
  }

  render() {
    this.container.innerHTML = '';
    this.cells = [];
    for (let i = 0; i < this.size * this.size; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      this.container.appendChild(cell);
      this.cells.push(cell);
    }
  }

  getCell(index) {
    return this.cells[index];
  }

  getSize() {
    return this.cells.length;
  }
}
