import Entity from './Entity';
import Spawner from './Spawner';

class Stairs extends Entity {
    attributes = {name:'Stairs', color: 'cyan', ascii:'■', offset:{x:0,y:0}}
    
    action(verb, world) {
        if(verb === 'bump') {
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
}

export default Stairs;