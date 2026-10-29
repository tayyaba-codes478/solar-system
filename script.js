const planets = {
  Sun: {
    type: "THE STAR AT OUR CENTER",
    description: "The Sun is the star at the center of our Solar System. Its gravity holds the planets in their orbits, and its energy makes life on Earth possible.",
    day: "About 27 Earth days",
    year: "About 225 million years around galaxy",
    distance: "0 km",
    art: "sun-art"
  },
  Mercury: {
    type: "TERRESTRIAL PLANET",
    description: "Mercury is the smallest planet and the closest to the Sun. Its rocky surface has many craters, and temperatures change dramatically between day and night.",
    day: "59 Earth days",
    year: "88 Earth days",
    distance: "57.9 million km",
    art: "mercury-art"
  },
  Venus: {
    type: "TERRESTRIAL PLANET",
    description: "Venus has a thick atmosphere rich in carbon dioxide. Its powerful greenhouse effect makes it the hottest planet in our Solar System.",
    day: "243 Earth days",
    year: "225 Earth days",
    distance: "108.2 million km",
    art: "venus-art"
  },
  Earth: {
    type: "TERRESTRIAL PLANET",
    description: "Our pale blue home is the only world currently known to support life. Its liquid-water oceans, protective atmosphere and suitable temperatures make it extraordinary.",
    day: "24 hours",
    year: "365 days",
    distance: "149.6 million km",
    art: "earth-art"
  },
  Mars: {
    type: "TERRESTRIAL PLANET",
    description: "Known as the Red Planet, Mars has a dusty surface, enormous volcanoes and evidence of ancient flowing water. Scientists study it to understand whether life may once have existed there.",
    day: "24 hours 37 minutes",
    year: "687 Earth days",
    distance: "227.9 million km",
    art: "mars-art"
  },
  Jupiter: {
    type: "GAS GIANT",
    description: "Jupiter is the largest planet in the Solar System. Its atmosphere contains colorful cloud bands and the Great Red Spot, a gigantic storm that has lasted for centuries.",
    day: "About 9 hours 56 minutes",
    year: "11.86 Earth years",
    distance: "778.6 million km",
    art: "jupiter-art"
  },
  Saturn: {
    type: "GAS GIANT",
    description: "Saturn is famous for its spectacular rings made mostly of ice and rocky particles. It is a giant planet with many moons and a very low average density.",
    day: "About 10.7 hours",
    year: "29.4 Earth years",
    distance: "1.43 billion km",
    art: "saturn-art"
  },
  Uranus: {
    type: "ICE GIANT",
    description: "Uranus is a pale blue-green ice giant that rotates on its side. Its atmosphere contains methane, which helps give the planet its distinctive color.",
    day: "About 17 hours",
    year: "84 Earth years",
    distance: "2.87 billion km",
    art: "uranus-art"
  },
  Neptune: {
    type: "ICE GIANT",
    description: "Neptune is the most distant recognized planet from the Sun. This deep-blue ice giant has extremely powerful winds and takes many decades to complete one orbit.",
    day: "About 16 hours",
    year: "165 Earth years",
    distance: "4.50 billion km",
    art: "neptune-art"
  }
};

const planetOrder = [
  "Sun", "Mercury", "Venus", "Earth", "Mars",
  "Jupiter", "Saturn", "Uranus", "Neptune"
];

const stage = document.querySelector(".space-stage");
const pauseButton = document.getElementById("pause-btn");
const resetButton = document.getElementById("reset-btn");
const speedSlider = document.getElementById("speed");
const speedValue = document.getElementById("speed-value");

let isPaused = false;
let currentSpeed = 1;

function selectPlanet(name) {
  const planet = planets[name];

  if (!planet) return;

  document.getElementById("planet-name").textContent = name;
  document.getElementById("planet-type").textContent = planet.type;
  document.getElementById("planet-description").textContent =
    planet.description;
  document.getElementById("planet-day").textContent = planet.day;
  document.getElementById("planet-year").textContent = planet.year;
  document.getElementById("planet-distance").textContent =
    planet.distance;

  const art = document.getElementById("planet-art");
  art.className = "planet-art " + planet.art;

  const index = planetOrder.indexOf(name) + 1;

  document.getElementById("planet-counter").textContent =
    String(index).padStart(2, "0") + " / 09";

  document.querySelectorAll("[data-planet]").forEach((element) => {
    const selected = element.dataset.planet === name;

    if (element.classList.contains("nav-planet")) {
      element.classList.toggle("active", selected);
    }

    if (element.classList.contains("planet")) {
      element.setAttribute("aria-pressed", String(selected));
    }
  });
}

document.querySelectorAll("[data-planet]").forEach((element) => {
  element.addEventListener("click", () => {
    selectPlanet(element.dataset.planet);

    // Planet details par smoothly scroll karo.
    document.getElementById("details").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

pauseButton.addEventListener("click", () => {
  isPaused = !isPaused;

  stage.classList.toggle("paused", isPaused);

  pauseButton.innerHTML = isPaused
    ? "▶ &nbsp; Resume orbits"
    : "Ⅱ &nbsp; Pause orbits";

  document.getElementById("orbit-status").textContent =
    isPaused ? "ORBIT ANIMATION PAUSED" : "ORBIT ANIMATION";
});

function updateSpeed() {
  currentSpeed = Number(speedSlider.value);

  speedValue.textContent = currentSpeed.toFixed(1) + "×";

  document.querySelectorAll(".orbit").forEach((orbit) => {
    const styles = window.getComputedStyle(orbit);
    const duration = parseFloat(styles.getPropertyValue("--duration"));

    // Original speed ko selected multiplier se adjust karo.
    orbit.style.animationDuration = (duration / currentSpeed) + "s";
  });
}

speedSlider.addEventListener("input", updateSpeed);

resetButton.addEventListener("click", () => {
  isPaused = false;
  stage.classList.remove("paused");

  pauseButton.innerHTML = "Ⅱ &nbsp; Pause orbits";
  document.getElementById("orbit-status").textContent =
    "ORBIT ANIMATION";

  speedSlider.value = "1";
  updateSpeed();
  selectPlanet("Earth");
});

selectPlanet("Earth");
updateSpeed();