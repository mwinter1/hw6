// Global Variables
let cityInput = document.getElementById("city-input");
let searchButton = document.getElementById("searchButton");
let cityHistory = JSON.parse(window.localStorage.getItem("city-history")) || [];
// let tempAPI = document.getElementById("tempAPI");

// Functions
$(document).ready(function () {
  $("#search-button").on("click", function () {
    let searchValue = $("#cityInput").val();
    searchApi(searchValue);
    $("#cityInput").val("");
});

// City History Functions 
$(".city-history").on("click", "li", function () {
    searchApi($(this).text());
});

// function makeRow(text) {
//   var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
//   $(".city-history").append(li);
// }

// if (cityHistory.length > 0) {
//      searchWeather(cityHistory[cityHistory.length - 1]);
// }

for (var i = 0; i < cityHistory.length; i++) {
     makeRow(cityHistory[i]);
}
});

// Search API function
function searchApi(cityInput) {
  $.ajax({
    type: "GET",
    url: "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=8c8ca12845dfa5e4073bc72069d8d158",
    dataType: "json",
    success: function (data) {
        // create history link for this search
        if (history.indexOf(searchValue) === -1) {
            history.push(searchValue);
            window.localStorage.setItem("history", JSON.stringify(history));
            makeRow(searchValue);
        }

    // create html content for current weather
    let title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
    let card = $("<div>").addClass("card");
    let wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
    let humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
    let temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
    let cardBody = $("<div>").addClass("card-body");

    // merge and add to page
    cardBody.append(title, temp, humid, wind);
    card.append(cardBody);
    $("#today").append(card);

    // call follow-up api endpoints
    getForecast(searchValue);
    getUVIndex(data.coord.lat, data.coord.lon);
}
});
}

// Forecasting function
function getForecast(searchValue) {
  $.ajax({
      type: "GET",
      url: "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=8c8ca12845dfa5e4073bc72069d8d158",
      dataType: "json",
      success: function (data) {
          // overwrite any existing content with title and empty row
          $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");

          // loop over all forecasts (by 3-hour increments)
          for (var i = 0; i < data.list.length; i++) {
              // only look at forecasts around 3:00pm
              if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                  // create html elements for a bootstrap card
                  let col = $("<div>").addClass("col-md-2");
                  let card = $("<div>").addClass("card bg-primary text-white");
                  let body = $("<div>").addClass("card-body p-2");
                  let title = $("<h5>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
                  let p1 = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp_max + " °F");
                  let p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");

                  // merge together and put on page
                  col.append(card.append(body.append(title, img, p1, p2)));
                  $("#forecast.row").append(col);
              }
          }
      }
  });
}

// Get UV function
function getUVIndex(lat, lon) {
  $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/uvi?appid=0f0a9215395e52c856561423d99593af&lat=" + lat + "&lon=" + lon,
      dataType: "json",
      success: function (data) {
          var uv = $("<p>").text("UV Index: ");
          var btn = $("<span>").addClass("btn btn-sm").text(data.value);

          // change color depending on uv value
          if (data.value < 3) {
              btn.addClass("btn-success");
          }
          else if (data.value < 7) {
              btn.addClass("btn-warning");
          }
          else {
              btn.addClass("btn-danger");
          }

          $("#today.card-body").append(uv.append(btn));
      }
  });
}

// City history buttons
function cityNumber() {
  let city = $("#city-input".value);
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