const fs = require('fs'); 
const path = require('path');

// 이미지 파일을 읽어 base64로 변환하는 함수
async function readImage(imagePath) {
    try {
        const data = await new Promise((resolve, reject) => {
            fs.readFile(imagePath, { encoding: 'base64' }, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
        return `data:image/jpeg;base64, ${data}`;
    } catch (error) {
        console.error("이미지 파일 읽기 오류:", error);
        throw error;
    }
}

// 데이터베이스 결과에서 이미지 URL을 가져와 실제 이미지 데이터로 변환하는 함수
async function processImages(data) {
    const promises = data.map(async (item) => {
        const imagePath = path.join(__dirname, item.URL);
        const imageData = await readImage(imagePath);
        item.imageData = imageData; // 이미지 데이터 추가
    });

    await Promise.all(promises);
    return data;
}

module.exports = { readImage, processImages };
