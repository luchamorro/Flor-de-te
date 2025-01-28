document.addEventListener("DOMContentLoaded", () => {
    const languageSelect = document.getElementById("language-select");
  
    // Comprobar si hay un idioma guardado en localStorage
    const savedLanguage = localStorage.getItem("selectedLanguage") || "es"; // Por defecto "es"
    languageSelect.value = savedLanguage; // Seleccionar el idioma guardado en el dropdown
    applyLanguage(savedLanguage); // Aplicar el idioma guardado
  
    function applyLanguage(lang) {
      if (lang === "es") {
        // Si es español, no hacemos traducción porque ya está en el HTML
        document.querySelectorAll("[data-translate]").forEach((el) => {
          el.textContent = el.getAttribute("data-original") || el.textContent; // Restaurar texto original si existe
        });
        return;
      }
  
      // Cargar las traducciones desde el archivo JSON
      fetch("carrito.json")
        .then((response) => response.json())
        .then((translations) => {
          document.querySelectorAll("[data-translate]").forEach((el) => {
            const key = el.getAttribute("data-translate");
            const translation = translations[lang]?.[key];
            if (translation) {
              if (!el.getAttribute("data-original")) {
                el.setAttribute("data-original", el.textContent); // Guardar el texto original para restaurarlo si se vuelve a "es"
              }
              if (el.tagName === "INPUT" && el.type === "checkbox") {
                const label = document.querySelector(`label[for="${el.id}"]`);
                if (label) label.textContent = translation;
              } else if (el.hasAttribute("placeholder")) {
                el.setAttribute("placeholder", translation);
              } else {
                el.textContent = translation;
              }
            }
          });
        })
        .catch((error) => console.error("Error al cargar las traducciones:", error));
    }
  
    // Cambiar el idioma al seleccionar una opción del dropdown
    languageSelect.addEventListener("change", (event) => {
      const selectedLanguage = event.target.value;
      localStorage.setItem("selectedLanguage", selectedLanguage); // Guardar el idioma seleccionado
      applyLanguage(selectedLanguage); // Aplicar el idioma sin recargar la página
    });
  });
  