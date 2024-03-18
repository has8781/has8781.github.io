const video = document.querySelector(".camera");
const capture_btn = document.querySelector(".btn_photo");
const clear_btn = document.querySelector(".clear_photo");
const capture_box = document.querySelector(".capture_box");
const photo_box = document.querySelector(".photo_box");
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
});

// 초기화
clear_btn.addEventListener("click", (e) => {
    location.reload();
});