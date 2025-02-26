//✨ 클립보드 복사 및 토스트 표시 ✨

const emailBt = document.getElementById("footer-contact-email");
const resumeDown = document.getElementById("resume-download");

// email 복사 시 토스트
emailBt.addEventListener("click", function (event) {
  event.stopPropagation(); // 버블링 방지
  const text = this.innerText || this.textContent;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(text)
      .then(() => showToast("이메일을 클립보드에 복사했어요 ✨"))
      .catch((err) => console.error("복사 실패: ", err));
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      showToast("이메일을 클립보드에 복사했어요 ✨");
    } catch (err) {
      console.error("복사 실패: ", err);
    }
    document.body.removeChild(textarea);
  }
});

// 이력서 다운로드 버튼 클릭 시 토스트 알림 표시
resumeDown.addEventListener("click", function (event) {
  event.stopPropagation(); // 버블링 방지
  // 다운로드가 정상적으로 시작되었다고 가정하고 토스트 표시
  showToast("이력서를 기기에 내려받았어요 📁");
});

function showToast(message) {
  let toast = document.getElementById("toast");

  // 토스트가 없으면 처음 생성 (처음엔 .hide 상태)
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast hide";
    document.body.appendChild(toast);
  }

  toast.innerText = message;

  // 강제로 브라우저가 ‘hide 상태’를 인식하도록 리플로우(재계산) 유도
  // (이 한 줄이 핵심!)
  toast.offsetHeight;

  // hide 제거 후 show 적용 → 부드럽게 등장
  toast.classList.remove("hide");
  toast.classList.add("show");

  // 일정 시간 후 사라지게 만들기
  setTimeout(() => {
    // show 제거 후 hide 적용 → 부드럽게 사라짐
    toast.classList.remove("show");
    toast.classList.add("hide");
  }, 1500);
}
