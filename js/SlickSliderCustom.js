// ✨ 슬릭 슬라이더 설정 + 풀스크린 ✨

$(function () {
  var isDragging = false;

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

  $(".slick-slider").on("click", ".slide-item", function (e) {
    // 드래그로 이동한 경우 클릭 이벤트 무시
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
    $(".fullscreen-image").fadeIn();
    $("body").addClass("remove-scroll");
  });

  $(".fullscreen-image").on("click", function () {
    $(this).fadeOut(function () {
      $("body").removeClass("remove-scroll");
      var $video = $(".fullscreen-video video");
      if ($video.length) {
        var v = $video.get(0);
        v.pause();
        v.currentTime = 0;
        // 영상 소스 삭제
        $video.attr("src", "");
      }
    });
  });
});
