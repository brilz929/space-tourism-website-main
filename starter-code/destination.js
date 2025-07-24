fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const destinations = data.destinations;

    const tabs = document.querySelectorAll(".tab-list button");
    const name = document.querySelector(".destination-info h2");
    const desc = document.querySelector(".destination-info p");
    const distance = document.querySelector(".destination-meta div:nth-child(1) p");
    const travel = document.querySelector(".destination-meta div:nth-child(2) p");
    const img = document.querySelector(".grid-container--destination picture img");
    const source = document.querySelector(".grid-container--destination picture source");

    // Initialize with the first destination
    updateDestination(0);

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.setAttribute("aria-selected", "false"));
        tab.setAttribute("aria-selected", "true");
        updateDestination(index);
      });
    });

    function updateDestination(index) {
      const dest = destinations[index];

      name.textContent = dest.name;
      desc.textContent = dest.description;
      distance.textContent = dest.distance;
      travel.textContent = dest.travel;

      img.src = dest.images.png;
      img.alt = dest.name;
      if (source) {
        source.srcset = dest.images.webp;
      }
    }
  });
