
// DÁN config ở đây
const firebaseConfig = {
  apiKey: "AIzaSyB8d-H_rfEfJb5l-ArLjpeqPZHeh_9PD6k",
    authDomain: "caro-online-7c577.firebaseapp.com",
    projectId: "caro-online-7c577",
    storageBucket: "caro-online-7c577.firebasestorage.app",
    messagingSenderId: "587741989273",
    appId: "1:587741989273:web:df8141888d9e904a002b08",
    measurementId: "G-2WFXESM4V9"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let room = "";
let player = "";

function createRoom() {
  room = "room_" + Math.floor(Math.random() * 10000);
  player = "X";
  alert("Mã phòng: " + room);

  db.ref(room).set({
    board: Array(225).fill(""),
    turn: "X"
  });

  startGame();
}

function joinRoom() {
  room = document.getElementById("roomId").value;
  player = "O";
  startGame();
}

function startGame() {
  const board = document.getElementById("board");
  board.innerHTML = "";

  for (let i = 0; i < 225; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.onclick = () => move(i);
    board.appendChild(cell);
  }

  db.ref(room).on("value", snap => {
    const data = snap.val();
    if (!data) return;

    document.querySelectorAll(".cell").forEach((c, i) => {
      c.innerText = data.board[i];
    });
  });
}

function move(i) {
  const ref = db.ref(room);
  ref.once("value", snap => {
    const data = snap.val();

    if (data.board[i] === "" && data.turn === player) {
      data.board[i] = player;
      data.turn = player === "X" ? "O" : "X";

      ref.set(data);
    }
  });
}