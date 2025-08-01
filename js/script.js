const content = {
  ar: "<h2>Modelo AR</h2><p>Modelo autoregresivo donde la variable depende de sus rezagos.</p>",
  ar: `<iframe src="assets/notebooks/ar_model.html" class="notebook-frame"></iframe>`,
  

  ma: "<h2>Modelo MA</h2><p>Modelo de medias móviles basado en errores anteriores.</p>",
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
  mainContent.innerHTML = content[model] || "<p>Modelo no encontrado.</p>";
}
