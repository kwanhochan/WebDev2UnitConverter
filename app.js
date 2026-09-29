
// Unit information
const units = {
  weight: {
    name: "Weight",
    unit1: "kg",
    unit2: "lb"
  },
  distance: {
    name: "Distance",
    unit1: "km",
    unit2: "mi"
  },
  temperature: {
    name: "Temperature",
    unit1: "c",
    unit2: "f"
  }
};


// Unit symbols
const symbols = {
  kg: "kg",
  lb: "lb",
  km: "km",
  mi: "mi",
  c: "°C",
  f: "°F"
};


// Get the navbar and main section
const tabBar = document.getElementById("tab-bar");
const panels = document.getElementById("panels");


// Create the tabs and forms
for (let type in units) {

  const tab = document.createElement("button");

  tab.className =
    "nav-tab px-4 py-2 rounded-md text-blue-100 hover:bg-blue-600";
  tab.textContent = units[type].name;
  tab.dataset.tab = type;

  tabBar.appendChild(tab);


  const panel = document.createElement("section");

  panel.id = `panel-${type}`;
  panel.className =
    "converter-panel bg-white rounded-lg shadow p-6 mb-6 hidden";

  panel.innerHTML = `
    <h2 class="text-2xl font-bold mb-2">${units[type].name} Converter</h2>

    <p class="text-slate-600 mb-5">
      Enter one value or multiple values separated by commas.
    </p>

    <form class="unit-form" data-from="${units[type].unit1}" data-to="${units[type].unit2}">

      <label class="block text-sm font-medium mb-2">
        Conversion
      </label>

      <select class="dir-select w-full border border-slate-300 rounded-md p-2 mb-4">
        <option value="normal">
          ${symbols[units[type].unit1]} to ${symbols[units[type].unit2]}
        </option>

        <option value="reverse">
          ${symbols[units[type].unit2]} to ${symbols[units[type].unit1]}
        </option>
      </select>


      <label class="block text-sm font-medium mb-2">
        Value
      </label>

      <input
        type="text"
        class="val-input w-full border border-slate-300 rounded-md p-2 mb-4"
        placeholder="Example: 10 or 10, 20, 30"
      >


      <button
        type="submit"
        class="bg-teal-700 text-white px-5 py-2 rounded-md hover:bg-teal-800"
      >
        Convert
      </button>

    </form>

    <div class="result-box hidden mt-5 border rounded-md overflow-hidden"></div>
  `;

  panels.appendChild(panel);
}


// Get tabs and panels
const tabButtons = document.querySelectorAll(".nav-tab");
const tabPanels = document.querySelectorAll(".converter-panel");


// Show the first tab
tabButtons[0].classList.add("bg-white", "text-blue-700", "shadow");
tabPanels[0].classList.remove("hidden");


// Tab switching
tabButtons.forEach(button => {

  button.addEventListener("click", () => {

    const selectedTab = button.dataset.tab;

    tabPanels.forEach(panel => {
      panel.classList.add("hidden");
    });

    tabButtons.forEach(tab => {
      tab.classList.remove("bg-white", "text-blue-700", "shadow");
      tab.classList.add("text-blue-100", "hover:bg-blue-600");
    });

    document
      .getElementById(`panel-${selectedTab}`)
      .classList.remove("hidden");

    button.classList.add("bg-white", "text-blue-700", "shadow");
    button.classList.remove("text-blue-100", "hover:bg-blue-600");
  });

});


// Form processing
const forms = document.querySelectorAll(".unit-form");

forms.forEach(form => {

  form.addEventListener("submit", event => {

    event.preventDefault();

    const fromUnit = form.dataset.from;
    const toUnit = form.dataset.to;

    const direction = form.querySelector(".dir-select").value;

    const input = form.querySelector(".val-input").value.trim();

    const resultBox = form.parentElement.querySelector(".result-box");


    // Check if the input is empty
    if (input === "") {
      resultBox.innerHTML =
        `<p class="text-red-600 p-3">Please enter a number.</p>`;

      resultBox.classList.remove("hidden");
      return;
    }


    // Change the direction if reverse is selected
    let actualFrom = fromUnit;
    let actualTo = toUnit;

    if (direction === "reverse") {
      actualFrom = toUnit;
      actualTo = fromUnit;
    }


    // Split the input into separate values
    const values = input.split(",");

    let numbers = [];

    for (let i = 0; i < values.length; i++) {

      const number = Number(values[i].trim());

      if (isNaN(number)) {
        resultBox.innerHTML =
          `<p class="text-red-600 p-3">Please enter numbers only.</p>`;

        resultBox.classList.remove("hidden");
        return;
      }

      numbers.push(number);
    }


    // Create the converter
    const converter = createConverter(actualFrom, actualTo);


    // Convert the values
    let output;

    if (numbers.length === 1) {
      output = converter(numbers[0]);

      resultBox.innerHTML = `
        <p class="p-3 font-mono">
          ${numbers[0]} ${symbols[actualFrom]}
          =
          <strong class="text-teal-700">
            ${output} ${symbols[actualTo]}
          </strong>
        </p>
      `;
    }
    else {
      output = converter(numbers);

      let rows = "";

      for (let i = 0; i < numbers.length; i++) {
        rows += `
          <tr class="border-b border-slate-200">
            <td class="p-3">
              ${numbers[i]} ${symbols[actualFrom]}
            </td>

            <td class="p-3 font-semibold">
              ${output[i]} ${symbols[actualTo]}
            </td>
          </tr>
        `;
      }

      resultBox.innerHTML = `
        <table class="w-full text-left">
          <thead class="bg-slate-100">
            <tr>
              <th class="p-3">Original</th>
              <th class="p-3">Converted</th>
            </tr>
          </thead>

          <tbody>
            ${rows}
          </tbody>
        </table>
      `;
    }

    resultBox.classList.remove("hidden");
  });

});