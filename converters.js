
// Higher-order function
function createConverter(fromUnit, toUnit) {

  // Arrow function used to convert the value
  return (input) => {

    // Convert one value
    const convertValue = (value) => {
      let number = Number(value);
      let result;

      // Weight
      if (fromUnit === "kg" && toUnit === "lb") {
        result = number * 2.20462;
      }
      else if (fromUnit === "lb" && toUnit === "kg") {
        result = number / 2.20462;
      }

      // Distance
      else if (fromUnit === "km" && toUnit === "mi") {
        result = number * 0.621371;
      }
      else if (fromUnit === "mi" && toUnit === "km") {
        result = number / 0.621371;
      }

      // Temperature
      else if (fromUnit === "c" && toUnit === "f") {
        result = (number * 9 / 5) + 32;
      }
      else if (fromUnit === "f" && toUnit === "c") {
        result = (number - 32) * 5 / 9;
      }
      else {
        return null;
      }

      return Number(result.toFixed(2));
    };

    // Check if the input is an array
    if (Array.isArray(input)) {
      let results = [];

      for (let i = 0; i < input.length; i++) {
        results.push(convertValue(input[i]));
      }

      return results;
    }

    // Convert a single value
    return convertValue(input);
  };
}


// Export the function for the test file
if (typeof module !== "undefined" && module.exports) {
  module.exports = { createConverter };
}