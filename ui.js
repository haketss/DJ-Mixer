import * as state from './state.js';
import * as audio from './audio.js';

export const bpmSlider = document.getElementById('bpm-slider');
export const bpmDisplay = document.getElementById('bpm-display');
export const playPauseBtn = document.getElementById('play-pause-btn');
export const trackBtns = document.querySelectorAll('.track-btn');
export const metronomeSound = document.getElementById('metronome-sound');
export const pads = document.querySelectorAll('.pad');
export const musicNotes = document.querySelectorAll('.music-note');
export const changeTrackIcons = document.querySelectorAll('.change-track-icon');
export const soundModal = document.getElementById('sound-modal');
export const soundNameInput = document.getElementById('sound-name-input');
export const soundLinkInput = document.getElementById('sound-link-input');
export const soundFileInput = document.getElementById('sound-file-input');
export const selectFileBtn = document.getElementById('select-file-btn');
export const cancelBtn = document.getElementById('cancel-btn');
export const saveBtn = document.getElementById('save-btn');
export const trackTimes = document.querySelectorAll('.track-time');
export const spsDisplay = document.getElementById('sps-display');
export const padController = document.getElementById('pad-controller');
export const padVolumeSlider = document.getElementById('pad-volume-slider');
export const padStepsContainer = document.getElementById('pad-steps-container');
export const loop1sBtn = document.getElementById('loop-1s-btn');
export const loop05sBtn = document.getElementById('loop-0.5s-btn');
export const loop2sBtn = document.getElementById('loop-2s-btn');
export const loop3sBtn = document.getElementById('loop-3s-btn');
export const loop4sBtn = document.getElementById('loop-4s-btn');
export const loop5sBtn = document.getElementById('loop-5s-btn');
export const stopLoopBtn = document.getElementById('stop-loop-btn');
export const changeMetronomeSoundIcon = document.getElementById('change-metronome-sound-icon');
export const padBpmDisplay = document.getElementById('pad-bpm-display');
export const padBpmSlider = document.getElementById('pad-bpm-slider');
export const padPlayPauseBtn = document.getElementById('pad-play-pause-btn');

export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
