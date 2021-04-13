import { Map } from 'rot-js';
import Player from './Player';

class World {
  constructor(width, height, tileSize) {
    this.width = width;
    this.height = height;
    this.tileSize = tileSize;
    this.entities = [new Player(1, 1, tileSize)]
    this.history = ["You Enter the Dungeon", '---']
    // making 2d array
    this.worldmap = new Array(this.width);
    for (let x = 0; x < this.width; x++) {
      this.worldmap[x] = new Array(this.height);
    }
  }

  get player() {
    return this.entities[0];
  }

  getEntityAtLocation(x, y) {
    return this.entities.find(entity => entity.x === x && entity.y === y);
  }

  movePlayer(dx, dy) {
    let playerCopy = this.player.copyPlayer();
    playerCopy.move(dx, dy);
    let entity = this.getEntityAtLocation(playerCopy.x, playerCopy.y);
    if (entity) {
      console.log(entity);
      entity.action('bump', this);
      return;
    }

    if (this.isWall(playerCopy.x, playerCopy.y)) {
      console.log("way blocked.");
    } else {
      this.player.move(dx, dy);
    }
  }

  isWall(x, y) {
    return (this.worldmap[x][y] === 1 ||
      this.worldmap[y] === undefined ||
      this.worldmap[x] === undefined) ? true : false;
  }

  add(entity) {
    this.entities.push(entity);
  }

  remove(entity) {
    this.entities = this.entities.filter(e => e !== entity);
  }

  addToHistory(item) {
    this.history.push(item);
  }

  moveToSpace(entity) {
    for (let x = entity.x; x < this.width; x++) {
      for (let y = entity.y; y < this.height; y++) {
        if (this.worldmap[x][y] === 0 && !this.getEntityAtLocation(x, y)) {
          entity.x = x;
          entity.y = y;
          return;
        }

      }

    }
  }

  createCellularMap() {
    var map = new Map.Cellular(this.width, this.height, { connected: true });
    map.randomize(0.47);
    var userCallback = (x, y, value) => {
      if (x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1) {
        this.worldmap[x][y] = 1;
        return;
      }
      this.worldmap[x][y] = (value === 0) ? 1 : 0;
    };
    for (var i = 0; i < 10; i++) {
      map.create(userCallback);
      map.connect(userCallback, 1);
    }
    

  }

  draw(context) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.worldmap[x][y] === 1) this.drawWall(context, x, y);
      }
    }
    this.entities.forEach(entity => {
      entity.draw(context);
    })
  }

  drawWall(context, x, y) {
    context.fillStyle = '#000';
    context.fillRect(
      x * this.tileSize,
      y * this.tileSize,
      this.tileSize,
      this.tileSize,
    );
  }
}

export default World;