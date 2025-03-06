//✨ 사이드메뉴 인터랙션 ✨

const body = document.body;
const sideMenuWrapper = document.getElementById("side-menu-wrapper");
const sideMenuContent = document.getElementById("side-menu-content");
const sideMenuCloseWrapper = document.getElementById("side-menu-close-wrapper");
const sideMenuClose = document.getElementById("side-menu-close");
const sideMenuBt = document.getElementById("side-menu-bt"); // ❗ 예외 처리할 버튼 추가

// 사이드 메뉴 열기
document.getElementById("side-menu-open").addEventListener("click", (event) => {
  event.stopPropagation(); // 클릭 이벤트가 전파되지 않도록 방지

  body.style.overflow = "hidden";
  body.style.position = "fixed";
  body.style.width = "100%";

  sideMenuWrapper.classList.add("visible");
  sideMenuCloseWrapper.classList.add("active");
  sideMenuContent.classList.add("active");

  // 메뉴가 열린 상태에서 클릭하면 닫히도록 이벤트 추가
  setTimeout(() => document.addEventListener("click", handleOutsideClick), 10);
});

// 사이드 메뉴 닫기 (화면 어디를 눌러도 닫힘)
function closeSideMenu() {
  sideMenuContent.classList.add("remove-delay");
  sideMenuCloseWrapper.classList.add("remove-delay");

  sideMenuContent.classList.remove("active");
  sideMenuCloseWrapper.classList.remove("active");

  setTimeout(() => {
    sideMenuWrapper.classList.remove("visible");
    sideMenuContent.classList.remove("remove-delay");
    sideMenuCloseWrapper.classList.remove("remove-delay");

    // 스크롤 다시 활성화
    body.style.overflow = "";
    body.style.position = "";
    body.style.width = "";

    // 닫을 때 클릭 이벤트 제거 (중복 방지)
    document.removeEventListener("click", handleOutsideClick);
  }, 400);
}

// 화면 아무 곳이나 클릭하면 닫기 (단, #side-menu-bt 클릭 시 닫히지 않도록 예외 처리)
function handleOutsideClick(event) {
  if (event.target !== sideMenuBt) {
    // 예외 처리
    closeSideMenu();
  }
}

// 닫기 버튼 클릭 시 메뉴 닫기
sideMenuClose.addEventListener("click", closeSideMenu);
sideMenuCloseWrapper.addEventListener("click", closeSideMenu);
