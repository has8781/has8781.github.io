const API_KEY = "a11feada88dd094de884e124af3f7d58";
let temperature = 0;
window.onload = function () {
  const success = (position) => {
    //console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    getWeather(latitude, longitude);
  };

  const fail = () => {
    alert("좌표를 받아올 수 없음");
  };

  navigator.geolocation.getCurrentPosition(success, fail);

  const iconSection = document.querySelector(".weather_icon"); //날씨 이미지
  const tempSection = document.querySelector(".weather_temp"); //기온
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
        temperature = json.main.temp;
        const humid = json.main.humidity;
        const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

        iconSection.setAttribute("src", iconURL);
        tempSection.innerText =
          Math.ceil(temperature) + "°C" + " (" + humid + "%" + ")";
        //humidSection.innerText = '(' + humid + '%' + ')';

        tempSection.style = "font-size: 1.5rem; font-weight: 600;"; //기온 폰트 사이즈, 굵기
        //humidSection.style = 'font-size: 1.5rem; font-weight: 600;'; //습도 폰트 사이즈, 굵기

        fetchData();
      })
      .catch((error) => {
        alert(error);
      });
  };
};

async function fetchData() {
  try {
    console.log(temperature);

    url = `https://122.38.11.25:8080/py/${parseInt(temperature)}`;
    const response = await fetch(url);
    const responseData = await response.json();
    const resultArray = responseData.result_array;
    const codyImgs = document.querySelectorAll(".cody_img");

    if (resultArray.length > 0) {
      // 서버에서 받아온 이미지 중에서 무작위로 8개를 선택
      const randomIndices = getRandomIndices(
        resultArray.length,
        Math.min(8, codyImgs.length)
      );

      // 무작위로 선택된 인덱스에 해당하는 이미지를 화면에 표시
      for (let i = 0; i < randomIndices.length; i++) {
        const imgPaths = resultArray[randomIndices[i]][0];
        for (let j = 0; j < imgPaths.length; j++) {
          const imgPath = `./routers${imgPaths[j]}`;
          const img = document.createElement("img");
          img.src = imgPath;
          codyImgs[i].appendChild(img);
        }
      }
    } else {
      alert("추천 가능한 온도가 아닙니다.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// 범위 내에서 임의의 정수를 반환하는 함수
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 서버에서 받아온 데이터의 길이를 기준으로 무작위로 n개의 서로 다른 인덱스를 반환하는 함수
function getRandomIndices(dataLength, n) {
  const indices = [];
  for (let i = 0; i < n; i++) {
    let newIndex;
    do {
      newIndex = getRandomInt(0, dataLength - 1);
    } while (indices.includes(newIndex)); // 중복된 인덱스를 피하기 위해 반복
    indices.push(newIndex);
  }
  return indices;
}
