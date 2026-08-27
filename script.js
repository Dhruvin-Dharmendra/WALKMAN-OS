function updateClock() {
  document.getElementById("clock").innerHTML = new Date().toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

document.getElementById("btn1").onclick = function() {
  document.getElementById("playerBox").style.display = "block";
};
document.getElementById("closePlayer").onclick = function() {
  document.getElementById("playerBox").style.display = "none";
};

document.getElementById("btn2").onclick = function() {
  document.getElementById("cameraBox").style.display = "block";
  startCamera();
};
document.getElementById("closeCamera").onclick = function() {
  document.getElementById("cameraBox").style.display = "none";
};

document.getElementById("btn3").onclick = function() {
  document.getElementById("notesBox").style.display = "block";
};
document.getElementById("closeNotes").onclick = function() {
  document.getElementById("notesBox").style.display = "none";
};

document.getElementById("clock").onclick = function() {
  document.getElementById("calendarBox").style.display = "block";
  makeCalendar();
};
document.getElementById("closeCalendar").onclick = function() {
  document.getElementById("calendarBox").style.display = "none";
};

var audio = document.getElementById("audio");
var circle1 = document.getElementById("circle1");
var circle2 = document.getElementById("circle2");

document.getElementById("playBtn").onclick = function() {
  audio.play();
  circle1.className = "spin";
  circle2.className = "spin";
};
document.getElementById("pauseBtn").onclick = function() {
  audio.pause();
  circle1.className = "";
  circle2.className = "";
};
document.getElementById("stopBtn").onclick = function() {
  audio.pause();
  audio.currentTime = 0;
  circle1.className = "";
  circle2.className = "";
};

document.getElementById("fileInput").onchange = function(e) {
  var file = e.target.files[0];
  if (file) {
    audio.src = URL.createObjectURL(file);
    document.getElementById("songName").innerHTML = file.name;
    audio.play();
    circle1.className = "spin";
    circle2.className = "spin";
  }
};

audio.ontimeupdate = function() {
  if (audio.duration) {
    document.getElementById("seekBar").value = (audio.currentTime / audio.duration) * 100;
  }
};

document.getElementById("seekBar").oninput = function(e) {
  if (audio.duration) {
    audio.currentTime = (e.target.value / 100) * audio.duration;
  }
};

document.getElementById("volBar").oninput = function(e) {
  audio.volume = e.target.value / 100;
};

function startCamera() {
  var video = document.getElementById("webcam");
  if (!video.srcObject) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
      video.srcObject = stream;
    }).catch(function() {
      alert("no camera found");
    });
  }
}

document.getElementById("snapBtn").onclick = function() {
  var video = document.getElementById("webcam");
  var canvas = document.getElementById("photoCanvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);
  var link = document.getElementById("saveLink");
  link.href = canvas.toDataURL();
  link.style.display = "inline";
};

function makeCalendar() {
  var now = new Date();
  var names = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  document.getElementById("monthYear").innerHTML = names[now.getMonth()] + " " + now.getFullYear();

  var grid = document.getElementById("calGrid");
  grid.innerHTML = "";

  var firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  var totalDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  for (var i = 0; i < firstDay; i++) {
    var blank = document.createElement("div");
    grid.appendChild(blank);
  }

  for (var d = 1; d <= totalDays; d++) {
    var day = document.createElement("div");
    day.innerHTML = d;
    if (d == now.getDate()) {
      day.className = "today";
    }
    grid.appendChild(day);
  }
}

var boxes = document.getElementsByClassName("box");
for (var i = 0; i < boxes.length; i++) {
  makeDraggable(boxes[i]);
}

function makeDraggable(box) {
  var top = box.querySelector(".boxtop");
  var startX, startY;
  top.onmousedown = function(e) {
    startX = e.clientX;
    startY = e.clientY;
    document.onmousemove = function(e) {
      box.style.left = (box.offsetLeft - (startX - e.clientX)) + "px";
      box.style.top = (box.offsetTop - (startY - e.clientY)) + "px";
      startX = e.clientX;
      startY = e.clientY;
    };
    document.onmouseup = function() {
      document.onmousemove = null;
    };
  };
}
