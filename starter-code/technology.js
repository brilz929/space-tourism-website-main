fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const techData = data.technology;

    const buttons = document.querySelectorAll(".number-indicators button");
    const techName = document.getElementById("technology-name");
    const techDescription = document.getElementById("technology-description");

    const portraitSource = document.getElementById("tech-image-portrait-source");
    const landscapeSource = document.getElementById("tech-image-landscape-source");
    const img = document.getElementById("tech-image-fallback");

    updateTechnology(0);

    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        buttons.forEach((b) => b.setAttribute("aria-selected", "false"));
        button.setAttribute("aria-selected", "true");

        updateTechnology(index);
      });
    });

    function updateTechnology(index) {
      const tech = techData[index];

      techName.textContent = tech.name;
      techDescription.textContent = tech.description;

      // Update images
      landscapeSource.srcset = tech.images.landscape;
      portraitSource.srcset = tech.images.portrait;
      img.src = tech.images.landscape;
      img.alt = tech.name;
    }
  });
