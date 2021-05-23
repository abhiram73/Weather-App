 window.onload = setInterval(clock,1000);

    function clock()
    {
      var d = new Date();
      
      var date = d.getDate();
      
      var month = d.getMonth();
      var montharr =["Jan","Feb","Mar","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
      month=montharr[month];
      
      var year = d.getFullYear();
      
      var day = d.getDay();
      var dayarr =["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];
      day=dayarr[day];
      
      var hour =d.getHours();
      var min = d.getMinutes();
      var sec = d.getSeconds();

      if (sec<10) {
        sec= "0" + d.getSeconds()
      }
      if (min<10) {
        min= "0" + d.getMinutes()
      }
      if (hour<10) {
        hour= "0" + d.getHours()
      }
    
      document.getElementById("date").innerHTML=day+" "+date+" "+month+" "+year;
      document.getElementById("time").innerHTML=hour+":"+min+":"+sec;
    }


window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let locationIcon = document.querySelector('.weather-icon');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;



            const proxy = `http://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=b86fd8f7708187a762619d1377a88ec7`;


            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);



                    const {
                        temp
                    } = data.main;

                    const {
                        description
                    } = data.weather[0];

                    const {
                        icon
                    } = data.weather[0];

                    // const icn = `http://openweathermap.org/img/wn//${icon}@2x.png`;

                    //Set DOM elements from the API
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = description;
                    locationTimezone.textContent = data.name;
                    locationIcon.innerHTML = `<img src="icons/${icon}.jpg">`;
                    // locationIcon.textContent = icn;

                    let fahren = temp * (9/5) + 32;

                    temperatureDegree.addEventListener("click", () => {                               
                     if (temperatureSpan.textContent === "C") {
                          temperatureSpan.textContent = "F";
                          temperatureDegree.textContent= Math.floor(fahren);
                     } else {
                        temperatureSpan.textContent= "C";
                        temperatureDegree.textContent = temp;
                     }    
                });
                      




             });
        });
    }
});



