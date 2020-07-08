const url = "https://random-word-api.herokuapp.com/word?number=200";
const wordInput = document.querySelector("#word-input");
const scoreDisplay = document.querySelector("#score");
const message = document.querySelector("#message");
const timeDisplay = document.querySelector("#time");
let score = 0; //점수
const gameTime = 5;
let time = gameTime; //시간
let isplaying = true;

const words = [];

//시작되면
init();

// initial 초기 실행
function init() {
  timeDisplay.innerHTML = time;
  wordInput.addEventListener("input", startMatch);
  // timeDisplay.innerHTML = time;
  setInterval(countDown, 1000);
  setInterval(checkStatus, 50);
}

//단어 가져오기
function getwords() {
  axios
    .get(url)
    .then((res) => {
      res.data.forEach((word) => {
        if (word.length < 10) {
          words.Push(word);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

//함수들
//게임이 플레이중인지 확인
function checkStatus() {
  if (!isplaying && time === 0) {
    // == false 라는뜻
    message.innerHTML = "Game Over!!!";
    score = -1;
  }
}

//시간을 카운트 다운
timeDisplay.innerHTML = time;
function countDown() {
  if (time > 0) {
    time--;
  } else if (time === 0) {
    isplaying = false;
  }
  timeDisplay.innerHTML = time;
}

//글자가 맞는지 확인 함수
function startMatch() {
  const currentWord = document.querySelector("#current-word");
  // console.log(
  //   currentWord.innerHTML,
  //   wordInput.value,
  //   currentWord.innerHTML === wordInput.value
  // );

  if (currentWord.innerHTML === wordInput.value) {
    score++;
    scoreDisplay.innerHTML = score;
    time = gameTime; //초기화 하드코딩
    wordInput.value = "";
    message.innerHTML = "정답~쓰!!";

    const randomeIndex = Math.floor(Math.random() * words.length);
    console.log(randomeIndex);
    currentWord.innerHTML = words[randomeIndex];
  } else {
    message.innerHTML = "";
  }
}

if (score === -1) {
  scoreDisplay.innerHTML = 0;
} else {
  scoreDisplay.innerHTML = score;
}
