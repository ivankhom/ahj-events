export default class ScoreBoard {
  constructor(scoreEl, missesEl) {
    this.scoreEl = scoreEl;
    this.missesEl = missesEl;
    this.score = 0;
    this.misses = 0;
  }

  addScore() {
    this.score += 1;
    this.render();
  }

  addMiss() {
    this.misses += 1;
    this.render();
  }

  render() {
    this.scoreEl.textContent = this.score;
    this.missesEl.textContent = this.misses;
  }

  reset() {
    this.score = 0;
    this.misses = 0;
    this.render();
  }
}
