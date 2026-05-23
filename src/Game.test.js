import { getRandomIndex, MAX_MISSES, GOBLIN_TIMEOUT } from './Game';

describe('getRandomIndex', () => {
  test('returns index within range', () => {
    const idx = getRandomIndex(16);
    expect(idx).toBeGreaterThanOrEqual(0);
    expect(idx).toBeLessThan(16);
  });

  test('never returns excluded index', () => {
    for (let i = 0; i < 100; i++) {
      expect(getRandomIndex(16, 5)).not.toBe(5);
    }
  });
});

describe('Game constants', () => {
  test('MAX_MISSES is 5', () => {
    expect(MAX_MISSES).toBe(5);
  });

  test('GOBLIN_TIMEOUT is 1000ms', () => {
    expect(GOBLIN_TIMEOUT).toBe(1000);
  });
});

describe('ScoreBoard', () => {
  let scoreEl;
  let missesEl;
  let ScoreBoard;

  beforeEach(async () => {
    scoreEl = document.createElement('span');
    missesEl = document.createElement('span');
    const module = await import('./ScoreBoard');
    ScoreBoard = module.default;
  });

  test('starts at zero', () => {
    const sb = new ScoreBoard(scoreEl, missesEl);
    expect(sb.score).toBe(0);
    expect(sb.misses).toBe(0);
  });

  test('addScore increments score', () => {
    const sb = new ScoreBoard(scoreEl, missesEl);
    sb.addScore();
    expect(sb.score).toBe(1);
    expect(scoreEl.textContent).toBe('1');
  });

  test('addMiss increments misses', () => {
    const sb = new ScoreBoard(scoreEl, missesEl);
    sb.addMiss();
    expect(sb.misses).toBe(1);
    expect(missesEl.textContent).toBe('1');
  });

  test('reset clears score and misses', () => {
    const sb = new ScoreBoard(scoreEl, missesEl);
    sb.addScore();
    sb.addMiss();
    sb.reset();
    expect(sb.score).toBe(0);
    expect(sb.misses).toBe(0);
  });
});

describe('Field', () => {
  let Field;

  beforeEach(async () => {
    const module = await import('./Field');
    Field = module.default;
  });

  test('renders 16 cells for 4x4', () => {
    const container = document.createElement('div');
    const field = new Field(container, 4);
    field.render();
    expect(field.getSize()).toBe(16);
    expect(container.querySelectorAll('.cell').length).toBe(16);
  });

  test('each cell has data-index', () => {
    const container = document.createElement('div');
    const field = new Field(container, 4);
    field.render();
    const cells = container.querySelectorAll('.cell');
    cells.forEach((cell, i) => {
      expect(cell.dataset.index).toBe(String(i));
    });
  });
});
