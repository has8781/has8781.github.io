const contents = document.querySelector('.contents');
const pageBtn = document.querySelector('.page_btn');


let selectedid = 0;

//데이터 가져오기 함수
async function fetchData() {
    try {
        let page = 1;
        const showBtn = 5;
        let url = `https://172.20.10.7:12000/db?page=${page}`;

        let response = await fetch(url);
        let {totalPages, clothes} = await response.json();
        
        const maxPage = totalPages;
        console.log(totalPages);

        //이미지 생성 함수
        function displayData(data) {
            while (contents.hasChildNodes()) {
                contents.removeChild(contents.firstChild);
            }
            data.forEach((item, index) => {
                const imageElement = new Image(); // 새로운 이미지 요소 생성
                imageElement.src = item.imageData; // 이미지 요소의 src 속성에 이미지 데이터 설정
                imageElement.id = item.ID; // 이미지 요소의 id 속성에 고유한 ID 설정
                imageElement.addEventListener("click", function() {
                    selectedid = imageElement.id;
                    console.log(selectedid);
                  });
                contents.appendChild(imageElement); // contents 요소에 이미지 요소 추가
            });
        }

        document.querySelectorAll('.type_btn').forEach(btn => {
            btn.addEventListener("click", function (e) {
                    Array.prototype.forEach.call(pageBtn.children, (btn) => {
                        if (btn.dataset.num) btn.classList.remove("active");
                    });
                    const categoryId = this.getAttribute('id'); // 카테고리 아이디를 가져옴
                    console.log(categoryId);
                    url = `https://172.20.10.7:12000/db/category?page=${page}&category=${categoryId}`;
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            displayData(data.clothes);
                        })
                        .catch(error => {
                            console.error('Error fetching data:', error);
                        });
                    e.target.classList.add("active");
                    page = parseInt(e.target.dataset.num);
                });
            });

        // 메인 버튼 생성 함수
        const makeBtn = (id) => {
            const btn = document.createElement("button");
            btn.classList.add("page");
            btn.dataset.num = id;
            btn.innerText = id;
            btn.addEventListener("click", function (e) {
                Array.prototype.forEach.call(pageBtn.children, (btn) => {
                    if (btn.dataset.num) btn.classList.remove("active");
                });
                e.target.classList.add("active");
                page = parseInt(e.target.dataset.num);
                url = `https://172.20.10.7:12000/db?page=${page}`;
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

        // 이미지를 선택하고 삭제 요청을 보내는 함수
        async function deleteSelectedImages() {
            const selectedImages = document.querySelector('.selected');
            const confirmflag = confirm('선택한 옷을 삭제하시겠습니까?');
            
            console.log(selectedid);

            if(confirmflag){
                if(selectedid != 0){
                    const url = `https://172.20.10.7:12000/clothes_delete/${selectedid}`;
                    try {
                        fetch(url, {
                            method: 'DELETE',
                        });
                    } catch (error) {
                        console.error('Error deleting images:', error);
                    }
                }
                else{
                    alert(`삭제를 원하는 옷을 클릭하세요.`);
                }
                
            }
        }

        // 삭제 버튼 클릭 이벤트 핸들러
        document.getElementById('delete_btn').addEventListener('click', deleteSelectedImages);
        
        // 다른 부분 클릭 시 선택 해제하는 이벤트 리스너 추가
        document.addEventListener('click', event => {
            if (!event.target.classList.contains('selectable')) {
                const selectedImages = document.querySelectorAll('.selected');
                selectedImages.forEach(image => {
                    image.classList.remove('selected');
                });
            }
        });

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
