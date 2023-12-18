document.addEventListener("DOMContentLoaded", function () {
  // Values for the application
  const groceries = [
    { name: "Apple", origin: "Finland", caloriesPer100g: 52, co2PerKg: 0.2 },
    { name: "Almonds", origin: "USA", caloriesPer100g: 575, co2PerKg: 1.5 },
    { name: "Avocado", origin: "Mexico", caloriesPer100g: 160, co2PerKg: 0.5 },
    { name: "Banana", origin: "Ecuador", caloriesPer100g: 89, co2PerKg: 0.4 },
    {
      name: "Blueberries",
      origin: "Finland",
      caloriesPer100g: 57,
      co2PerKg: 0.3,
    },
    { name: "Carrot", origin: "China", caloriesPer100g: 41, co2PerKg: 0.3 },
    { name: "Cheese", origin: "France", caloriesPer100g: 402, co2PerKg: 3.15 },
    {
      name: "Herring",
      origin: "Baltic Sea",
      caloriesPer100g: 158,
      co2PerKg: 1.7,
    },
    { name: "Milk", origin: "Finland", caloriesPer100g: 42, co2PerKg: 1.1 },
    { name: "Oats", origin: "Finland", caloriesPer100g: 389, co2PerKg: 0.4 },
    {
      name: "Rye Bread",
      origin: "Finland",
      caloriesPer100g: 259,
      co2PerKg: 0.4,
    },
    {
      name: "Reindeer Meat",
      origin: "Finland",
      caloriesPer100g: 173,
      co2PerKg: 1.2,
    },
    { name: "Peas", origin: "Finland", caloriesPer100g: 81, co2PerKg: 0.3 },
    { name: "Potato", origin: "Finland", caloriesPer100g: 77, co2PerKg: 0.2 },
    { name: "Salmon", origin: "Norway", caloriesPer100g: 208, co2PerKg: 2.9 },
  ];
  const countryCoordinates = {
    Finland: [61.9241, 25.7482],
    Norway: [60.472, 8.4689],
    "Baltic Sea": [57.0, 20.0],
    USA: [37.0902, -95.7129],
    Mexico: [23.6345, -102.5528],
    Australia: [-25.2744, 133.7751],
    Brazil: [-14.235, -51.9253],
    Ecuador: [-1.8312, -78.1834],
    China: [35.8617, 104.1954],
    "New Zealand": [-40.9006, 174.886],
    France: [46.2276, 2.2137],
    Germany: [51.1657, 10.4515],
  };

  // Map initialization
  var map = L.map("map").setView([2, 10], 1);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 10,
    minZoom: 1,
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Bootstrap dropdown selector
  const dropdownMenu = document.querySelector(".dropdown-menu");

  // Bootstrap info display divs
  const groceryNameDisplay = document.getElementById("grocery-name");
  const countryDisplay = document.getElementById("country-of-origin");
  const caloriesDisplay = document.getElementById("calories-per-100g");
  const co2Display = document.getElementById("co2-per-kg");
  //document.querySelector('.table-bgcolor .row:nth-child(1) .col-3');
  //   const countryDisplay = document.querySelector(
  //     ".table-bgcolor .row:nth-child(1) .col-3"
  //   );
  //   const caloriesDisplay = document.querySelector(
  //     ".table-bgcolor .row:nth-child(2) .col-3"
  //   );
  //   const co2Display = document.querySelector(
  //     ".table-bgcolor .row:nth-child(3) .col-3"
  //   );

  // Map function triggered when selection is changed
  var currentMarker;

  function highlightCountry(countryName) {
    if (currentMarker) {
      console.log("Removing existing marker");
      map.removeLayer(currentMarker);
    }

    if (countryCoordinates[countryName]) {
      console.log("Adding marker at: ", countryCoordinates[countryName]);
      currentMarker = L.marker(countryCoordinates[countryName]).addTo(map);
    } else {
      console.log("Country not found in coordinates list");
    }
  }

  currentMarker = L.marker(countryCoordinates["Finland"]).addTo(map);

  // Update info display function
  function updateInfoDisplay(grocery) {
    groceryNameDisplay.textContent = grocery.name;
    countryDisplay.textContent = grocery.origin;
    caloriesDisplay.textContent = grocery.caloriesPer100g + "cal";
    co2Display.textContent = grocery.co2PerKg;

    highlightCountry(grocery.origin);
  }

  // Rendering groceries in the dropdown
  groceries.forEach((grocery) => {
    let dropdownItem = document.createElement("a");
    dropdownItem.href = "#";
    dropdownItem.classList.add("dropdown-item");
    dropdownItem.textContent = grocery.name;
    dropdownItem.onclick = function () {
      updateInfoDisplay(grocery);
    };
    dropdownMenu.appendChild(dropdownItem);
  });
});
