const API_KEY = 'a11feada88dd094de884e124af3f7d58';

window.onload = function(){
    const success = (position) => {
        //console.log(position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
    
        getWeather(latitude, longitude);
    }
    
    const fail = () => {
        alert("좌표를 받아올 수 없음");
    }
    
    navigator.geolocation.getCurrentPosition(success, fail);
    
    const iconSection = document.querySelector('.weather_icon'); //날씨 이미지
    const tempSection = document.querySelector('.weather_temp'); //기온
    //const humidSection = document.querySelector('.weather_humid'); //습도
    
    const getWeather = (lat, lon) => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
        )
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log(json);
            const icon = json.weather[0].icon;
            const temperature = json.main.temp;
            const humid = json.main.humidity;
            const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    
            iconSection.setAttribute('src', iconURL);
            tempSection.innerText = Math.floor(temperature) + '°C' + ' (' + humid + '%' + ')';

            tempSection.style = 'font-size: 1.5rem; font-weight: 600;'; //기온 폰트 사이즈, 굵기
            //humidSection.style = 'font-size: 1.5rem; font-weight: 600;'; //습도 폰트 사이즈, 굵기
        })
        .catch((error) => {
            alert(error);
        });
    }
}
