// Global Variables
let cityInput = document.getElementById("city-input");
let searchButton = document.getElementById("searchButton");
let historyContainer = document.querySelector(".cityhistory");
let cityHistory = JSON.parse(localStorage.getItem("cities)")) || [];
let tempAPI = document.getElementById("tempAPI");

// Functions
function searchApi() {
  let city = cityInput.value;
  let locQueryUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=8c8ca12845dfa5e4073bc72069d8d158";
  console.log(city);

  fetch(locQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (locRes) {
      tempAPI.textContent = locRes.main.temp; 
    })
    .catch(function (error) {
      console.error(error);
    });
}

function cityNumber() {
  let city = cityInput.value;
  let history = JSON.parse(localStorage.getItem("cities")) || [];

  if (history.length <= 10) {
    history.push(city);
  } else {
    historyContainer.removeChild(historyContainer.childNodes[0]);
    history.shift();
    history.push(city);
  }

  let cityHistoryButton = document.createElement("button");
  cityHistoryButton.textContent = city;
  historyContainer.appendChild(cityHistoryButton);

  localStorage.setItem("cities", JSON.stringify(history));

  searchApi();
}

// Listeners
searchButton.addEventListener("click", function () {
  cityNumber();
});

// Initialization Functions
