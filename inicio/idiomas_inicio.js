document.addEventListener("DOMContentLoaded", () => {
  const languageSelect = document.getElementById("language-select");

  const changeLanguage = (lang) => {
    if (lang === "es") return location.reload(); // Recarga la página para español

    fetch("inicio.json")
      .then((response) => response.json())
      .then((translations) => {
        // Traducir todos los elementos con el atributo 'data-translate'
        document.querySelectorAll("[data-translate]").forEach((el) => {
          const key = el.getAttribute("data-translate");
          const translation = translations[lang]?.[key];
          if (!translation) return;

          if (el.tagName === "INPUT" && el.type === "checkbox") {
            // Buscar la etiqueta asociada al checkbox
            const label = document.querySelector(`label[for="${el.id}"]`);
            if (label) {
              label.textContent = translation;
            }
          } else if (el.hasAttribute("placeholder")) {
            el.setAttribute("placeholder", translation);
          } else {
            el.textContent = translation;
          }
        });
      })
      .catch((error) => console.error("Error al cargar las traducciones:", error));
  };

  languageSelect.addEventListener("change", (event) => changeLanguage(event.target.value));
});
