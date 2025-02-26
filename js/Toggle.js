// ✨ 포트폴리오 토글 ✨

document.addEventListener("DOMContentLoaded", function () {
  const portfolioCategories = document.querySelectorAll(".portfolio-category");
  portfolioCategories.forEach(function (category) {
    category.addEventListener("click", function (e) {
      e.stopPropagation();
      const group = category.querySelector(".portfolio-group");
      const arrow = category.querySelector(".category-arrow svg");
      // 열림이든 닫힘이든 동시에 클래스 토글
      if (group) group.classList.toggle("open");
      if (arrow) arrow.classList.toggle("open");
    });
  });

  const portfolioWrappers = document.querySelectorAll(".portfolio-wrapper");
  portfolioWrappers.forEach(function (wrapper) {
    wrapper.addEventListener("click", function (e) {
      e.stopPropagation();
      const section = wrapper.querySelector(".portfolio-section-wrapper");
      const arrow = wrapper.querySelector(".portfolio-arrow svg");
      if (section) section.classList.toggle("open");
      if (arrow) arrow.classList.toggle("open");
    });
  });

  document.querySelectorAll(".slider-container").forEach(function (slider) {
    slider.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });
});
