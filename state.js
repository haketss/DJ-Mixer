export let bpm = 120;
export let isPlaying = false;
export let metronomeInterval;
export let activeElement = null;
export let selectedPadId = null;
export let spsCounter = 0;
export let beatCount = 0;

export const padStates = {};

export function initPadState(padId) {
    if (!padStates[padId]) {
        padStates[padId] = {
            bpm: 120,
            isPlaying: false,
            metronomeInterval: null,
            beatCount: 0,
            steps: 1,
            volume: 1,
            sound: null,
            loopInterval: null,
        };
    }
}

export function getPadState(padId) {
    return padStates[padId];
}

export function setPadBpm(padId, value) {
    if (padStates[padId]) {
        padStates[padId].bpm = value;
    }
}

export function setIsPadPlaying(padId, value) {
    if (padStates[padId]) {
        padStates[padId].isPlaying = value;
    }
}

export function setPadMetronomeInterval(padId, value) {
    if (padStates[padId]) {
        padStates[padId].metronomeInterval = value;
    }
}

export function setPadBeatCount(padId, value) {
    if (padStates[padId]) {
        padStates[padId].beatCount = value;
    }
}

export function setPadSteps(padId, value) {
    if (padStates[padId]) {
        padStates[padId].steps = value;
    }
}

export function setPadVolume(padId, value) {
    if (padStates[padId]) {
        padStates[padId].volume = value;
    }
}

export function setPadSound(padId, value) {
    if (padStates[padId]) {
        padStates[padId].sound = value;
    }
}

export function setPadLoopInterval(padId, value) {
    if (padStates[padId]) {
        padStates[padId].loopInterval = value;
    }
}

export function setBpm(value) {
    bpm = value;
}

export function setIsPlaying(value) {
    isPlaying = value;
}

export function setMetronomeInterval(value) {
    metronomeInterval = value;
}

export function setActiveElement(value) {
    activeElement = value;
}

export function setSelectedPadId(value) {
    selectedPadId = value;
}

export function setSpsCounter(value) {
    spsCounter = value;
}

export function setBeatCount(value) {
    beatCount = value;
}