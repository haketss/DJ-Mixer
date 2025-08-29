import * as state from './state.js';
import { spsDisplay, metronomeSound } from './ui.js';

export function playMetronome() {
    state.setBeatCount(state.beatCount + 1);
    metronomeSound.currentTime = 0;
    metronomeSound.play();
}

export function playPadMetronome() {
    state.setPadBeatCount(state.padBeatCount + 1);
    if (state.selectedPad) {
        const steps = parseInt(state.selectedPad.dataset.steps);
        if (state.padBeatCount % steps === 0) {
            const sound = state.selectedPad.dataset.sound;
            if (sound) {
                const audio = new Audio(sound);
                audio.volume = state.selectedPad.dataset.volume;
                audio.play();
                state.setSpsCounter(state.spsCounter + 1);
            }
        }
    }
}

export function clearIndefiniteLoop(pad) {
    if (pad.dataset.intervalId) {
        clearInterval(pad.dataset.intervalId);
        pad.removeAttribute('data-interval-id');
    }
}

export function setIndefiniteLoop(pad, interval) {
    clearIndefiniteLoop(pad);

    const intervalId = setInterval(() => {
        const sound = pad.dataset.sound;
        if (sound) {
            const audio = new Audio(sound);
            audio.volume = pad.dataset.volume;
            audio.play();
            state.setSpsCounter(state.spsCounter + 1);
        }
    }, interval);
    pad.dataset.intervalId = intervalId;
}

setInterval(() => {
    spsDisplay.textContent = state.spsCounter;
    state.setSpsCounter(0);
}, 1000);
