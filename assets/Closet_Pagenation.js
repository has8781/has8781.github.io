const contents = document.querySelector('.contents');
const pageBtn = document.querySelector('.page_btn');

//데이터 가져오기 함수
async function fetchData() {
    try {
        let page = 1;
        const showBtn = 5;
        let url = `http://192.168.57.188:8080/db?page=${page}`;

        let response = await fetch(url);
        let {totalPages, clothes} = await response.json();
        
        const maxPage = totalPages;
        console.log(totalPages);

        //이미지 생성 함수
        function displayData(data) {
            while (contents.hasChildNodes()) {
                contents.removeChild(contents.firstChild);
            }
            data.forEach(item => {
            const imageElement = new Image();
            imageElement.src = item.imageData;
            //imageElement.setAttribute("draggable", "false"); // 드래그 불가능하도록 설정
            contents.appendChild(imageElement);
            });
        }
        
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
            page = parseInt(e.target.dataset.num);
            url = `http://192.168.57.188:8080/db?page=${page}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    displayData(data.clothes);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
            });
            return btn;
        };

        const renderBtn = (page) => {
            //버튼 리스트 초기화
            while (pageBtn.hasChildNodes()) {
                pageBtn.removeChild(pageBtn.lastChild);
            }
        
            //화면에 최대 5개의 페이지 버튼 생성
            for (let id = page; id < page + showBtn && id <= maxPage; id++) {
                pageBtn.appendChild(makeBtn(id));
            }
        
            //첫 버튼 활성화(class="active")
            pageBtn.children[0].classList.add("active");
        
            pageBtn.prepend(prev);
            pageBtn.append(next);
        
            //이전, 다음 페이지 버튼이 필요한지 체크
            if(page - showBtn < 1) pageBtn.removeChild(prev);
            if(page + showBtn > maxPage) pageBtn.removeChild(next);
        };

        const render = (page) => {
            renderBtn(page);
        };

        //페이지 이동 함수
        const movePrevPage = () => {
            page -= showBtn;
            render(page);
        };
        
        const moveNextPage = () => {
            page += showBtn;
            if (page > maxPage) {
                page = maxPage;
            }
            render(page);
        };
        
        //이전, 다음 페이지 버튼 생성
        const prev = document.createElement("button");
        prev.classList.add("page", "prev");
        prev.innerText = '<';
        prev.addEventListener("click", movePrevPage);
        
        const next = document.createElement("button");
        next.classList.add("page", "next");
        next.innerText = '>';
        next.addEventListener("click", moveNextPage);

        displayData(clothes);
        render(page);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// 페이지 로드 시 데이터 표시 함수 호출
fetchData();