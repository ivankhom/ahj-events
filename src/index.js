import './style.css';
import Field from './Field';
import Goblin from './Goblin';
import ScoreBoard from './ScoreBoard';
import Game from './Game';

const fieldEl = document.getElementById('field');
const scoreEl = document.getElementById('score');
const missesEl = document.getElementById('misses');
const overlay = document.getElementById('overlay');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const field = new Field(fieldEl, 4);
field.render();

const goblin = new Goblin();
goblin.create();

const scoreBoard = new ScoreBoard(scoreEl, missesEl);
const game = new Game(field, goblin, scoreBoard, overlay);

startBtn.addEventListener('click', () => game.start());
restartBtn.addEventListener('click', () => game.start());
