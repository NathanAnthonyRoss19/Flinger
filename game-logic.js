class GameLogic {
    constructor() {
        this.player = new PhysicsObj(0, 1, 1/32);

        this.lastTick = -1;
        this.milisecondsPerTick = 20;
    }

    tick() {
        this.player.tick();
    }

    performTicks(timestamp) {
        this.lastTick = Math.max(this.lastTick, timestamp - 100);

        while (this.lastTick + this.milisecondsPerTick < timestamp) {
            this.tick();
            this.lastTick += this.milisecondsPerTick;
        }
    }

    getX(physicsObj, timestamp) {
        return physicsObj.prevX + (physicsObj.x - physicsObj.prevX) * (timestamp - this.lastTick) / this.milisecondsPerTick;
    }

    getY(physicsObj, timestamp) {
        return physicsObj.prevY + (physicsObj.y - physicsObj.prevY) * (timestamp - this.lastTick) / this.milisecondsPerTick;
    }
}

class PhysicsObj {
    constructor(x = 0, y = 0, r = 1, vx = 0, vy = 0) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.prevX = x;
        this.prevY = y;
        this.vx = vx;
        this.vy = vy;
    }

    tick() {
        this.prevX = this.x;
        this.prevY = this.y;

        if (!this.held) {
            this.vy -= 0.002;
            this.x += this.vx;
            this.y += this.vy;
    
            if (this.y < this.r) {
                this.vx *= 0.9;
                this.vy = -this.vy * 0.9;
                this.y = this.r;
            }

            if (this.x < -aspectRatio / 2 + this.r) {
                this.vy *= 0.9;
                this.vx = -this.vx * 0.9;
                this.x = -aspectRatio / 2 + this.r;
            }

            if (this.x > aspectRatio / 2 - this.r) {
                this.vy *= 0.9;
                this.vx = -this.vx * 0.9;
                this.x = aspectRatio / 2 - this.r;
            }
        }
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}