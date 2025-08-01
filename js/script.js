const content = {
  sobre_mi:
  `
  <iframe src="assets/notebooks/acerca.html" class="embed-notebook"></iframe>
  `,

  ar: `
  <iframe src="assets/notebooks/ar_model2.html" class="embed-notebook"></iframe>
`,

  ma: `

  <iframe src="assets/notebooks/ma_model.html" class="embed-notebook"></iframe>
`,

  arima: "<h2>ARIMA</h2><p>Modelo clásico que combina AR y MA con diferenciación.</p>",
  sarima: "<h2>SARIMA</h2><p>Extiende ARIMA incorporando estacionalidad.</p>",
  var: "<h2>VAR</h2><p>Modelo multivariado que captura relaciones entre múltiples series.</p>",
  mfles: "<h2>MFLES</h2><p>Modelo híbrido (defínelo según tus conceptos). Ideal para integrar señales.</p>",
  randomforest: "<h2>Random Forest</h2><p>Conjunto de árboles que mejora la precisión en forecasting.</p>",
  xgboost: "<h2>XGBoost</h2><p>Algoritmo eficiente basado en boosting. Usado en competiciones de datos.</p>",
  catboost: "<h2>CatBoost</h2><p>Modelo robusto con manejo avanzado de variables categóricas.</p>",
  lightgbm: "<h2>LightGBM</h2><p>Implementación rápida y ligera de boosting con buen rendimiento.</p>"
};


function showContent(model) {
  const mainContent = document.getElementById("main-content");
  const tocSidebar = document.querySelector(".toc-sidebar");
  const rawHtml = content[model];

  const srcMatch = rawHtml.match(/src="([^"]+)"/);
  const src = srcMatch ? srcMatch[1] : null;

  mainContent.innerHTML = "";

  // 👉 Oculta el índice lateral si se está mostrando información personal
  if (model === "sobre_mi") {
    tocSidebar.style.display = "none";
    mainContent.innerHTML = rawHtml;
    return;
  } else {
    tocSidebar.style.display = "block";
  }

  if (src) {
    const iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.className = "embed-notebook";

    mainContent.appendChild(iframe);

    const checkLoaded = setInterval(() => {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      if (doc && doc.readyState === "complete") {
        clearInterval(checkLoaded);
        updateTOCFromIframe(iframe);
      }
    }, 300);
  } else {
    mainContent.innerHTML = rawHtml;
    updateTOCFromContainer(mainContent);
  }
}



function updateTOCFromIframe(iframe) {
  const tocList = document.getElementById("toc-list");
  tocList.innerHTML = "";

  const doc = iframe.contentDocument || iframe.contentWindow.document;
  if (!doc) return;

  const headings = Array.from(doc.querySelectorAll(".jp-RenderedMarkdown h2, .jp-RenderedMarkdown h3"));
  const indexMap = new Map();
  let currentGroup = null;

  headings.forEach(heading => {
    const codeElem = heading.querySelector("code");
    const text = codeElem ? codeElem.textContent.trim() : heading.textContent.trim();
    const id = heading.id || text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]/g, "");
    if (!id || !text) return;

    heading.id = id;

    if (heading.tagName === "H2") {
      const groupItem = document.createElement("li");
      groupItem.className = "toc-h2 collapsible";

      const groupLabel = document.createElement("div");
      groupLabel.textContent = text;
      groupLabel.className = "toc-h2-label";
      groupLabel.onclick = () => groupItem.classList.toggle("expanded");

      const subList = document.createElement("ul");
      subList.className = "toc-sublist";

      groupItem.appendChild(groupLabel);
      groupItem.appendChild(subList);
      tocList.appendChild(groupItem);

      currentGroup = subList;
      indexMap.set(id, groupLabel);
    } else if (heading.tagName === "H3" && currentGroup) {
      const subItem = document.createElement("li");
      subItem.textContent = text;
      subItem.className = "toc-h3";
      subItem.onclick = () => heading.scrollIntoView({ behavior: "smooth" });

      currentGroup.appendChild(subItem);
      indexMap.set(id, subItem);
    }
  });

  // Resaltado dinámico
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const item = indexMap.get(id);
      if (item) {
        item.classList.toggle("active-toc", entry.isIntersecting);
      }
    });
  }, {
    root: doc,
    rootMargin: '0px 0px -80% 0px',
    threshold: 0
  });

  headings.forEach(h => observer.observe(h));
}
