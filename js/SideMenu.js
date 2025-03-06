//✨ 사이드메뉴 인터랙션 ✨

// 실제 화면 높이 부모 요소에 적용
function setSideMenuHeight() {
  document.getElementById(
    "side-menu-wrapper"
  ).style.height = `${window.innerHeight}px`;
}

// 사이드 메뉴 열기
document
  .getElementById("side-menu-open")
  .addEventListener("click", function () {
    document.body.style.overflow = "hidden"; // 스크롤 막기
    document.body.style.position = "fixed"; // 모바일에서 추가
    document.body.style.width = "100%"; // 레이아웃 깨짐 방지

    document.getElementById("side-menu-wrapper").classList.add("visible");
    document.getElementById("side-menu-close-wrapper").classList.add("active");
    document.getElementById("side-menu-content").classList.add("active");
  });

// 사이드 메뉴 닫기
document
  .getElementById("side-menu-close")
  .addEventListener("click", function () {
    const content = document.getElementById("side-menu-content");
    const closeWrapper = document.getElementById("side-menu-close-wrapper");

    content.classList.add("remove-delay");
    closeWrapper.classList.add("remove-delay");

    content.classList.remove("active");
    closeWrapper.classList.remove("active");

    setTimeout(function () {
      document.getElementById("side-menu-wrapper").classList.remove("visible");
      content.classList.remove("remove-delay");
      closeWrapper.classList.remove("remove-delay");

      // 스크롤 다시 활성화
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }, 400);
  });
