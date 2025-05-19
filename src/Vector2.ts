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

    rotate(deg: number, origin: Vector2): Vector2 {
        const delta = this.subtract(origin)

        const angle = deg * (Math.PI / 180)

        const cos = Math.cos(angle)
        const sin = Math.sin(angle)

        const x2 = cos * delta.x - sin * delta.y
        const y2 = sin * delta.x + cos * delta.y

        return new Vector2(x2, y2).add(origin)
    }

    getDirection(_moveSpeed: number): Vector2 {
        // TODO

        return new Vector2(1, 1)
    }

    toArray(): [number, number] {
        return [this.x, this.y];
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}