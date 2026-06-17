export function applyThemeColor(hex) {
  if (typeof document === "undefined") return;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", hex);
}

let faviconLink = null;
let canvas = null;
let iconMark = null;
let iconMarkPromise = null;

function ensureFaviconLink() {
  if (faviconLink) return faviconLink;
  document.querySelectorAll('link[rel="icon"]').forEach((el) => el.remove());
  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/png";
  document.head.appendChild(link);
  faviconLink = link;
  return link;
}

function loadIconMark() {
  if (iconMark) return Promise.resolve(iconMark);
  if (iconMarkPromise) return iconMarkPromise;
  iconMarkPromise = new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      iconMark = img;
      resolve(img);
    };
    img.onerror = reject;
    img.src = "/icon-mark.png";
  });
  return iconMarkPromise;
}

function drawFavicon(bgHex) {
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
  }
  const ctx = canvas.getContext("2d");
  if (!ctx || !iconMark) return;

  const S = 64;
  ctx.clearRect(0, 0, S, S);
  ctx.fillStyle = bgHex;
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(0, 0, S, S, 12);
    ctx.fill();
  } else {
    ctx.fillRect(0, 0, S, S);
  }

  const pad = S * 0.12;
  const size = S - pad * 2;
  ctx.drawImage(iconMark, pad, pad, size, size);
  ensureFaviconLink().href = canvas.toDataURL("image/png");
}

export function applyFavicon(bgHex) {
  if (typeof document === "undefined") return;
  try {
    loadIconMark()
      .then(() => drawFavicon(bgHex))
      .catch(() => {});
  } catch {}
}
