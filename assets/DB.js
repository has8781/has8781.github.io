
async function fetchData() {
    try {
      const response = await fetch('http://192.168.57.188:8080/db');
      const data = await response.json();
      displayData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function displayData(data) {
    const container = document.querySelector('.closet');

    data.forEach(item => {
      const imageElement = document.createElement('img');
      imageElement.src = item.imageData;

      const closetItem = document.createElement('div');
      closetItem.classList.add('c_item');
      closetItem.appendChild(imageElement);

      container.appendChild(closetItem);
    });
  }

  // 페이지 로드 시 데이터 표시 함수 호출
  fetchData();