export let bpm = 120;
export let isPlaying = false;
export let metronomeInterval;
export let activeElement = null;
export let selectedPad = null;
export let spsCounter = 0;
export let beatCount = 0;
export let padBpm = 120;
export let isPadPlaying = false;
export let padMetronomeInterval;
export let padBeatCount = 0;

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

export function setSelectedPad(value) {
    selectedPad = value;
}

export function setSpsCounter(value) {
    spsCounter = value;
}

export function setBeatCount(value) {
    beatCount = value;
}

export function setPadBpm(value) {
    padBpm = value;
}

export function setIsPadPlaying(value) {
    isPadPlaying = value;
}

export function setPadMetronomeInterval(value) {
    padMetronomeInterval = value;
}

export function setPadBeatCount(value) {
    padBeatCount = value;
}
