export const canvasScript = () => {
  const canvas = document.getElementById("waveCanvas") as HTMLCanvasElement
  if (!canvas) return

  const ctx = canvas.getContext("2d")!

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  type Ripple = { x: number; y: number; radius: number; alpha: number }
  const ripples: Ripple[] = []

  function addRipple() {
    ripples.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 0,
      alpha: 0.5,
    })
  }

  setInterval(addRipple, 3000)

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i]
      r.radius += 4
      r.alpha -= 0.005

      ctx.beginPath()
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(0, 100, 200, ${r.alpha})`
      ctx.lineWidth = 3
      ctx.stroke()

      if (r.alpha <= 0 || r.radius > Math.max(canvas.width, canvas.height)) {
        ripples.splice(i, 1)
      }
    }

    requestAnimationFrame(animate)
  }

  animate()

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
}
