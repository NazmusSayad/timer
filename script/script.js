window.location.href = "?#";

const inputH = document.querySelector(`#inputH`);
const inputM = document.querySelector(`#inputM`);
const inputS = document.querySelector(`#inputS`);
const closeBtn = document.querySelector(`.close`);
const resetBanner = document.querySelector(`.formsec`);
const startBtn = document.querySelector(`#timeStart`);
const resetBtn = document.querySelector(`#timeReset`);
const dsH = document.querySelector(`#dsH`);
const dsM = document.querySelector(`#dsM`);
const dsS = document.querySelector(`#dsS`);
const dsMS = document.querySelector(`#dsMS`);

const timeUpAudio = new Audio("../media/1.webm");
const timeUpAudio2 = new Audio("../media/2.wav");
const timeUpAudio3 = new Audio("../media/2.wav");

let timeH;
let timeM;
let timeS;
let timeMS;
let i = 0;
let j = 0;
let countFN;

function closeForm() {
  resetBanner.removeAttribute(`style`);
}
function openForm() {
  resetBanner.style.display = `block`;
}
function submitForm() {
  timeH = Number(inputH.value);
  timeM = Number(inputM.value);
  timeS = Number(inputS.value);
  timeMS = 0;

  setInnerHTML(dsH, timeH);
  setInnerHTML(dsM, timeM);
  setInnerHTML(dsS, timeS);
  setInnerHTML(dsMS, 0);

  closeForm();

  window.clearInterval(countFN);
  startBtn.innerHTML = "Start";

  i = 1;
  j = 1;
}

function setInnerHTML(a, b) {
  if (b < 10) {
    a.innerHTML = "0" + b;
  } else {
    a.innerHTML = b;
  }
}

function startStop() {
  if (i && j) {
    count();
    startBtn.innerHTML = "Stop";
    i = 0;
  } else {
    window.clearInterval(countFN);
    startBtn.innerHTML = "Start";
    i = 1;
  }
}

function count() {
  countFN = window.setInterval(() => {
    if (timeMS > 0) {
      timeMS--;
      setInnerHTML(dsMS, timeMS);
    }

    if (timeMS < 1) {
      if (timeS > 0) {
        timeS--;

        timeMS = 100;
        timeMS--;

        setInnerHTML(dsMS, timeMS);
        setInnerHTML(dsS, timeS);
      } else if (timeM > 0) {
        timeM--;

        timeS = 60;
        timeS--;

        setInnerHTML(dsS, timeS);
        setInnerHTML(dsM, timeM);
      } else if (timeH > 0) {
        timeH--;

        timeM = 60;
        timeS = 60;
        timeM--;
        timeS--;

        setInnerHTML(dsS, timeS);
        setInnerHTML(dsM, timeM);
        setInnerHTML(dsH, timeH);
      } else {
        window.clearInterval(countFN);

        timeUpAudio2.play();
        setTimeout(() => {
          timeUpAudio.play();
          setTimeout(() => {
            timeUpAudio3.play();
          }, 1100);
        }, 1200);

        i = 0;
        j = 0;
        startBtn.innerHTML = "Start";
      }
      timeMS = 100;
    }
  }, 10);
}

document.addEventListener("keyup", (event) => {
  if (event.keyCode == 32 || event.keyCode == 13) {
    startStop();
  } else if (event.keyCode == 16) {
    openForm();
  }
});
