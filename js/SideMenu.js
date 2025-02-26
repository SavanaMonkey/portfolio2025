//✨ 사이드메뉴 인터랙션 ✨

// 사이드 메뉴 열기
document
  .getElementById("side-menu-open")
  .addEventListener("click", function () {
    document.body.classList.add("remove-scroll");
    document.getElementById("side-menu-wrapper").classList.add("visible");
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
    }, 400);
    document.body.classList.remove("remove-scroll");
  });
