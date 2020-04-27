import Entity from './Entity';
class Player extends Entity {
    
    attributes = {
        name: 'Player',
        ascii: '@',
        health: 10
    }

    move(dx, dy){
        this.x += dx;
        this.y += dy;
    }

    draw(context) {
        context.fillStyle = '#f40';
        context.textBaseline = 'hanging';
        context.font = '16px Helvetica';
        context.fillText('@', this.x * this.size, this.y * this.size);
    }

    copyPlayer(){
        let newPlayer = new Player();
        Object.assign(newPlayer, this);
        return newPlayer;
    }
}

export default Player;