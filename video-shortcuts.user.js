// ==UserScript==
// @name         YouTube-style Video Shortcuts Everywhere
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Use YouTube-like keyboard shortcuts on all HTML5 videos
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let lastUsedVideo = null;
    let spaceKeyTimer = null;
    let spaceKeyActive = false;
    let originalPlaybackRate = 1.0;
    const HOLD_THRESHOLD = 200; // ms

    document.addEventListener('keydown', function (e) {
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) || document.activeElement.isContentEditable) {
            return;
        }

        const video = document.querySelector('video') || lastUsedVideo;
        if (!video) return;
        lastUsedVideo = video;

        const key = e.key.toLowerCase();

        // Spacebar hold for 2x speed
        if (key === ' ' || e.code === 'Space') {
            if (spaceKeyActive) return;

            e.preventDefault(); // Prevent scrolling

            spaceKeyActive = true;
            spaceKeyTimer = setTimeout(() => {
                // Trigger 2x speed if held
                originalPlaybackRate = video.playbackRate;
                video.playbackRate = 2.0;
            }, HOLD_THRESHOLD);
            return;
        }

        // Other shortcuts
        switch (key) {
            case 'k':
                video.paused ? video.play() : video.pause();
                break;
            case 'arrowleft':
                video.currentTime -= 5;
                break;
            case 'arrowright':
                video.currentTime += 5;
                break;
            case 'j':
                video.currentTime -= 10;
                break;
            case 'l':
                video.currentTime += 10;
                break;
            case 'm':
                video.muted = !video.muted;
                break;
            case ',':
                if (!video.paused) video.pause();
                video.currentTime = Math.max(0, video.currentTime - 1 / 30);
                break;
            case '.':
                if (!video.paused) video.pause();
                video.currentTime += 1 / 30;
                break;
            case '<':
                video.playbackRate = Math.max(0.1, video.playbackRate - 0.1);
                break;
            case '>':
                video.playbackRate = Math.min(16, video.playbackRate + 0.1);
                break;
            case '?':
                video.playbackRate = 1.0;
                break;
            case 'f':
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    video.requestFullscreen().catch(() => {});
                }
                break;
            default:
                if (!isNaN(key) && key >= '0' && key <= '9') {
                    const percent = parseInt(key) / 10;
                    video.currentTime = video.duration * percent;
                }
                break;
        }
    });

    document.addEventListener('keyup', function (e) {
        const key = e.key.toLowerCase();
        if ((key === ' ' || e.code === 'Space') && spaceKeyActive) {
            const video = document.querySelector('video') || lastUsedVideo;
            if (!video) return;

            if (spaceKeyTimer) {
                clearTimeout(spaceKeyTimer);
                spaceKeyTimer = null;

                // If 2x speed hasn't started, treat as quick tap
                if (video.playbackRate === originalPlaybackRate) {
                    video.paused ? video.play() : video.pause();
                } else {
                    video.playbackRate = originalPlaybackRate;
                }
            }

            spaceKeyActive = false;
        }
    });
})();
