// ✨ 슬릭 슬라이더 설정 + 풀스크린 ✨

$(function () {
  var isDragging = false;
  var scrollY = 0; // 현재 스크롤 위치 저장

  // 슬릭 슬라이더에서 터치 또는 마우스 시작 시 플래그 초기화
  $(".slick-slider").on("mousedown touchstart", function () {
    isDragging = false;
  });

  // 슬릭 슬라이더에서 터치나 마우스 이동 시 플래그를 true로 설정
  $(".slick-slider").on("mousemove touchmove", function () {
    isDragging = true;
  });

  // 슬릭 슬라이더 초기 설정
  $(".slider").slick({
    lazyLoad: "ondemand",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    centerMode: false,
    centerPadding: "0px",
    prevArrow: `<button type="button" class="slick-prev" style="height:100%;display:flex;justify-content:center;align-items:center;width:7.5%;left:-35px">
              <svg width="6.206" height="10.412" viewBox="0 0 6.206 10.412">
                <path d="M28,2039.016l-5,4.5h0l5,4.5" transform="translate(-22.5 -2038.31)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
              </svg>
            </button>`,
    nextArrow: `<button type="button" class="slick-next" style="height:100%;display:flex;justify-content:center;align-items:center;width:7.5%;right:-35px">
              <svg width="6.206" height="10.412" viewBox="0 0 6.206 10.412">
                <path d="M23,2039.016l5,4.5h0l-5,4.5" transform="translate(-22.294 -2038.31)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
              </svg>
            </button>`,
    responsive: [{ breakpoint: 768, settings: { arrows: false } }],
  });

  // 🌟 스크롤 차단 (이벤트 방식으로 완전 차단)
  function disableScroll() {
    scrollY = window.scrollY || window.pageYOffset; // 현재 스크롤 위치 저장
    $("body").css({
      overflow: "hidden",
      position: "relative", // 레이아웃 깨지지 않도록 설정
    });

    // 터치 및 휠 이벤트 차단
    document.addEventListener("wheel", preventScroll, { passive: false });
    document.addEventListener("touchmove", preventScroll, { passive: false });
  }

  // 🌟 스크롤 복원
  function enableScroll() {
    $("body").css({
      overflow: "",
      position: "",
    });
    window.scrollTo(0, scrollY); // 스크롤 원래 위치로 복원

    // 터치 및 휠 이벤트 해제
    document.removeEventListener("wheel", preventScroll);
    document.removeEventListener("touchmove", preventScroll);
  }

  // 🌟 스크롤 차단 이벤트 (기본 동작 막기)
  function preventScroll(e) {
    e.preventDefault();
  }

  // 슬라이드 아이템 클릭 시 풀스크린 모드 진입
  $(".slick-slider").on("click", ".slide-item", function (e) {
    if (isDragging) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    var $this = $(this),
      videoSrc = $this.data("video-src"),
      bgImg = $this.css("background-image");

    if (videoSrc) {
      $(".fullscreen-overlay").hide();
      if (!$(".fullscreen-video").length) {
        $(".fullscreen-image").append(
          '<div class="fullscreen-video"><video controls autoplay></video></div>'
        );
      }
      $(".fullscreen-video video").attr("src", videoSrc);
      $(".fullscreen-video").fadeIn();
    } else {
      $(".fullscreen-overlay")
        .css("display", "flex")
        .get(0)
        .style.setProperty("--bg-img", bgImg);
      $(".fullscreen-video").fadeOut();
    }

    $(".fullscreen-image").fadeIn().css("backdrop-filter", "blur(10px)");

    // 🌟 스크롤 차단 적용
    disableScroll();
  });

  // 풀스크린 닫기
  $(".fullscreen-image").on("click", function () {
    $(this).fadeOut(function () {
      // 🌟 스크롤 복원
      enableScroll();

      // 블러 효과 제거 (최적화)
      $(".fullscreen-image").css("backdrop-filter", "none");

      var $video = $(".fullscreen-video video");
      if ($video.length) {
        var v = $video.get(0);
        v.pause();
        v.currentTime = 0;
        $video.attr("src", "");
      }
    });
  });
});
