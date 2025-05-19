import Vector2 from './Vector2';

const canvas = document.getElementById("canvas") as (HTMLCanvasElement | null);
if (!canvas) throw new Error('An unexpected error occured while rendering the game. Please, try again later.')

const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d")
if (!ctx) throw new Error('An unexpected error occured while rendering the game. Please, try again later.')

canvas.width = 1024
canvas.height = 768

const GRID_COLS = 16
const GRID_ROWS = 12

const canvasVector = new Vector2(canvas.width / GRID_COLS, canvas.height / GRID_ROWS)

const cellWidth = canvas.width / GRID_COLS
const cellHeight = canvas.height / GRID_ROWS

function drawLine(start: Vector2, end: Vector2, color?: string): void {
  if (!ctx) throw new Error('No canvas context!')

  if (color !== undefined) {
    ctx.strokeStyle = color
  }

  ctx.beginPath()
  ctx.moveTo(start.x * cellWidth, start.y * cellHeight)
  ctx.lineTo(end.x * cellWidth, end.y * cellHeight)
  ctx.stroke()
  ctx.closePath()
}

function drawGrid() {
  if (!ctx || !canvas) throw new Error('No canvas/context!')

  ctx.reset()

  // background
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Draw vertical lines
  for (let i = 0; i <= GRID_COLS; i++) {
    ctx.strokeStyle = '#000000'

    const start = new Vector2(i, 0)
    const end = new Vector2(i, GRID_ROWS)

    drawLine(start, end, 'black')
  }

  // Draw horizontal lines
  for (let i = 0; i <= GRID_ROWS; i++) {
    ctx.strokeStyle = '#000000'

    const start = new Vector2(0, i)
    const end = new Vector2(GRID_COLS, i)

    drawLine(start, end, 'black')
  }
}

function drawDot(origin: Vector2, color: string) {
  if (!ctx) throw new Error('No canvas context!')

  const [x, y] = origin.toArray()

  ctx.fillStyle = color

  ctx.beginPath()
  ctx.arc(x * cellWidth, y * cellHeight, 15, 0, 2 * Math.PI)
  ctx.fill()
  ctx.closePath()


}

const playerPos = new Vector2(8, 6)

drawGrid()
drawDot(playerPos, 'red')

canvas.onmousemove = (e: MouseEvent) => {
  const mousePos = new Vector2(e.offsetX, e.offsetY).divide(canvasVector)

  drawGrid()

  drawLine(playerPos, mousePos, 'red')

  drawDot(mousePos, 'black')
  drawDot(playerPos, 'red')
}