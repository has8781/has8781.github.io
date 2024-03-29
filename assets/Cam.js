const video = document.querySelector(".camera");
const capture_btn = document.querySelector(".btn_photo");
const clear_btn = document.querySelector(".clear_photo");
const capture_box = document.querySelector(".capture_box");
const photo_box = document.querySelector(".photo_box");
const caputure = document.querySelector(".capture_btn");
const canvas = document.createElement('canvas');


if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false})
        .then(function (stream) {
        video.srcObject = stream;
        })
        .catch(function (error) {
        console.log(error.name + ": " + error.message);
        });
}

function paintToCanvas() {
    const width = video.videoWidth;    
    const height = video.videoHeight;
    canvas.width = width;    
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);        
    ctx.putImageData(pixels, 0, 0);
    capture_box.appendChild(canvas);
    capture_box.removeChild(video);
    capture_box.removeChild(photo_box);
}

// 사진 촬영
capture_btn.addEventListener('click', () => {
    paintToCanvas(); 
    const data = canvas.toDataURL('image/jpeg');
    console.log(data);
    // DataURL에서 Base64 인코딩된 이미지 데이터 추출
    const imageData = data.split(',')[1];
    // Base64 데이터를 바이너리로 디코딩하여 Blob 생성
    const blob = b64toBlob(imageData, 'image/jpeg');
    
    // Blob을 사용하여 이미지 파일 생성
    const imgFile = new File([blob], 'captured_image.jpeg', { type: 'image/jpeg' });
    
    // 로컬에 이미지 파일 저장
    saveAs(imgFile, 'captured_image.jpeg');
    
    console.log('이미지 저장이 완료되었습니다.');
});

// Base64 데이터를 Blob으로 변환하는 함수
function b64toBlob(b64Data, contentType = '', sliceSize = 512) {
const byteCharacters = atob(b64Data);
const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

// 초기화
clear_btn.addEventListener("click", (e) => {
    location.reload();
});