//this file is AI generated
//that was too technical for now, and i wanted to have a nice result
//will come back to this later

(function () {
  const canvas = document.createElement("canvas");
  canvas.id = "snow-canvas";
  Object.assign(canvas.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",   
    zIndex: "0",            
    opacity: "0.55",
  });
  document.body.prepend(canvas);

  
  document.body.style.position = "relative";

  const ctx = canvas.getContext("2d");
  let W, H, flakes;

 
  function drawFlake(x, y, r, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = "#b4d8f7";
    ctx.lineWidth = Math.max(0.5, r / 8);
    ctx.lineCap = "round";

    for (let i = 0; i < 6; i++) {
      ctx.save();
      ctx.rotate((Math.PI / 3) * i);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -r);
      ctx.stroke();

      [0.45, 0.72].forEach((ratio) => {
        const len = r * 0.28;
        const py = -r * ratio;
        ctx.beginPath();
        ctx.moveTo(-len, py - len * 0.5);
        ctx.lineTo(0, py);
        ctx.lineTo(len, py - len * 0.5);
        ctx.stroke();
      });

      ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(0, 0, Math.max(0.8, r / 9), 0, Math.PI * 2);
    ctx.fillStyle = "#b4d8f7";
    ctx.fill();

    ctx.restore();
  }

  function init() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;

    const count = Math.floor((W * H) / 22000);

    flakes = Array.from({ length: count }, () => makeFlake());
  }

  function makeFlake(startAtTop = false) {
    const r = 4 + Math.random() * 10; 
    return {
      x: Math.random() * W,
      y: startAtTop ? -r * 2 : Math.random() * H,
      r,
      speed: 0.3 + Math.random() * 0.7,   
      drift: (Math.random() - 0.5) * 0.4, 
      alpha: 0.2 + Math.random() * 0.55,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.008,
    };
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);

    flakes.forEach((f) => {
      f.y += f.speed;
      f.x += f.drift;
      f.angle += f.spin;

      if (f.y > H + f.r * 2) {
        Object.assign(f, makeFlake(true));
        f.x = Math.random() * W;
      }
      if (f.x < -f.r * 2) f.x = W + f.r;
      if (f.x > W + f.r * 2) f.x = -f.r;

      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.angle);
      ctx.translate(-f.x, -f.y);
      drawFlake(f.x, f.y, f.r, f.alpha);
      ctx.restore();
    });

    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", init);
  init();
  animate();
})();