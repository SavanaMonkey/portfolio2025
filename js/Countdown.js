// ✨ 카운트다운 생성 ✨
// 하루마다 리셋되도록 설정됨

function getNextMidnight() {
  let now = new Date();
  let midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0); // 다음 날 자정 (00:00:00)
  return midnight.getTime();
}

function startCountdown() {
  let countDownDate = getNextMidnight();

  setInterval(function () {
    let now = new Date().getTime();
    let distance = countDownDate - now;

    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let hoursStr = hours.toString().padStart(2, "0");
    let minutesStr = minutes.toString().padStart(2, "0");
    let secondsStr = seconds.toString().padStart(2, "0");

    // 모든 요소를 한 번에 업데이트
    document
      .querySelectorAll(".hours1")
      .forEach((el) => (el.textContent = hoursStr[0]));
    document
      .querySelectorAll(".hours2")
      .forEach((el) => (el.textContent = hoursStr[1]));
    document
      .querySelectorAll(".minutes1")
      .forEach((el) => (el.textContent = minutesStr[0]));
    document
      .querySelectorAll(".minutes2")
      .forEach((el) => (el.textContent = minutesStr[1]));
    document
      .querySelectorAll(".seconds1")
      .forEach((el) => (el.textContent = secondsStr[0]));
    document
      .querySelectorAll(".seconds2")
      .forEach((el) => (el.textContent = secondsStr[1]));

    // 자정이 되면 새로운 카운트다운 시작
    if (distance < 0) {
      countDownDate = getNextMidnight(); // 다음 자정으로 업데이트
    }
  }, 1000);
}

startCountdown();
