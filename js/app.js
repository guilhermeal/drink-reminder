let i = 0;
let limit = 3;
let bottleLimit = 500;
let count = 0;
let minutesDelay = 0;
let bottleDrunk = 1;

const value = document.querySelector("#value");
const liters = document.querySelector("#liters-needed");
const bottle = document.querySelector("#bottle-support");
const hours = document.querySelector("#hours");
const buttons = document.querySelectorAll(".btn");
const buttonDecrease = document.querySelector(".decrease");
const buttonIncrease = document.querySelector(".increase");
const progressBar = document.querySelector("#progressbar");
const progresstimer = document.querySelector("#progresstimer");
const waterContainer = document.querySelector(".waterContainer");
const cupsContainer = document.querySelector(".cupsContainer");
const wave1 = document.querySelector(".wave1");
const wave2 = document.querySelector(".wave2");
const delay = document.querySelector("#delay");

const ringBell = () => {
  let bell = new Audio("../assets/audios/bicycle-bell-155622.mp3");
  bell.play();
};

const startTimer = () => {
  let percentTimer = parseFloat((i * 100) / (minutesDelay * 60));
  progresstimer.value = percentTimer;
  if (parseInt(percentTimer) === 100) {
    ringBell();
  }

  setTimeout(function () {
    if (i <= minutesDelay * 60) {
      startTimer();
      i++;
    }

    if (parseInt(percentTimer) === 100) {
      if (
        confirm(
          `Did you drink your #${bottleDrunk} water bottle? (${bottleLimit}) ml`
        )
      ) {
        bottleDrunk++;
        const qtBottles = parseInt((limit * 1000) / bottleLimit);
        count += bottleLimit / 1000;
        count = Math.round(count * 100) / 100;
        handleUpdateValue(count);
        if (bottleDrunk < qtBottles) {
          startTimer();
        } else {
          alert("CONGRATULATIONS! YOU FINISH DAY!");
        }
      }

      i = 0;
    }
  }, 1000);
};

const handleUpdateValue = (newValue) => {
  if (newValue === 0) {
    value.style.color = "blue";
  } else if (newValue >= limit) {
    value.style.color = "green";
  } else if (newValue < limit) {
    value.style.color = "red";
  } else {
    value.style.color = "white";
  }

  value.classList.remove("zoom-in-out-box");
  void value.offsetWidth;
  value.textContent = newValue !== 0 ? `${newValue}L` : newValue;
  value.classList.add("zoom-in-out-box");

  let percent = parseInt((newValue / limit) * 100);
  progressBar.value = percent;

  if (percent == 0) {
    wave1.style.top = `${-80}%`;
    wave2.style.top = `${-80}%`;
  } else if (percent > 0 && percent <= 100) {
    wave1.style.top = `${-90 - percent}%`;
    wave2.style.top = `${-90 - percent}%`;
  }

  const qtBottles = parseInt((limit * 1000) / bottleLimit);
  delay.textContent = `${
    bottleDrunk - 1
  }/${qtBottles} bottles each ${minutesDelay} minutes`;
};

const handleSetLiters = () => {
  limit = liters.value;
  count = 0;
  minutesDelay = 0;
  bottleDrunk = 1;

  bottleLimit = parseFloat(bottle.value);
  const qtBottles = parseInt((limit * 1000) / bottleLimit);

  buttonDecrease.innerHTML = `-${bottleLimit}ml`;
  buttonIncrease.innerHTML = `+${bottleLimit}ml`;

  minutesDelay = parseInt((hours.value * 60) / qtBottles);
  delay.textContent = `${
    bottleDrunk - 1
  }/${qtBottles} bottles each ${minutesDelay} minutes`;

  for (let i = 0; i < qtBottles; i++) {
    addCupElement();
  }

  startTimer();
};

const addCupElement = () => {
  let img = document.createElement("img");
  img.className = "cup";
  img.src = "./assets/images/cup_glass.svg";
  cupsContainer.appendChild(img);
};

const fillCup = () => {
  const firstCup = document.querySelectorAll(".cup")[0];
  firstCup.className = "cupFull";
  firstCup.src = "./assets/images/water_full.svg";
};

const resetFilledCup = () => {
  const filledCups = document.querySelectorAll(".cupFull");
  for (let i = 0; i < filledCups.length; i++) {
    filledCups[i].className = "cup";
    filledCups[i].src = "./assets/images/cup_glass.svg";
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const styles = e.currentTarget.classList;

    if (styles.contains("increase")) {
      count += bottleLimit / 1000;
      bottleDrunk++;
      fillCup();
    } else if (styles.contains("decrease")) {
      count -= bottleLimit / 1000;
      bottleDrunk--;
    } else if (styles.contains("reset")) {
      count = 0;
      bottleDrunk = 1;
      resetFilledCup();
    }
    count = Math.round(count * 100) / 100;

    handleUpdateValue(count);
  });
});
