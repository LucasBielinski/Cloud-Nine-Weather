var searchButton = document.getElementById("sbmitbttn");
var cityInput = document.getElementById("inputSearch");
var pastCity = document.getElementById("saved");

function currentCardFormatter(weather) {
  console.log("Current wether Formatter");
  console.log(weather);
  //where am I appending this information to?
  var currentCardPlace = document.getElementById("display");
  //DO I need to clear where I'm appending or do I want duplicates?
  currentCardPlace.innerHTML = "";
  // What element do I create, what will be its content, and where do I append it to?
  currentCardPlace.innerHTML += `
<div>
  <p> ${weather.dt_txt} </p>
  <p> Weather: ${weather.weather[0].main} </p>
  <p> Description: ${weather.weather[0].description}</p>
  <p> Temp: ${weather.main.temp}</p>
  <p> 
  
</div>`;
}

function fiveDayFormatter(weatherArr) {
  console.log("Five Days coming up!");
  console.log(weatherArr);
  var fiveDayCard = document.getElementById("five-day");
  fiveDayCard.innerHTML = "";
  fiveDayCard.innerHTML += `
  <div class="col-2" >
  <p> ${weatherArr[0].dt_txt} </P>
  <p> Weather: ${weatherArr[0].weather[0].main} </p>
  <p> Descr: ${weatherArr[0].weather[0].description}</p>
  <p> Temp: ${weatherArr[0].main.temp}</p>
  </div>
  <div>
  <p> ${weatherArr[1].dt_txt} </P>
  <p> Weather: ${weatherArr[1].weather[0].main} </p>
  <p> Description: ${weatherArr[1].weather[0].description}</p>
  <p> Temp: ${weatherArr[1].main.temp}</p>
  </div>
  <div>
  <p> ${weatherArr[2].dt_txt} </P>
  <p> Weather: ${weatherArr[2].weather[0].main} </p>
  <p> Description: ${weatherArr[2].weather[0].description}</p>
  <p> Temp: ${weatherArr[2].main.temp}</p>
  </div>
  <div>
  <p> ${weatherArr[3].dt_txt} </P>
  <p> Weather: ${weatherArr[3].weather[0].main} </p>
  <p> Description: ${weatherArr[3].weather[0].description}</p>
  <p> Temp: ${weatherArr[3].main.temp}</p>
  </div>
  <div>
  <p> ${weatherArr[4].dt_txt} </P>
  <p> Weather: ${weatherArr[4].weather[0].main} </p>
  <p> Description: ${weatherArr[4].weather[0].description}</p>
  <p> Temp: ${weatherArr[4].main.temp}</p>
  </div>
  `;
}

function beginSearch(event) {
  event.preventDefault();

  var cityName = cityInput.value.trim();

  if (cityName) {
    findCity(cityName);
    console.log(cityName);
  } else {
    alert("enter a city name");
  }
}
function saveCity() {
  var searched = cityInput.value.trim();
  var storedCity = JSON.parse(localStorage.getItem("found"));
  if (storedCity === null) {
    storedCity = [];
  }
  if (storedCity.includes(searched)) {
    return;
  }
  storedCity.push(searched);
  if (storedCity.length > 6) {
    storedCity.shift();
  }
  localStorage.setItem("found", JSON.stringify(storedCity));
  init();
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
          saveCity();
          console.log(weather.list);
          currentCardFormatter(weather.list[0]);
          //6,14,22,30,38
          fiveDays = [];
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

searchButton.addEventListener("click", beginSearch);

init();
