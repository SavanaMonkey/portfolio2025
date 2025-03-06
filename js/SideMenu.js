//✨ 사이드메뉴 인터랙션 ✨

const body = document.body;
const sideMenuWrapper = document.getElementById("side-menu-wrapper");
const sideMenuContent = document.getElementById("side-menu-content");
const sideMenuCloseWrapper = document.getElementById("side-menu-close-wrapper");
const sideMenuClose = document.getElementById("side-menu-close");
const sideMenuBt = document.getElementById("side-menu-bt"); // 예외 처리할 버튼
let scrollY = 0;
let touchStartX = 0;
let touchEndX = 0;

// 사이드 메뉴 열기 함수
function openSideMenu() {
  // 현재 스크롤 위치 저장
  scrollY = window.scrollY || window.pageYOffset;

  // 스크롤 방지: body를 fixed로 설정하고 top을 현재 스크롤 위치의 음수로 지정하여 기존 위치 유지
  body.style.position = "fixed";
  body.style.top = `-${scrollY}px`;
  body.style.width = "100%";

  sideMenuWrapper.classList.add("visible");
  sideMenuCloseWrapper.classList.add("active");
  sideMenuContent.classList.add("active");

  setTimeout(() => document.addEventListener("click", handleOutsideClick), 10);
}

// 사이드 메뉴 닫기 함수
function closeSideMenu() {
  sideMenuContent.classList.add("remove-delay");
  sideMenuCloseWrapper.classList.add("remove-delay");

  sideMenuContent.classList.remove("active");
  sideMenuCloseWrapper.classList.remove("active");

  setTimeout(() => {
    sideMenuWrapper.classList.remove("visible");
    sideMenuContent.classList.remove("remove-delay");
    sideMenuCloseWrapper.classList.remove("remove-delay");

    // 스크롤 복원: fixed 속성을 제거한 후 저장했던 스크롤 위치로 복원
    body.style.position = "";
    body.style.top = "";
    body.style.width = "";
    window.scrollTo(0, scrollY);

    document.removeEventListener("click", handleOutsideClick);
  }, 400);
}

// 메뉴 외부 클릭 시 닫기 (단, sideMenuBt는 예외 처리)
function handleOutsideClick(event) {
  if (event.target !== sideMenuBt) {
    closeSideMenu();
  }
}

// 클릭 이벤트로 메뉴 열기
document.getElementById("side-menu-open").addEventListener("click", (event) => {
  event.stopPropagation();
  openSideMenu();
});

// 닫기 버튼 클릭 이벤트
sideMenuClose.addEventListener("click", closeSideMenu);
sideMenuCloseWrapper.addEventListener("click", closeSideMenu);

// 터치 이벤트: 스와이프 제스처로 메뉴 열기/닫기 처리
document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].clientX;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;
  let diffX = touchEndX - touchStartX;
  const threshold = 50; // 스와이프 감지 임계값

  // 오른쪽 스와이프(열기): 메뉴가 닫힌 상태, 터치 시작이 왼쪽 50px 이내, 차이가 임계값 이상이면 열기
  if (
    !sideMenuWrapper.classList.contains("visible") &&
    diffX > threshold &&
    touchStartX < 50
  ) {
    openSideMenu();
  }
  // 왼쪽 스와이프(닫기): 메뉴가 열려있는 상태에서 차이가 임계값 이상이면 닫기
  else if (
    sideMenuWrapper.classList.contains("visible") &&
    diffX < -threshold
  ) {
    closeSideMenu();
  }
});
