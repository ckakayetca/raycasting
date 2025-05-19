export default class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    add(that: Vector2): Vector2 {
        return new Vector2(this.x + that.x, this.y + that.y)
    }

    subtract(that: Vector2): Vector2 {
        return new Vector2(this.x - that.x, this.y - that.y);
    }

    multiply(that: Vector2): Vector2 {
        return new Vector2(this.x * that.x, this.y * that.y);
    }

    divide(that: Vector2): Vector2 {
        return new Vector2(this.x / that.x, this.y / that.y);
    }

    toArray(): [number, number] {
        return [this.x, this.y];
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}