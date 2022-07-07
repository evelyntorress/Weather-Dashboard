
   
// //  current day and time using moment.js

// var today = moment();
// $("#currentDay").text(today.format("MMM Do, YYYY"));

// var time = moment().format("hh:mm:ss");
// $("#time-display").text(time);

var cityName = document.getElementById("cityName");
var citySearch = document.getElementById("citySearch");
var displayCity = document.getElementById("displayCity");
var cityTemp = document.getElementById("cityTemp");
var cityWind = document.getElementById("cityWind");
var cityHumidity = document.getElementById("cityHumidity");
var cityUVindex = document.getElementById("cityUVindex");

function getApi(requestUrl) {
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
    })
    .then(function (data){
        console.log(data);
        console.log(data.name);
        console.log(data.main);
        console.log(data.main.temp);
        console.log(data.main.wind);
        console.log(data.main.humidity);
        console.log(data.main.uvindex);

        displayCity.textContent=data.name;
        cityTemp.textContent= 'Temperature: ' + data.main.temp + ' C';
        cityWind.textContent= 'Wind: ' + data.main.temp + ' MPH';
        cityHumidity.textContent='Humidity: ' + data.main.humidity + '%';
        cityUVindex.textContent='UV Index: ' + data.main.uvindex;
    })
  }
  

citySearch.addEventListener("click", function(){
 console.log(cityName.value);

 getApi('https://api.openweathermap.org/data/2.5/weather?q='+cityName.value+'&units=metric&appid=d1d93dfb4797fd38a2dfd1ffdf5b1f7a')
})


