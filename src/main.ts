import Vector2 from './Vector2';

const canvas = document.getElementById("canvas") as (HTMLCanvasElement | null);
if (!canvas) throw new Error('An unexpected error occured while rendering the game. Please, try again later.')

const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d")
if (!ctx) throw new Error('An unexpected error occured while rendering the game. Please, try again later.')

canvas.width = 1024
canvas.height = 768

const GRID_COLS = 16
const GRID_ROWS = 12

// const canvasVector = new Vector2(canvas.width / GRID_COLS, canvas.height / GRID_ROWS)

const framesCap = 60
const frameInterval = 1000 / framesCap
const moveSpeed = 0.1 // coordinates per frame
const camRotateSpeed = 1 // degrees per frame

const cellWidth = canvas.width / GRID_COLS
const cellHeight = canvas.height / GRID_ROWS

let playerPos = new Vector2(8, 6)
let directionPos = new Vector2(8, 5)

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
  ctx.arc(x * cellWidth, y * cellHeight, 10, 0, 2 * Math.PI)
  ctx.fill()
  ctx.closePath()


}

setInterval(() => {
  drawGrid()
  drawLine(playerPos, directionPos, 'red')
  drawDot(directionPos, 'black')
  drawDot(playerPos, 'red')
}, frameInterval)

type KeypressInterval = {
  key: string,
  id: number,
}

const keypressIntervals: KeypressInterval[] = []

function initCameraRotateInterval(key: string, deg: number): void {
  // if such an interval is present, skip
  if (keypressIntervals.find((i) => i.key === key)) return

  const id = setInterval(() => {
    directionPos = directionPos.rotate(deg, playerPos)
  }, frameInterval)

  keypressIntervals.push({ key, id })
}

function initMoveInterval(key: string, dir: Vector2): void {
  // if such an interval is present, skip
  if (keypressIntervals.find((i) => i.key === key)) return

  const id = setInterval(() => {
    playerPos = playerPos.add(dir)
  }, frameInterval)

  keypressIntervals.push({ key, id })
}

function removeKeypressInterval(key: string): void {
  const idx = keypressIntervals.findIndex((i: KeypressInterval) => i.key === key)

  if (idx === -1) return

  clearInterval(keypressIntervals[idx].id)
  keypressIntervals.splice(idx, 1)
}

// listeners for the keypresses
document.addEventListener('keydown', (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowUp':
      initMoveInterval(event.key, new Vector2(0, -moveSpeed))
      break
    case 'ArrowLeft':
      initCameraRotateInterval(event.key, -camRotateSpeed)
      break
    case 'ArrowDown':
      initMoveInterval(event.key, new Vector2(0, moveSpeed))
      break
    case 'ArrowRight':
      initCameraRotateInterval(event.key, camRotateSpeed)
      break
    default:
      break
  }
})

document.addEventListener('keyup', (event: KeyboardEvent) => {
  removeKeypressInterval(event.key)
})

// TODO
// - find ray directions
// - render walls (according to map)
// - ray/wall collision
// - camera + fov + rendering
// - movement/mouselook
// - textures?
// - sound?
// - framerate counter?