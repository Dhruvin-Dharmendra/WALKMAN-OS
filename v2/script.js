function updateClock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12;
  if (minutes < 10) { minutes = '0' + minutes; }
  if (seconds < 10) { seconds = '0' + seconds; }
  
  document.getElementById('clock').innerHTML = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
}
setInterval(updateClock, 1000);
updateClock();

var highestZ = 10;

function openWin(id) {
  var win = document.getElementById(id);
  win.style.display = 'block';
  highestZ++;
  win.style.zIndex = highestZ;

  if (id === 'cameraWin') {
    startCamera();
  }
}

function closeWin(id) {
  document.getElementById(id).style.display = 'none';

  if (id === 'cameraWin') {
    stopCamera();
  }
}

var audioElement = document.getElementById('mainAudio');

function loadAudioTrack(input) {
  if (input.files && input.files[0]) {
    var file = input.files[0];
    var objectUrl = URL.createObjectURL(file);
    
    audioElement.src = objectUrl;
    document.getElementById('fileLabel').innerHTML = file.name;
    document.getElementById('songDisplay').innerHTML = file.name;
    
 
    playAudio();
  }
}

function playAudio() {
  if (audioElement.src) {
    audioElement.play();
  }
}

function pauseAudio() {
  audioElement.pause();
}

function stopAudio() {
  audioElement.pause();
  audioElement.currentTime = 0;
}

function setVolume(val) {
  audioElement.volume = val / 100;
}

var videoElement = document.getElementById('webcamVideo');
var canvasElement = document.getElementById('photoCanvas');
var cameraStream = null;

function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
      cameraStream = stream;
      videoElement.srcObject = stream;
      videoElement.style.display = 'block';
      canvasElement.style.display = 'none';
    })
    .catch(function(err) {
      alert("Camera access denied or unavailable: " + err.message);
    });
}

function stopCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach(function(track) {
      track.stop();
    });
    cameraStream = null;
  }
}

function takePhoto() {
  if (!cameraStream) return;

  var context = canvasElement.getContext('2d');
  canvasElement.width = videoElement.videoWidth || 300;
  canvasElement.height = videoElement.videoHeight || 150;


  context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);


  videoElement.style.display = 'none';
  canvasElement.style.display = 'block';
}

function retakePhoto() {
  canvasElement.style.display = 'none';
  videoElement.style.display = 'block';
}

var grid = document.getElementById("paintGrid");
var colorInput = document.getElementById("paintColor");

for (var i = 0; i < 256; i++) {
  var cell = document.createElement("div");
  cell.className = "pixel-cell";
  cell.onclick = function() {
    this.style.backgroundColor = colorInput.value;
  };
  grid.appendChild(cell);
}

function clearCanvas() {
  var cells = document.querySelectorAll(".pixel-cell");
  for (var i = 0; i < cells.length; i++) {
    cells[i].style.backgroundColor = "white";
  }
}

function changeBgImage(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.body.style.backgroundImage = "url('" + e.target.result + "')";
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function resetBg() {
  document.body.style.backgroundImage = 'none';
  document.body.style.backgroundColor = '#d1c7bd';
}

function makeDraggable(win) {
  var header = win.querySelector(".window-header");
  var posX = 0, posY = 0, mouseX = 0, mouseY = 0;

  header.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    
    highestZ++;
    win.style.zIndex = highestZ;

    mouseX = e.clientX;
    mouseY = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    posX = mouseX - e.clientX;
    posY = mouseY - e.clientY;
    mouseX = e.clientX;
    mouseY = e.clientY;

    win.style.top = (win.offsetTop - posY) + "px";
    win.style.left = (win.offsetLeft - posX) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

var windows = document.querySelectorAll(".window");
for (var i = 0; i < windows.length; i++) {
  makeDraggable(windows[i]);
}