class Entity {
    constructor(x, y, size, attributes) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.attributes = { ...attributes }
        this.sprite = new Image();
    }

    action(verb, world) {
        console.log(`Verb: ${verb}`);
    }

    draw(context) {
        if (this.attributes.texture) {
            this.sprite.src = this.attributes.texture;
            context.drawImage(this.sprite, this.x * this.size, this.y * this.size, this.size, this.size)
        } else {
            context.fillStyle = this.attributes.color || 'white';
            context.textBaseline = 'hanging';
            context.font = '16px Helvetica';
            context.fillText(
                this.attributes.ascii,
                this.x * this.size + (this.attributes.offset ? this.attributes.offset.x : 0),
                this.y * this.size + (this.attributes.offset ? this.attributes.offset.y : 0)
            );
        }
    }
}

export default Entity;