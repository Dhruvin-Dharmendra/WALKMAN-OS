// Clock
const updateClock = () => {
  document.querySelector("#timeElement").textContent = new Date().toLocaleTimeString();
};
setInterval(updateClock, 1000);
updateClock();

// Z-Index Management
let topZ = 10;
const bringFront = (el) => { el.style.zIndex = ++topZ; };

document.querySelectorAll(".window").forEach(win => {
  win.addEventListener("mousedown", () => bringFront(win));
});

// App Window Toggles
const setupWindow = (winId, openBtnId, closeBtnId) => {
  const win = document.querySelector(winId);
  document.querySelector(closeBtnId).onclick = () => win.style.display = "none";
  document.querySelector(openBtnId).onclick = () => {
    win.style.display = "flex";
    bringFront(win);
  };
};

setupWindow("#welcome", "#welcomeopen", "#welcomeclose");
setupWindow("#notepad", "#notepadopen", "#notepadclose");
setupWindow("#camera", "#cameraopen", "#cameraclose");

// Audio Player
const audio = document.querySelector("#audioPlayer");
const reelL = document.querySelector("#reelLeft");
const reelR = document.querySelector("#reelRight");

const setPlaying = (play) => {
  reelL.classList.toggle("spinning", play);
  reelR.classList.toggle("spinning", play);
  document.querySelector("#playBtn").classList.toggle("pressed", play);
};

document.querySelector("#playBtn").onclick = () => { audio.play(); setPlaying(true); };
document.querySelector("#pauseBtn").onclick = () => { audio.pause(); setPlaying(false); };
document.querySelector("#stopBtn").onclick = () => { 
  audio.pause(); 
  audio.currentTime = 0; 
  setPlaying(false); 
};

document.querySelector("#musicUploader").onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  audio.src = URL.createObjectURL(file);
  document.querySelector("#trackTitle").textContent = file.name;
  audio.play();
  setPlaying(true);
};

audio.ontimeupdate = () => {
  if (!audio.duration) return;
  document.querySelector("#progressBar").value = (audio.currentTime / audio.duration) * 100;
  document.querySelector("#currentTimeDisplay").textContent = formatTime(audio.currentTime);
  document.querySelector("#durationDisplay").textContent = formatTime(audio.duration);
};

document.querySelector("#progressBar").oninput = (e) => {
  if (audio.duration) audio.currentTime = (e.target.value / 100) * audio.duration;
};

document.querySelector("#volumeSlider").oninput = (e) => audio.volume = e.target.value / 100;

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// Retro Camera Stream & Snap Logic
const video = document.querySelector("#webcam");
const canvas = document.querySelector("#photoCanvas");
const snapBtn = document.querySelector("#snapBtn");
const downloadLink = document.querySelector("#downloadLink");

document.querySelector("#cameraopen").addEventListener("click", async () => {
  if (!video.srcObject) {
    try {
      video.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });
    } catch (err) {
      alert("Camera access denied or unlinked.");
    }
  }
});

snapBtn.onclick = () => {
  const ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth || 320;
  canvas.height = video.videoHeight || 240;
  
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  // Download snapshot
  downloadLink.href = canvas.toDataURL("image/png");
  downloadLink.style.display = "inline-block";
};

// Simple Drag System
function makeDraggable(el) {
  let x = 0, y = 0;
  const header = el.querySelector(".window-header");
  
  header.onmousedown = (e) => {
    bringFront(el);
    x = e.clientX;
    y = e.clientY;
    document.onmousemove = (e) => {
      el.style.top = (el.offsetTop - (y - e.clientY)) + "px";
      el.style.left = (el.offsetLeft - (x - e.clientX)) + "px";
      x = e.clientX;
      y = e.clientY;
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
}
// Register Calendar Window for Dragging & Focus
setupWindow("#calendarWindow", "#timeElement", "#calendarclose");

// Calendar Rendering Engine
function renderCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  document.querySelector("#calMonthYear").textContent = `${monthNames[month]} ${year}`;

  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const daysContainer = document.querySelector("#calendarDays");
  
  daysContainer.innerHTML = "";

  // Empty slots before month start
  for (let i = 0; i < firstDayIndex; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.className = "cal-day empty";
    daysContainer.appendChild(emptyDiv);
  }

  // Active month days
  for (let day = 1; day <= totalDays; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.className = "cal-day";
    if (day === now.getDate()) dayDiv.classList.add("today");
    dayDiv.textContent = day;
    daysContainer.appendChild(dayDiv);
  }
}

renderCalendar();


document.querySelectorAll(".window").forEach(makeDraggable);