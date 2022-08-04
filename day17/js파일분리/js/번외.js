/*
    사용자가 접근하지 못하게 전체를 함수화 시켜주는 것이 좋다.
    이 때 요소들을 전달인자로 받아서 여러 슬라이드를 생성하도록 하면 재사용성이 높아진다.
*/


makeSlider(`.slide-contents-wrapper`);

function makeSlider(id){

    const slideContentsWrapper = document.querySelector(id);
    const buttons = document.getElementsByTagName(`button`);
    const slideWidth = document.querySelector('.slider').clientWidth;   //슬라이드 너비
    


    //슬라이드 추가
    //cloneNode() : 노드 복사, true : 자식 노드 복사 여부
    const cloneFirst = slideContentsWrapper.firstElementChild.cloneNode(true);  
    const cloneLast = slideContentsWrapper.lastElementChild.cloneNode(true);

    
    slideContentsWrapper.insertBefore(cloneLast, slideContentsWrapper.firstChild);
    slideContentsWrapper.appendChild(cloneFirst);

    const slideNum = slideContentsWrapper.childElementCount;   //슬라이드 개수
    let intervalManager;
    let moveChecker = true; //transition 동안은 슬라이드가 이동하지 않게 관리 한다.(이동 가능한 상태 : true)
    let slideIndex = 1;     //현재 인덱스
    moveSlide(false);
    fiveSecSlide();


    //prev
    buttons[0].addEventListener('click', () => {
        slide(false);

    });

    //next
    buttons[1].addEventListener('click', () => {
        slide(true);

    });


    function fiveSecSlide(){
        intervalManager = setInterval(() => {
            slide(true);
        }, 5000);
    }
    

    function slide(vector){
        if(moveChecker){
            let destination; 
            let maxAndMin;
            moveChecker = false;

            if(vector){
                maxAndMin = slideNum - 1
                destination = 1;
                slideIndex++;
            }else{
                maxAndMin = 0;
                destination = slideNum - 2
                slideIndex--;
                
            }
            
            moveSlide(true);
            clearInterval(intervalManager);
            fiveSecSlide();
            
            setTimeout(() => {
                moveChecker = true;
                if(slideIndex === maxAndMin){
                    slideIndex = destination;
                    moveSlide(false);
                }
            }, 300);
        }
    }


    //슬라이드 이동 + 스킵 이펙트
    function moveSlide(transition){
        
        if(transition){
            slideContentsWrapper.style.transition = `.3s`;
        }else{
            slideContentsWrapper.style.transition = `0s`;
        }
        slideContentsWrapper.style.transform = `translateX(-${slideWidth * slideIndex}px)`;
    }

}

