document.addEventListener("DOMContentLoaded", () => {
    const languageSelect = document.getElementById("language-select");
  
    const changeLanguage = (lang) => {
      if (lang === "es") {
        location.reload();
        return; //para español (lo cogemos directamente del html, asi que se recarga la pagina y ya está)
      }
  
      fetch("login.json")
        .then((response) => response.ok ? response.json() : Promise.reject("Error cargando JSON"))
        .then((translations) => {
          const elements = document.querySelectorAll("[data-translate]");
          elements.forEach((el) => {
            const key = el.getAttribute("data-translate");
            const translation = translations[lang]?.[key];
            if (translation) {
              el.tagName === "INPUT" && el.hasAttribute("placeholder")
                ? el.setAttribute("placeholder", translation)
                : el.textContent = translation;
            }
          });
        })
        .catch((error) => console.error("Error al cargar las traducciones:", error));
    };
  
    languageSelect.addEventListener("change", (event) => changeLanguage(event.target.value));
  });
  