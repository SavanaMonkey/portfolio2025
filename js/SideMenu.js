//✨ 사이드메뉴 인터랙션 ✨

const body = document.body;
const sideMenuWrapper = document.getElementById("side-menu-wrapper");
const sideMenuContent = document.getElementById("side-menu-content");
const sideMenuCloseWrapper = document.getElementById("side-menu-close-wrapper");
const sideMenuClose = document.getElementById("side-menu-close");
const sideMenuBt = document.getElementById("side-menu-bt");
const sideMenuOpen = document.getElementById("side-menu-open");
const swipeZone = document.getElementById("swipe-zone");
let scrollY = 0;
let touchStartX = 0;
let touchEndX = 0;
const threshold = 50; // 스와이프 감지 임계값

// 사이드 메뉴 열기 함수
function openSideMenu() {
  // 현재 스크롤 위치 저장 및 스크롤 방지
  scrollY = window.scrollY || window.pageYOffset;
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

    body.style.position = "";
    body.style.top = "";
    body.style.width = "";
    window.scrollTo(0, scrollY);

    document.removeEventListener("click", handleOutsideClick);
  }, 400);
}

// 메뉴 외부 클릭 시 닫기 (단, 예외 버튼은 무시)
function handleOutsideClick(event) {
  if (event.target !== sideMenuBt) {
    closeSideMenu();
  }
}

// 버튼 클릭 이벤트로 메뉴 열기
sideMenuOpen.addEventListener("click", (event) => {
  event.stopPropagation();
  openSideMenu();
});

// 닫기 버튼 및 닫기 배경 클릭 시 메뉴 닫기
sideMenuClose.addEventListener("click", closeSideMenu);
sideMenuCloseWrapper.addEventListener("click", closeSideMenu);

// 터치 이벤트 – 메뉴 닫기 (열려 있을 때, 문서 전체에서 감지)
document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].clientX;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;
  const diffX = touchEndX - touchStartX;
  // 왼쪽 스와이프: 메뉴가 열려있고 오른쪽에서 왼쪽으로 threshold 이상 이동 시 닫기
  if (sideMenuWrapper.classList.contains("visible") && diffX < -threshold) {
    closeSideMenu();
  }
});

// 터치 이벤트 – 메뉴 열기 전용: 왼쪽 스와이프 전용 영역에서만 처리하여 네이티브 제스처와 분리
swipeZone.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].clientX;
  },
  { passive: true }
);

swipeZone.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;
  const diffX = touchEndX - touchStartX;
  if (!sideMenuWrapper.classList.contains("visible") && diffX > threshold) {
    openSideMenu();
  }
});
