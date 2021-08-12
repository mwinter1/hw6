// Global Variables
let cityInput = document.getElementById("city-input");
let searchButton = document.getElementById("searchButton");
// let cityHistory = JSON.parse(localStorage.getItem("cities)")) || [];
let tempAPI = document.getElementById("tempAPI");

// Functions
$(document).ready(function () {
  $("#search-button").on("click", function () {
      let searchValue = $("#search-value").val();

      searchWeather(searchValue);

      $("#search-value").val("");
  });

// City History Functions 
$(".city-history").on("click", "li", function () {
    searchWeather($(this).text());
});

function makeRow(text) {
  var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
  $(".city-history").append(li);
}

let cityHistory = JSON.parse(window.localStorage.getItem("city-history")) || [];

 if (cityHistory.length > 0) {
     searchWeather(cityHistory[cityHistory.length - 1]);
 }

 for (var i = 0; i < cityHistory.length; i++) {
     makeRow(cityHistory[i]);
 }
});

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

    // create html content for current weather
    var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
    var card = $("<div>").addClass("card");
    var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
    var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
    var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
    var cardBody = $("<div>").addClass("card-body");
    var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
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
