import Entity from './Entity';
import sprite from '../textures/basic_idle_01.png'
class Player extends Entity {
  inventory = [];

  attributes = {
    name: 'Player',
    ascii: '@',
    health: 10,
    offset: { x: -8, y: -8 },
  }

  move(dx, dy) {
    if (this.attributes.health <= 0) return;
    this.x += dx;
    this.y += dy;
  }

  add(item) {
    this.inventory.push(item);
  }

  draw(context) {
    // context.fillStyle = '#f40';
    // context.textBaseline = 'hanging';
    // context.font = '16px Helvetica';
    // context.fillText('@', this.x * this.size, this.y * this.size);
    // var image = new Image();
    this.sprite.src = sprite;
    context.drawImage(this.sprite, this.x * this.size + this.attributes.offset.x, this.y * this.size + this.attributes.offset.y, 32, 32)
  }

  copyPlayer() {
    let newPlayer = new Player();
    Object.assign(newPlayer, this);
    return newPlayer;
  }
}

export default Player;