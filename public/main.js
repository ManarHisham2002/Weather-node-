const form = document.getElementById("form");
const cards = document.getElementById("cards");
const locationWeather = document.getElementById("location");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const errorContainer = document.getElementById("errorContainer");
const error = document.getElementById("error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  weatherMethod();
  form.reset();
});
let weatherMethod = async () => {
  try {
    const address = document.getElementById("address").value;
    const response = await fetch(`/weather?address=${address}`);
    const data = await response.json();
    console.log(data);
    if (data.error) {
      console.log("Error");
      errorContainer.classList.remove("hidden");
      cards.classList.add("hidden");
      error.textContent = data.error;
      locationWeather.textContent = "";
      condition.textContent = "";
      temperature.textContent = "";
    } else {
      console.log("Success");
      errorContainer.classList.add("hidden");
      cards.classList.remove("hidden");
      error.textContent = "";
      locationWeather.textContent = data.location;
      condition.textContent = data.condition;
      temperature.textContent = data.temperature + " °C";
    }
  } catch (e) {
    error.textContent = "An error occurred while fetching the weather data.";
  }
};
