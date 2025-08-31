import * as state from './state.js';
import { spsDisplay, metronomeSound } from './ui.js';

export function playMetronome() {
    state.setBeatCount(state.beatCount + 1);
    metronomeSound.currentTime = 0;
    metronomeSound.play();
}

export function playPadSound(padId) {
    const padState = state.getPadState(padId);
    if (padState) {
        state.setPadBeatCount(padId, padState.beatCount + 1);
        if (padState.beatCount % padState.steps === 0) {
            const sound = padState.sound;
            if (sound) {
                const audio = new Audio(sound);
                audio.volume = padState.volume;
                audio.play();
                state.setSpsCounter(state.spsCounter + 1);
            }
        }
    }
}

export function clearIndefiniteLoop(padId) {
    const padState = state.getPadState(padId);
    if (padState && padState.loopInterval) {
        clearInterval(padState.loopInterval);
        state.setPadLoopInterval(padId, null);
    }
}

export function setIndefiniteLoop(padId, interval) {
    clearIndefiniteLoop(padId);
    const padState = state.getPadState(padId);
    if (padState) {
        const newInterval = setInterval(() => {
            const sound = padState.sound;
            if (sound) {
                const audio = new Audio(sound);
                audio.volume = padState.volume;
                audio.play();
                state.setSpsCounter(state.spsCounter + 1);
            }
        }, interval);
        state.setPadLoopInterval(padId, newInterval);
    }
}

export function playSound(pad) {
    const padState = state.getPadState(pad.id);
    if (padState && padState.sound) {
        const audio = new Audio(padState.sound);
        audio.volume = padState.volume;
        audio.play();
        state.setSpsCounter(state.spsCounter + 1);
    }
}

setInterval(() => {
    spsDisplay.textContent = state.spsCounter;
    state.setSpsCounter(0);
}, 1000);