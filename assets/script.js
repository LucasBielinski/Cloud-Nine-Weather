var searchButton = document.getElementById("sbmitbttn");
var cityInput = document.getElementById("inputSearch");
var pastCity = document.getElementById("saved");
var oldCity = document.getElementsByClassName("cityBtn");

console.log(oldCity);
// formats card for current forcast
function currentCardFormatter(weather) {
  console.log("Current wether Formatter");
  console.log(weather);
  //where am I appending this information to?
  var currentCardPlace = document.getElementById("display");
  //DO I need to clear where I'm appending or do I want duplicates?
  currentCardPlace.innerHTML = "";
  // What element do I create, what will be its content, and where do I append it to?
  // fetches specific infor from data
  currentCardPlace.innerHTML += `
<div class="card-body">
  <p class="card-text"> ${weather.dt_txt} </p>
  <img src= http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png></img>
  <p class="card-text"> Weather: ${weather.weather[0].main} </p>
  <p class="card-text"> Desc: ${weather.weather[0].description}</p>
  <p class="card-text"> Temp: ${weather.main.temp}</p>
  
</div>`;
}
// formats five day
function fiveDayFormatter(weatherArr) {
  console.log("Five Days coming up!");
  console.log(weatherArr);
  var fiveDayCard = document.getElementById("five-day");
  fiveDayCard.innerHTML = "";
  // has to be a quicker way to do this, refactor later if time allows
  fiveDayCard.innerHTML += `
  <div class="col-sm-9 col-lg-3">
  <div class="card">
  <div class="card-body">
  <p class="card-text"> ${weatherArr[0].dt_txt} </P>
  <img src= http://openweathermap.org/img/wn/${weatherArr[0].weather[0].icon}@2x.png></img>
  <p class="card-text"> Weather: ${weatherArr[0].weather[0].main} </p>
  <p class="card-text"> Desc: ${weatherArr[0].weather[0].description}</p>
  <p class="card-text"> Temp: ${weatherArr[0].main.temp}</p>
  </div>
  </div>
  </div>
  <div class="col-sm-10 col-lg-2">
  <div class="card">
  <div class="card-body">
  <p class="card-text"> ${weatherArr[1].dt_txt} </P>
  <img src= http://openweathermap.org/img/wn/${weatherArr[1].weather[0].icon}@2x.png></img>
  <p class="card-text"> Weather: ${weatherArr[1].weather[0].main} </p>
  <p class="card-text"> Desc: ${weatherArr[1].weather[0].description}</p>
  <p class="card-text"> Temp: ${weatherArr[1].main.temp}</p>
  </div>
  </div>
  </div>
  <div class=" col-sm-10 col-lg-2">
  <div class="card">
  <div class="card-body">
  <p class="card-text"> ${weatherArr[2].dt_txt} </P>
  <img src= http://openweathermap.org/img/wn/${weatherArr[2].weather[0].icon}@2x.png></img>
  <p class="card-text"> Weather: ${weatherArr[2].weather[0].main} </p>
  <p class="card-text"> Desc: ${weatherArr[2].weather[0].description}</p>
  <p class="card-text"> Temp: ${weatherArr[2].main.temp}</p>
  </div>
  </div>
  </div>
  <div class="col-sm-10 col-lg-2 ">
  <div class="card">
  <div class="card-body">
  <p class="card-text"> ${weatherArr[3].dt_txt} </P>
  <img src= http://openweathermap.org/img/wn/${weatherArr[3].weather[0].icon}@2x.png></img>
  <p class="card-text"> Weather: ${weatherArr[3].weather[0].main} </p>
  <p class="card-text"> Desc: ${weatherArr[3].weather[0].description}</p>
  <p class="card-text"> Temp: ${weatherArr[3].main.temp}</p>
  </div>
  </div>
  </div>
  <div class="col-sm-10 col-lg-2">
  <div class="card">
  <div class="card-body">
  <p class="card-text"> ${weatherArr[4].dt_txt} </P>
  <img src= http://openweathermap.org/img/wn/${weatherArr[4].weather[0].icon}@2x.png></img>
  <p class="card-text"> Weather: ${weatherArr[4].weather[0].main} </p>
  <p class="card-text"> Desc: ${weatherArr[4].weather[0].description}</p>
  <p class="card-text"> Temp: ${weatherArr[4].main.temp}</p>
  </div>
  </div>
  </div>
  `;
}

// searches city name, if no city name returns error
function beginSearch(event) {
  event.preventDefault();

  var cityName = cityInput.value.trim();

  if (cityName) {
    findCity(cityName);
    console.log(cityName);
    reset();
  } else {
    alert("enter a city name");
  }
}
// saves past city
function saveCity() {
  var searched = cityInput.value.trim();
  var storedCity = JSON.parse(localStorage.getItem("found"));
  if (storedCity === null) {
    storedCity = [];
  }
  // checks if city name has already been serched, if yes, does not save
  if (storedCity.includes(searched)) {
    return;
  }
  // if city is greater than 6 replace oldest
  storedCity.push(searched);
  if (storedCity.length > 6) {
    storedCity.shift();
  }
  localStorage.setItem("found", JSON.stringify(storedCity));
  // displays searched
  init();
}
// calls location apu
var findCity = function (cityId) {
  var url =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityId +
    "&limit=1&appid=1fe1270c934256178352d8b9b50ce7a4";
  console.log(url);
  fetch(url)
    // calls for response
    .then(function (response) {
      console.log(response.statusText);
      // if response is bad throw error
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        return response.json();
      }
    })
    // puts results in weather api
    .then(function (location) {
      console.log(location);
      var lat = location[0].lat;
      var lon = location[0].lon;
      var newUrl =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=1fe1270c934256178352d8b9b50ce7a4" +
        "&units=imperial";
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
          // is successful call saveCity
          saveCity();
          console.log(weather.list);
          // inptus current weather
          currentCardFormatter(weather.list[0]);
          // empty array for five day
          //6,14,22,30,38
          fiveDays = [];
          // starts at next day counts up by 8
          for (let i = 6; i < weather.list.length; i += 8) {
            fiveDays.push(weather.list[i]);
          }
          fiveDayFormatter(fiveDays);
        })
        .catch(function (error) {
          alert(error);
        });
    })
    .catch(function (error) {
      alert(error);
    });
};
// displays saved
function init() {
  var storedCity = JSON.parse(localStorage.getItem("found"));
  if (storedCity === null) {
    return;
  }
  pastCity.innerHTML = "";
  for (const city of storedCity) {
    console.log(city);
    pastCity.innerHTML += `<button class="col-2 btn past cityBtn px-2 ml-2">${city}</button>`;
  }
}

// replaces old city info with new
function reset() {
  currentCardPlace.empty();
  fiveDayCard.empty();
}

searchButton.addEventListener("click", beginSearch);

init();
