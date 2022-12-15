var searchButton = document.getElementById("sbmitbttn");
var cityInput = document.getElementById("inputSearch");

function beginSearch(event) {
  event.preventDefault();

  var cityName = cityInput.value.trim();

  if (cityName) {
    findCity(cityName);
    console.log(cityName);
    cityInput.value = "";
  } else {
    alert("enter a city name");
  }

  saveCity();
}
function saveCity() {
  var searched = {
    city: cityInput.value.trim(),
  };
  var storedCity = JSON.parse(localStorage.getItem("found"));
  if (storedCity === null) {
    storedCity = [];
  }
  storedCity.push(searched);
  localStorage.setItem("found", JSON.stringify(storedCity));
}
var findCity = function (cityId) {
  var url =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityId +
    "&limit=1&appid=1fe1270c934256178352d8b9b50ce7a4";
  console.log(url);
  fetch(url)
    .then(function (response) {
      console.log(response.statusText);
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(function (location) {
      console.log(location);
      var lat = location[0].lat;
      var lon = location[0].lon;
      var newUrl =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=1fe1270c934256178352d8b9b50ce7a4";
      console.log(newUrl);
      fetch(newUrl)
        .then(function (response) {
          console.log(response.statusText);
          if (!response.ok) {
            throw new Error(response.statusText);
          } else {
            return response.json();
          }
        })
        .then(function (weather) {
          console.log(weather);
        })
        .catch(function (error) {
          alert(error);
        });
    })
    .catch(function (error) {
      alert(error);
    });
};

searchButton.addEventListener("click", beginSearch);
