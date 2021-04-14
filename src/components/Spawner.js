import Loot from './Loot';
import Monster from './Monster';
import Stairs from './Stairs';
import spritePotion from '../textures/potion_red.png';
import spriteSword from '../textures/sword.png';
import spriteGold from '../textures/chest_open_full.png';

const lootTable = [
    { name: 'Long Sword', color: 'darkgrey', ascii: '/', offset: { x: 6, y: 3 }, texture: spriteSword },
    { name: 'Health Potion', color: 'red', ascii: '!', offset: { x: 0, y: 0 }, texture: spritePotion },
    { name: 'Gold Coin', color: 'yellow', ascii: '$', offset: { x: 4, y: 3 }, texture: spriteGold },
    { name: 'Light Armor', color: 'lightgrey', ascii: 'm', offset: { x: 4, y: 3 } }
];

const monsterTable = [
    { name: 'Skeleton', color: 'white', ascii: 'K', offset: { x: 0, y: 0 }, health: 3 },
    { name: 'Ogre', color: 'green', ascii: 'O', offset: { x: 2, y: 3 }, health: 6 },
    { name: 'Dragon', color: 'red', ascii: 'D', offset: { x: 2, y: 3 }, health: 10 },
    { name: 'Slime', color: 'pink', ascii: 'u', offset: { x: 2, y: 3 }, health: 2 },
];

class Spawner {
    constructor(world) {
        this.world = world;
    }

    spawn(spawnCount, createEntity) {
        for (let count = 0; count < spawnCount; count++) {
            let entity = createEntity();
            this.world.add(entity);
            this.world.moveToSpace(entity);
        }
    }

    spawnLoot(spawnCount) {
        this.spawn(spawnCount, () => {
            return new Loot(
                getRandomInt(this.world.width - 1),
                getRandomInt(this.world.height - 1),
                this.world.tileSize,
                lootTable[getRandomInt(lootTable.length)]
            );
        });
    }

    spawnMonsters(spawnCount) {
        this.spawn(spawnCount, () => {
            return new Monster(
                getRandomInt(this.world.width),
                getRandomInt(this.world.height),
                this.world.tileSize,
                monsterTable[getRandomInt(monsterTable.length)]
            );
        });
    }

    spawnStairs() {
        let stairs = new Stairs(this.world.width - 10, this.world.height - 10, this.world.tileSize);
        this.world.add(stairs);
        this.world.moveToSpace(stairs);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export default Spawner;