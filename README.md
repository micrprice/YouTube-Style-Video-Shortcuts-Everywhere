# YouTube-Style Video Shortcuts Everywhere

This userscript brings the familiar YouTube video keyboard controls to **any** website with HTML5 video players. Enjoy smooth navigation and playback control without touching your mouse.

## ✨ Features

- **Arrow Left/Right** – Seek backward/forward by 5 seconds
- **J / L** – Seek backward/forward by 10 seconds
- **K** – Toggle play/pause (quick press only)
- **Spacebar**
  - **Tap** – Play/pause
  - **Hold** – Temporarily play at 2× speed
- **M** – Toggle mute
- **Comma (`,`) / Period (`.`)** – Step backward/forward one frame (pauses video)
- **< / >** – Decrease/increase playback speed by 0.1×
- **?** – Reset playback speed to 1.0×
- **F** – Toggle fullscreen
- **0–9** – Jump to that percent of the video (e.g. 5 = 50%)

## 🚀 How It Works

The script listens for keyboard events and applies YouTube-style shortcuts to the first HTML5 video on the page. It remembers the last interacted video for consistent control.

Special handling allows:
- **Tap vs Hold Detection** for the spacebar:
  - Tap toggles play/pause.
  - Hold activates 2× playback until release.
  
## 🧩 Installation

You’ll need a userscript manager like [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/).

1. Install a userscript manager.
2. Create a new script and paste in the code from [`video-shortcuts.user.js`](./video-shortcuts.user.js).
3. Save and enable the script.
4. Visit any site with a video and try the shortcuts!

## 🛠 Customization

Want to:
- Change the 2× speed to something else?
- Use a different key for speed boost?
- Add an on-screen indicator?

Open an issue or edit the script — it's fully customizable JavaScript.

## 📄 License

MIT License — free to use, modify, and share.
