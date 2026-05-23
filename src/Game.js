export const MAX_MISSES = 5;
export const GOBLIN_TIMEOUT = 1000;

export function getRandomIndex(size, exclude = -1) {
  let index;
  do {
    index = Math.floor(Math.random() * size);
  } while (index === exclude);
  return index;
}

export default class Game {
  constructor(field, goblin, scoreBoard, overlay) {
    this.field = field;
    this.goblin = goblin;
    this.scoreBoard = scoreBoard;
    this.overlay = overlay;
    this.timer = null;
    this.currentIndex = -1;
    this.running = false;
    this.onClick = this.onClick.bind(this);
  }

  start() {
    this.running = true;
    this.scoreBoard.reset();
    this.overlay.classList.add('hidden');
    this.field.container.addEventListener('click', this.onClick);
    this.nextRound();
  }

  stop() {
    this.running = false;
    clearTimeout(this.timer);
    this.goblin.hide();
    this.field.container.removeEventListener('click', this.onClick);
    this.overlay.classList.remove('hidden');
    this.overlay.querySelector('.overlay-score').textContent = this.scoreBoard.score;
  }

  nextRound() {
    if (!this.running) return;

    this.goblin.hide();
    const newIndex = getRandomIndex(this.field.getSize(), this.currentIndex);
    this.currentIndex = newIndex;
    this.goblin.showIn(this.field.getCell(newIndex));

    this.timer = setTimeout(() => {
      if (this.goblin.isIn(this.field.getCell(this.currentIndex))) {
        // Гоблин не был убит — промах
        this.goblin.hide();
        this.scoreBoard.addMiss();
        if (this.scoreBoard.misses >= MAX_MISSES) {
          this.stop();
          return;
        }
      }
      this.nextRound();
    }, GOBLIN_TIMEOUT);
  }

  onClick(e) {
    const cell = e.target.closest('.cell');
    if (!cell) return;
    const index = Number(cell.dataset.index);
    if (this.currentIndex === index && this.goblin.isIn(this.field.getCell(index))) {
      clearTimeout(this.timer);
      this.goblin.hide();
      this.scoreBoard.addScore();
      this.nextRound();
    }
  }
}
