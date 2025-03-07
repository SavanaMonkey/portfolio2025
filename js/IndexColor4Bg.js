(() => {
  const parentId = "pr-chara-canvas-wrapper";
  let lastInnerHeight = window.innerHeight; // 마지막 창 높이 저장
  const HEIGHT_THRESHOLD = 150; // 최소 100px 이상의 변화만 처리

  // 부모 요소의 크기를 미디어 쿼리 조건(이상)으로 설정
  const ensureParentSize = () => {
    const parent = document.getElementById(parentId);
    if (!parent) return;

    let newWidth, newHeight;
    if (window.matchMedia("(min-width: 768px)").matches) {
      newWidth = "1080px";
      newHeight = "908px";
    } else {
      newWidth = "552px";
      newHeight = "460px";
    }

    if (parent.style.width !== newWidth || parent.style.height !== newHeight) {
      parent.style.width = newWidth;
      parent.style.height = newHeight;
    }
  };

  // 부모 요소의 자식 요소와 color4Bg 스크립트 삭제
  const cleanup = () => {
    const parent = document.getElementById(parentId);
    if (parent) {
      while (parent.firstChild) parent.removeChild(parent.firstChild);
    }
    const script = document.getElementById("triangles-lib");
    if (script) {
      script.remove();
      delete window.Color4Bg;
    }
  };

  // color4Bg 스크립트를 동적으로 로드 후 콜백 실행
  const loadLib = (cb) => {
    const s = document.createElement("script");
    s.id = "triangles-lib";
    s.src = "./js/TrianglesMosaicBg.min.js";
    s.onload = () => cb();
    document.head.appendChild(s);
  };

  // 기존 canvas를 삭제하고 부모 크기를 되돌린 다음 라이브러리 로드 및 canvas 생성 후 scale 적용
  const initCanvas = () => {
    const parent = document.getElementById(parentId);
    if (parent) parent.style.transform = "none"; // transform 제거하여 실제 크기를 유지
    cleanup();
    ensureParentSize();
    loadLib(() => {
      new Color4Bg.TrianglesMosaicBg({
        dom: parentId,
        colors: [
          "#ffffff",
          "#f0f0f0",
          "#ebebeb",
          "#e8e8e8",
          "#d4d4d4",
          "#cfcfce",
        ],
        seed: 84874,
        loop: "true",
      });
      gsap.fromTo(
        "#colorbgcanvas",
        { opacity: 0 }, // 초기: 숨김 상태
        {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#colorbgcanvas", // 트리거 요소
            once: true, // 한 번만 실행
          },
        }
      );
      if (parent) {
        parent.style.transform = "scale(0.5)";
        parent.style.transformOrigin = "top left";
      }
    });
  };

  // 페이지 로드 시 canvas 초기화
  document.addEventListener("DOMContentLoaded", () => {
    initCanvas();
  });

  // 리사이즈 이벤트: 높이 변화가 임계치 이상일 때만 처리
  window.addEventListener("resize", () => {
    if (Math.abs(window.innerHeight - lastInnerHeight) < HEIGHT_THRESHOLD) {
      // 높이 변화가 작으면 내비게이션 바로 인한 변화로 판단하고 무시
      return;
    }
    lastInnerHeight = window.innerHeight;
    const parent = document.getElementById(parentId);
    if (parent) parent.style.transform = "none";
    cleanup();
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
      initCanvas();
    }, 100);
  });
})();
