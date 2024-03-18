const contents = document.querySelector('.cody_img');
const pageBtn = document.querySelector('.page_btn');

const numOfContent = 3;
const showContent = 1;
const showBtn = 3;
const maxPage = Math.ceil(numOfContent / showContent);
let page = 1;

// 이미지 생성
const makeContent = (id) => {
    const img = new Image(200, 200);
    img.src = `assets/data/${id}.jpg`;
    contents.appendChild(img);
    return img;
}

// 페이지 버튼 생성
const makeBtn = (id) => {
    const btn = document.createElement("button");
    btn.classList.add("page");
    btn.dataset.num = id;
    btn.innerText = id;

    // 페이지 버튼 클릭 이벤트 (특정 버튼 클릭 시 해당 페이지 버튼 활성화, 다른 버튼 비활성화시키는 반복문)
    btn.addEventListener("click", (e) => {
        Array.prototype.forEach.call(pageBtn.children, (btn) => {
            if (btn.dataset.num) btn.classList.remove("active");
        });
    e.target.classList.add("active");
    renderContent(e.target.dataset.num);
    });
    return btn;
}

//렌더링 함수
const renderContent = (page) => {
    //목록 리스트 초기화
    while (contents.hasChildNodes()) {
        contents.removeChild(contents.firstChild);
    }

    //글의 최대 개수를 넘지 않는 선에서, 화면에 최대 1개의 글 생성
    for (let id = (page - 1) * showContent + 1; id <= page * showContent && id <= numOfContent; id++) {
        contents.appendChild(makeContent(id));
    }
};


const renderBtn = (page) => {
    //버튼 리스트 초기화
    while (pageBtn.hasChildNodes()) {
        pageBtn.removeChild(pageBtn.lastChild);
    }

    //화면에 최대 3개의 페이지 버튼 생성
    for (let id = page; id < page + showBtn && id <= maxPage; id++) {
        pageBtn.appendChild(makeBtn(id));
    }

    //첫 버튼 활성화(class="active")
    pageBtn.children[0].classList.add("active");
};

const render = (page) => {
    renderContent(page);
    renderBtn(page);
};

render(page);
