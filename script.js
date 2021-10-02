 // JavaScript Document

var ip;
var city;
var region;

var time;
var hrs;
var mins;
var day;
var date;
var month;
var time_suffix;
var img_icon;

var temp_c;
var temp_f;
var temp = "C";

var day_time;
var night_time;

var getLocation = function()
{
	$.ajax({
		dataType: "JSON",
		url: 'http://ipinfo.io',
		type: "GET",
		success: function(response) {
			ip = response.ip;
			city = response.city;
			region = response.region;
			$("#location-img").fadeIn(2000);
			$("#Location").html(region).fadeIn(1000);
		},
		
		error: function(response) {
			$("#Location").html("There was a problem with the API request");
	}
	});
}

var getTime = function()
{
	var d = new Date();
	
	hrs = d.getHours();
	mins = d.getMinutes();
	time_suffix = "AM"
	
	if (hrs > 18 || hrs < 6)
		{
			day_time = false;
			night_time = true;
		}

	else
		{
			day_time = true;
			night_time = false;
		}
	
	if(hrs > 12)
		{
			hrs = hrs-12;
			time_suffix = "PM"
		}
	
	if(hrs == 12)
		{
			time_suffix = "PM";
		}
	
	if(hrs == 0)
		{
			hrs = 12;
		}
	
	if(mins < 10)
		{
			time = hrs + ":0" + mins + ' ' + time_suffix;
		}
	
	else 
		{
			time = hrs + ':' + mins + ' ' + time_suffix;
		}

	$("#Time").html(time);
	
	setTimeout(getTime, 1000);
}

var getDate = function() {
	
	var d = new Date();
	
	day = d.getDay();
	date = d.getDate();
	month = d.getMonth();
	
	switch(day)
		{
			case 0: day = "Sunday";
					break;
			case 1: day = "Monday";
					break;
			case 2: day = "Tuesday";
					break;
			case 3: day = "Wednesday";
					break;
			case 4: day = "Thursday";
					break;
			case 5: day = "Friday";
					break;
			case 6: day = "Saturday";
					break;
		}
	
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
	var a = "th";
	
	if (date%10==1 && date!=11)
		{
			a = "st";
		}
	
	else if(date%10==2 && date!=12)
		{
			a = "nd";
		}
	
	else if(date%10==3 && date!=13)
		{
			a = "rd";
		}
	
	$("#Date").html(day + ", " + date + a + " " + months[month]);
}

var getWeather = function()
{
      $.ajax({
          url: 'http://api.openweathermap.org/data/2.5/weather?q='+region+'&appid=f5a90af503ad54cdb9d8826b8c763a98',
          type: "GET",
          xhrFields:
          {
              withCredentials: false,
          },

          success: function(response)
          {
			  
			  var temp_c = (response.main.temp-273.5).toFixed(1);
			  var temp_f = ((temp_c * 9)/5 + 32).toFixed(1);
			  
              console.log(response);
			  if (temp == "C")
				  {
					  $("#Temp").html(temp_c).fadeIn(750);
				  }
			 
			  if (temp == "F")
				  {
					  $("#Temp").html(temp_f).fadeIn(200);
				  }
			  
              $("#Humidity").html(response.main.humidity + " %");
			  $("#Description").html(titleCase(response.weather[0].description));
			  
			  img_icon = response.weather[0].icon;
			  set_Image_Icon(img_icon);
          },

          error: function(response)
          {
              $("#Temp").html("There was a problem with the API request :(");
          }
      });
	
	
}
var set_Image_Icon = function(img_icon) {
	$("#weather-box").fadeIn(1000);
	$("#weather-img").attr('src', "http://openweathermap.org/img/wn/" + img_icon[0] + img_icon[1] +  "d@2x.png");
	$("#weather-img").css("display", "inline");
}	

function titleCase(string) {
      var sentence = string.toLowerCase().split(" ");
      for(var i = 0; i< sentence.length; i++){
         sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
      }
	sentence = sentence.join(" ");
   return sentence;
}

var get_week_weather = function()
{
	$.ajax({
          url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+region+'&cnt=7&appid=a907b62ef4d40465fbfbe6ca63b1423c',
          type: "GET",
          xhrFields:
          {
              withCredentials: false,
          },
		
		success: function(response) {
			// console.log(response);
		
			$("#day-1-img").attr('src', "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon+ "@2x.png");
			$("#day-2-img").attr('src', "http://openweathermap.org/img/wn/" + response.list[1].weather[0].icon+ "@2x.png");
			$("#day-3-img").attr('src', "http://openweathermap.org/img/wn/" + response.list[2].weather[0].icon+ "@2x.png");
			$("#day-4-img").attr('src', "http://openweathermap.org/img/wn/" + response.list[3].weather[0].icon+ "@2x.png");
			$("#day-5-img").attr('src', "http://openweathermap.org/img/wn/" + response.list[4].weather[0].icon+ "@2x.png");
			$("#day-6-img").attr('src', "http://openweathermap.org/img/wn/" + response.list[5].weather[0].icon+ "@2x.png");
			$("#day-7-img").attr('src', "http://openweathermap.org/img/wn/" + response.list[6].weather[0].icon+ "@2x.png");
			
			$("#day-1-text").html(titleCase(response.list[0].weather[0].description));
			$("#day-2-text").html(titleCase(response.list[1].weather[0].description));
			$("#day-3-text").html(titleCase(response.list[2].weather[0].description));
			$("#day-4-text").html(titleCase(response.list[3].weather[0].description));
			$("#day-5-text").html(titleCase(response.list[4].weather[0].description));
			$("#day-6-text").html(titleCase(response.list[5].weather[0].description));
			$("#day-7-text").html(titleCase(response.list[6].weather[0].description));
			
			var dates = [date + 1, date + 2, date + 3, date + 4, date + 5, date + 6, date + 7];
			for (i in dates)
				{
					if (dates[i]>31 && month % 2 == 0)
						{
							dates[i] = dates[i] - 31;
						}
					
					else if (dates[i] > 28 && month == 1)
						{
							dates[i] = dates[i] - 28;
						}
					
					else if (dates[i]>30 && month%2!=0)
						{
							dates[i] = dates[i] - 30;
						}
				}
			
			a = ["th", "th", "th", "th", "th", "th", "th"]
			
			for (i in dates)
				{
					if (dates[i]%10 == 1 && dates[i]!=11)
						{
							a[i] = "st";
						}
					else if(dates[i] % 10 == 2 && dates[i]!=12)
						{
							a[i] = "nd";
						}
					
					else if(dates[i]%10 == 3 && dates[i]!=13)
						{
							a[i] = "rd";
						}
				}
			
			
			$("#date-1").html(dates[0] + a[0].sup());
			$("#date-2").html(dates[1] + a[1].sup());
			$("#date-3").html(dates[2] + a[2].sup());
			$("#date-4").html(dates[3] + a[3].sup());
			$("#date-5").html(dates[4] + a[4].sup());
			$("#date-6").html(dates[5] + a[5].sup());
			$("#date-7").html(dates[6] + a[6].sup());
			
			
			if (temp == "C")
				{
					$("#day-1-max-temp").html((response.list[0].temp.max-273.5).toFixed(1));
					$("#day-2-max-temp").html((response.list[1].temp.max-273.5).toFixed(1));
					$("#day-3-max-temp").html((response.list[2].temp.max-273.5).toFixed(1));
					$("#day-4-max-temp").html((response.list[3].temp.max-273.5).toFixed(1));
					$("#day-5-max-temp").html((response.list[4].temp.max-273.5).toFixed(1));
					$("#day-6-max-temp").html((response.list[5].temp.max-273.5).toFixed(1));
					$("#day-7-max-temp").html((response.list[6].temp.max-273.5).toFixed(1));


					$("#day-1-min-temp").html((response.list[0].temp.min-273.5).toFixed(1));
					$("#day-2-min-temp").html((response.list[1].temp.min-273.5).toFixed(1));
					$("#day-3-min-temp").html((response.list[2].temp.min-273.5).toFixed(1));
					$("#day-4-min-temp").html((response.list[3].temp.min-273.5).toFixed(1));
					$("#day-5-min-temp").html((response.list[4].temp.min-273.5).toFixed(1));
					$("#day-6-min-temp").html((response.list[5].temp.min-273.5).toFixed(1));
					$("#day-7-min-temp").html((response.list[6].temp.min-273.5).toFixed(1));
				}
			
			if (temp == "F")
				{
					$("#day-1-max-temp").html(c_to_f(response.list[0].temp.max-273.5));
					$("#day-2-max-temp").html(c_to_f(response.list[1].temp.max-273.5));
					$("#day-3-max-temp").html(c_to_f(response.list[2].temp.max-273.5));
					$("#day-4-max-temp").html(c_to_f(response.list[3].temp.max-273.5));
					$("#day-5-max-temp").html(c_to_f(response.list[4].temp.max-273.5));
					$("#day-6-max-temp").html(c_to_f(response.list[5].temp.max-273.5));
					$("#day-7-max-temp").html(c_to_f(response.list[6].temp.max-273.5));
					
					$("#day-1-min-temp").html(c_to_f(response.list[0].temp.min-273.5));
					$("#day-2-min-temp").html(c_to_f(response.list[1].temp.min-273.5));
					$("#day-3-min-temp").html(c_to_f(response.list[2].temp.min-273.5));
					$("#day-4-min-temp").html(c_to_f(response.list[3].temp.min-273.5));
					$("#day-5-min-temp").html(c_to_f(response.list[4].temp.min-273.5));
					$("#day-6-min-temp").html(c_to_f(response.list[5].temp.min-273.5));
					$("#day-7-min-temp").html(c_to_f(response.list[6].temp.min-273.5));
				}

			
			
			$("#weekly-weather-box").fadeIn();
		}
	});
}

var c_to_f = function(temp_c) {
	var temp_f = (((temp_c * 9)/5) + 32).toFixed(1);
	return temp_f;
}

var setBg = function() {
	if (day_time) {
		$("#background").css("background-image", "linear-gradient(to right, #56CCF2, #2F80ED)")
		$(".sun").css("display", "block");
	}
	
	else {
		$("#background").css("background-image", "linear-gradient(to right, #4b6cb7, #302b63)")
		$(".sun").css("display", "none");
	}
}

function searchLocation(ele) {
	// var x = document.getElementById("search-text").value;
	// console.log(x);
	if(event.key == 'Enter')
	{
		var x = ele.value;
		region = titleCase(x);
		$("#Location").html(region).fadeIn(1000);
		getWeather();
		get_week_weather();	
	}
	
	
}

$(document).ready(function() {
	getLocation();
	getTime();
	getDate();
	setBg();
	setTimeout(getWeather,1000)
	setTimeout(get_week_weather,1000);

	const searchBox = document.getElementById('searchBox'),
  googleIcon = document.getElementById('googleIcon');

googleIcon.onclick = function () {
  searchBox.classList.toggle('active');
};

	$("#farhenheit-text").click(function() {
		temp = "F";
		$("#celsius-text").css("opacity", "50%");
		$("#farhenheit-text").css("opacity", "100%");
		getWeather();
		get_week_weather();
	}) 
	
	$("#celsius-text").click(function() {
		temp = "C";
		$("#celsius-text").css("opacity", "100%");
		$("#farhenheit-text").css("opacity", "50%");
		getWeather();
		get_week_weather();
	}) 
});

