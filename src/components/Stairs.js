import Entity from './Entity';
import Spawner from './Spawner';
import tileset from '../textures/topdown.png'

class Stairs extends Entity {
    attributes = { name: 'Stairs', color: 'cyan', ascii: '■', offset: { x: 0, y: 0 } };
    // constructor (x, y, size, attributes) {
    //     super(x, y, size, attributes);
    //     this.image = new Image();
    //     this.image.src = tileset;
    // }

    action(verb, world) {
        if (verb === 'bump') {
            world.addToHistory('Holy shit I\'m so lost, this dungeon never ends.')
            world.createCellularMap();
            world.player.x = 1;
            world.player.y = 1;
            world.moveToSpace(world.player);
            world.entities = world.entities.filter(e => e === world.player);
            let spawner = new Spawner(world);
            spawner.spawnLoot(0);
            spawner.spawnMonsters(6);
            spawner.spawnStairs();
        }
    }

    draw(context) {
        var image = new Image();
        image.src = tileset;
        context.drawImage(image, 0, 0, 8, 8, this.x * this.tileSize, this.y * this.tileSize, this.tileSize, this.tileSize);
    }
}

export default Stairs;