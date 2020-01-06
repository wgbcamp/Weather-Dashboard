var userInput;
var userHistory = [];
var latitude;
var longitude;
var inputID;
var apikey = 'YOUR_API_KEY';

//click search button
$('#userInputButton').click(function (){
    searchDatabase();
})

//enter key search function
$('#userInputField').on('keydown', function(event){
    if(event.key == "Enter"){
        searchDatabase();
    }
});

//search database function
function searchDatabase(){

//hides visibility of information until all elements loaded
document.getElementById('initiallyHidden').style.visibility = "hidden";

//Save user search history to array
userInput = document.getElementById('userInputField').value; 
userHistory.push(userInput);
console.log(userHistory);

//reveals user search history on page
var appendedSearch = '<ul class="list-group">';
appendedSearch+= `<li class="list-group-item">${userInput}</li>`;
$('#searchHistory').append(appendedSearch);

//search for current stats and retrieve latitude, longitude, and city id
$.ajax({
    url: 'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?',

    data: {
        appid: apikey,
        q: userInput,
        units: 'imperial'

    }
})
.then(function(response){
    console.log(response)
    document.getElementById('currentTemperatureDiv').innerHTML = "Temperature: " + response.main.temp + " °F";
    document.getElementById('currentHumidityDiv').innerHTML = "Humidity: " + response.main.humidity + "%";
    document.getElementById('currentWindSpeed').innerHTML = "Wind Speed: " + response.wind.speed + " MPH";
    var iconcode = response.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    $('#wicon').attr('src', iconurl);
    latitude = response.coord.lon;
    longitude = response.coord.lat;
    inputID = response.id;

    //search for current UV Index

    //reset to blank before setting UV value in case of bad request
    document.getElementById('currentUVIndex').innerHTML = "";

    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/uvi?',
    
        data: {
            appid: apikey,
            lat: latitude,
            lon: longitude
        }
        })
        .then(function(response){
            console.log(response)
            document.getElementById('currentUVIndex').innerHTML = "UV Index: " + response.value;

            //search for 5 day forecast stats and unhide information
            $.ajax({
                url: 'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?',
            
                data: {
                    appid: apikey,
                    id: inputID,
                    units: 'imperial'
            
                }
            })
            .then(function(response){
                console.log(response)
                var currentDate = response.list[0].dt_txt.substr(0,10);
                console.log(currentDate);
                document.getElementById('currentDay').innerHTML = (response.city.name + " " + currentDate);
                
                document.getElementById('innerDate1').innerHTML = response.list[5].dt_txt.substr(0,10);
                document.getElementById('innerTemp1').innerHTML = "Temp: " + response.list[5].main.temp + " °F";
                document.getElementById('innerHumidity1').innerHTML = "Humidity: " + response.list[5].main.humidity + "%";
                
                var iconcode5day = response.list[5].weather[0].icon;
                var iconurl5day = "http://openweathermap.org/img/w/" + iconcode5day + ".png";
                $('#wicon1').attr('src', iconurl5day);

                document.getElementById('innerDate2').innerHTML = response.list[13].dt_txt.substr(0,10);
                document.getElementById('innerTemp2').innerHTML = "Temp: " + response.list[13].main.temp + " °F";
                document.getElementById('innerHumidity2').innerHTML = "Humidity: " + response.list[13].main.humidity + "%";

                var iconcode5day = response.list[13].weather[0].icon;
                var iconurl5day = "http://openweathermap.org/img/w/" + iconcode5day + ".png";
                $('#wicon2').attr('src', iconurl5day);

                document.getElementById('innerDate3').innerHTML = response.list[21].dt_txt.substr(0,10);
                document.getElementById('innerTemp3').innerHTML = "Temp: " + response.list[21].main.temp + " °F";
                document.getElementById('innerHumidity3').innerHTML = "Humidity: " + response.list[21].main.humidity + "%";

                var iconcode5day = response.list[21].weather[0].icon;
                var iconurl5day = "http://openweathermap.org/img/w/" + iconcode5day + ".png";
                $('#wicon3').attr('src', iconurl5day);

                document.getElementById('innerDate4').innerHTML = response.list[29].dt_txt.substr(0,10);
                document.getElementById('innerTemp4').innerHTML = "Temp: " + response.list[29].main.temp + " °F";
                document.getElementById('innerHumidity4').innerHTML = "Humidity: " + response.list[29].main.humidity + "%";

                var iconcode5day = response.list[29].weather[0].icon;
                var iconurl5day = "http://openweathermap.org/img/w/" + iconcode5day + ".png";
                $('#wicon4').attr('src', iconurl5day);

                document.getElementById('innerDate5').innerHTML = response.list[37].dt_txt.substr(0,10);
                document.getElementById('innerTemp5').innerHTML = "Temp: " + response.list[37].main.temp + " °F";
                document.getElementById('innerHumidity5').innerHTML = "Humidity: " + response.list[37].main.humidity + "%";

                var iconcode5day = response.list[37].weather[0].icon;
                var iconurl5day = "http://openweathermap.org/img/w/" + iconcode5day + ".png";
                $('#wicon5').attr('src', iconurl5day);
            
                document.getElementById('initiallyHidden').style.visibility = "visible";
            })
        })
  

})
}







//for saving local storage, I'll do a setitem method whenever a search is performed, then I'll run a for loop for as many searches exist in an array, 
//then append them to the page in a list on the left side of the page with the getItem method