/* Renders the CV PDF as paper sheets (PDF.js), instead of the browser's
   own PDF viewer. Without JavaScript the page falls back to <object>. */
import * as pdfjs from "../vendor/pdfjs/pdf.min.js";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("../vendor/pdfjs/pdf.worker.min.js", import.meta.url).href;

const holder = document.querySelector("[data-pdf]");

async function main() {
  if (!holder) return;
  const url = holder.dataset.pdf;
  const pages = holder.querySelector(".doc__pages");
  const pdf = await pdfjs.getDocument({ url }).promise;
  let lastWidth = 0;

  async function render() {
    const width = pages.clientWidth;
    if (!width || width === lastWidth) return;
    lastWidth = width;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const frag = document.createDocumentFragment();
    for (let n = 1; n <= pdf.numPages; n++) {
      const page = await pdf.getPage(n);
      const base = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: (width / base.width) * dpr });
      const canvas = document.createElement("canvas");
      canvas.className = "doc__page";
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.aspectRatio = base.width + " / " + base.height;
      canvas.setAttribute("role", "img");
      canvas.setAttribute("aria-label", "CV, page " + n + " of " + pdf.numPages);
      await page.render({ canvas, canvasContext: canvas.getContext("2d"), viewport }).promise;
      const link = document.createElement("a");
      link.href = url;
      link.className = "doc__sheet";
      link.title = "Open the PDF";
      link.appendChild(canvas);
      frag.appendChild(link);
    }
    pages.replaceChildren(frag);
    holder.classList.add("is-rendered");
  }

  await render();
  let timer;
  new ResizeObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(render, 200);
  }).observe(pages);
}

main().catch((err) => {
  console.error(err);
  if (holder) holder.classList.add("is-failed");
});
