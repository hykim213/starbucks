
//우측 배너 두개 - 아래로 스크롤 시 사라지고, 다시 올라가면 나타나도록 설정하는 부분
const badgeEl = document.querySelector('header .badges');
//맨위로 이동 버튼
const toTopEl = document.querySelector('#to-top');

//scroll할때마다 function call하면 로드가 너무 많이 되므로, 
//lodash라는 자바스크립트 라이브러리를 이용하여 throttle 명령을 쓸 수 있음. 스크립트 태그 연결
window.addEventListener('scroll', _.throttle(function() {
    console.log(window.scrollY);
    if (window.scrollY > 500) {
        //배지 숨기기
        //gsap.to(요소, 지속시간, 옵션);
        gsap.to(badgeEl, .6, {
            opacity: 0,
            display: 'none'
        });
        // '맨위로이동' 버튼 보이기!
        gsap.to(toTopEl, .2, {
            x: 0
        });
    } else {
        // 배지 보이기
        gsap.to(badgeEl, .6, {
            opacity: 1,
            display: 'block'
        });
        // '맨위로이동' 버튼 숨기기!
        gsap.to(toTopEl, .2, {
            x: 100
        });
    }
}, 300)); 
//_.throttle(함수, 시간)
//300ms는 0.3초. 함수가 수십개가 한번에 실행되는데, 0.3초 단위로 부하를 줘서 함수가 우루루 실행되는 것을 방지

//맨위로 이동 버튼 선택 시, 화면 이동 
toTopEl.addEventListener('click', function() {
    gsap.to(window, .7, {
        scrollTo: 0
    });
});


const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index) {
    //gsap.to(요소, 지속시간, 옵션);
    gsap.to(fadeEl, 1, {
        delay: (index + 1) * .7,
        opacity: 1
    }); //애니메이션 처리해주는 라이브러리에서 제공하는 기능. gsap에 to라는 메소드
});


/**
 * 슬라이드 요소 관리
 */

// Swiping 부분
// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
    direction: 'vertical',
    autoplay: true,
    loop: true
});
new Swiper('.promotion .swiper-container', {
    slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
    spaceBetween: 10, // 슬라이드 사이 여백
    centeredSlides: true, // 1번 슬라이드가 가운데 보이기
    loop: true,
    autoplay: {
        delay: 4000 //4s
    },
    pagination: {
        el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
        clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
    },
    navigation: {
        prevEl: '.promotion .swiper-prev',
        nextEl: '.promotion .swiper-next'
    }
});
new Swiper('.awards .swiper-container', {
    autoplay: true,
    loop: true,
    spaceBetween: 30,
    slidesPerView: 5,
    navigation: {
        prevEl: '.awards .swiper-prev',
        nextEl: '.awards .swiper-next'
    }
});

/**
 * Promotion 슬라이드 토글 기능
 */

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function() {
    isHidePromotion = !isHidePromotion;
    if (isHidePromotion) {
        promotionEl.classList.add('hide');
    } else {
        promotionEl.classList.remove('hide');
    }
});


/**
 * Floating object animation
 */
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
function floatingObject(selector, delay, size) {
    //gsap.to(요소, 시간, 옵션);
    gsap.to(
        selector, 
        random(1.5, 2.5), 
        {
            y: size,
            repeat: -1, // 무한반복
            yoyo: true, // 한번 재생된 애니메이션을 다시 뒤로 재생
            ease: Power1.easeInOut,
            delay: random(0, delay),
        }
    );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);


/**
 * 요소가 화면에 보여짐 여부에 따른 요소 관리
*/
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl) {
    new ScrollMagic
        .Scene({
            triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
            triggerHook: .8, // 뷰포트의 어떤 지점에서 감시되었다는 것을 판단할것인가를 지정해주는 옵션
        })
        .setClassToggle(spyEl, 'show')
        .addTo(new ScrollMagic.Controller());
});