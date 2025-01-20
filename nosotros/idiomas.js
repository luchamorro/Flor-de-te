document.addEventListener("DOMContentLoaded", () => {
  const languageSelect = document.getElementById("language-select");

  // Función para cambiar el idioma
  const changeLanguage = (lang) => {
    console.log("Idioma seleccionado:", lang); // Depuración

    if (lang === "es") {
      // Recargar la página para mostrar el contenido predeterminado (español)
      location.reload();
    } else {
      // Cargar las traducciones en inglés desde el JSON
      fetch("traducciones.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error("No se pudo cargar el archivo JSON");
          }
          return response.json();
        })
        .then((translations) => {
          document.querySelectorAll("[data-translate]").forEach((element) => {
            const key = element.getAttribute("data-translate");
            if (translations[lang] && translations[lang][key]) {
              element.textContent = translations[lang][key];
            }
          });
        })
        .catch((error) => console.error("Error al cargar las traducciones:", error));
    }
  };

  // Cambiar idioma al seleccionar una opción
  languageSelect.addEventListener("change", (event) => {
    changeLanguage(event.target.value);
  });
});
