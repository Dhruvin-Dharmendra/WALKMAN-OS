# 📼 Walkman OS

A 90s retro-inspired virtual desktop built with vanilla HTML, CSS, and JavaScript. Styled around a classic Sony Walkman aesthetic, it features tactile controls, custom audio playback, a live HTML5 camera, and full desktop window management.

---

## ✨ Features

- **📼 Walkman Audio Deck**: Load custom local `.mp3` files or play default audio with animated cassette tape reels.
- **🎛️ Audio Engine & Scrubbing**: Interactive physical buttons (Play, Pause, Stop), volume controller, track title display, and a seekable timeline bar.
- **📸 Retro Snap Cam**: HTML5 webcam application complete with an 80s/90s viewfinder HUD, photo capture, and instant image downloading.
- **📝 Mixtape Notes**: Desktop notepad app for jotting down tracklists, lyrics, or quick notes.
- **📅 LED Calendar**: Clickable live digital clock in the top taskbar that toggles an interactive retro grid calendar.
- **🪟 Desktop Window Manager**: Multi-window system featuring custom drag handles, close controls, and dynamic `z-index` focus layer switching.

---

## 🛠️ Tech Stack & Structure

- **HTML5**: Semantic layout and media structures (`<audio>`, `<video>`, `<canvas>`).
- **CSS3**: Custom retro color palette (`#E8DCC4`, `#3E3550`), keyframe animations, grid layouts, and glassmorphism taskbar styling.
- **JavaScript (ES6)**: Vanilla DOM manipulation, WebRTC camera API, HTML5 Audio API, and event-driven window dragging.

```text
├── index.html   # Desktop layout, top taskbar, and application markup
├── style.css    # Retro theme styling, typography, reel animations, and window layouts
├── script.js    # Window manager (dragging & focus), audio engine, camera stream, and calendar logic
└── README.md    # Documentation
