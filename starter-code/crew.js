fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const crewData = data.crew;

    const dots = document.querySelectorAll(".dot-indicators button");
    const role = document.querySelector(".crew-details h2");
    const name = document.querySelector(".crew-details .fs-700");
    const bio = document.querySelector(".crew-details p:not(.fs-700)");

    const img = document.getElementById("crew-img-png");
    const source = document.getElementById("crew-img-webp");

    updateCrew(0);

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        dots.forEach((d) => d.setAttribute("aria-selected", "false"));
        dot.setAttribute("aria-selected", "true");
        updateCrew(index);
      });
    });

    function updateCrew(index) {
      const member = crewData[index];

      role.textContent = member.role;
      name.textContent = member.name;
      bio.textContent = member.bio;

      if (img) {
        img.src = member.images.png;
        img.alt = member.name;
      }

      if (source) {
        source.srcset = member.images.webp;
      }
    }
  });
