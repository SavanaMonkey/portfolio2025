$(document).ready(function () {
  var cursor = $(".cursor");

  // 마우스 움직임에 따라 커서 위치 이동
  $(window).on("mousemove", function (e) {
    cursor.css({
      top: e.clientY - cursor.height() / 2,
      left: e.clientX - cursor.width() / 2,
    });
  });

  // 창을 벗어나거나 다시 들어왔을 때 커서 투명도 조절
  $(window)
    .on("mouseleave", function () {
      cursor.css({ opacity: "0" });
    })
    .on("mouseenter", function () {
      cursor.css({ opacity: "1" });
    });

  // 커서 상태 업데이트 함수
  function updateCursorSize(event) {
    var target = $(event.target); // 현재 마우스 위치의 요소
    if (target.is("a, .swiper-button-next, .swiper-button-prev")) {
      cursor.css({ transform: "scale(3.2)" });
    } else {
      cursor.css({ transform: "scale(1)" });
    }
  }

  // a, swiper 버튼 위에서 커서 확대
  $(document)
    .on(
      "mouseenter",
      "a, .swiper-button-next, .swiper-button-prev",
      function () {
        cursor.css({ transform: "scale(3.2)" });
      }
    )
    .on(
      "mouseleave",
      "a, .swiper-button-next, .swiper-button-prev",
      function () {
        cursor.css({ transform: "scale(1)" });
      }
    );

  // 클릭 시 커서 축소 후 복구
  $(document).on("mousedown", function (e) {
    cursor.css({ transform: "scale(.2)" });

    // 클릭 후 복구할 때 위치에 따라 크기 조정
    setTimeout(function () {
      updateCursorSize(e);
    }, 100); // 100ms 딜레이를 줘 클릭 효과를 명확히 보여줌
  });

  $(document).on("mouseup", function (e) {
    updateCursorSize(e); // 마우스 업 후 즉시 크기 조정
  });

  // 슬라이드 드래그 이벤트 처리
  $(".swiper-container").on("mousemove", function (e) {
    cursor.css({
      top: e.clientY - cursor.height() / 2,
      left: e.clientX - cursor.width() / 2,
    });
  });
});
