import goblinImg from './goblin.png';

export default class Goblin {
  constructor() {
    this.element = null;
    this.currentCell = null;
  }

  create() {
    const img = document.createElement('img');
    img.src = goblinImg;
    img.classList.add('goblin');
    img.alt = 'goblin';
    this.element = img;
    return img;
  }

  showIn(cell) {
    this.currentCell = cell;
    cell.classList.add('active');
    cell.appendChild(this.element);
  }

  hide() {
    if (this.currentCell) {
      this.currentCell.classList.remove('active');
    }
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    this.currentCell = null;
  }

  isIn(cell) {
    return this.currentCell === cell;
  }
}
