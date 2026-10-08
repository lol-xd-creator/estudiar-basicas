// Aplica el tema antes de pintar (sin parpadeo): el elegido, o por la hora
// del día (de 7 a 19 h, día). Script clásico y síncrono a propósito.
(function () {
  var t = null;
  try { t = localStorage.getItem("matematica.theme"); } catch (e) {}
  if (t !== "noche" && t !== "dia") {
    var h = new Date().getHours();
    t = h >= 7 && h < 19 ? "dia" : "noche";
  }
  document.documentElement.dataset.theme = t;
})();
