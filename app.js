const bpmSlider = document.getElementById('bpm-slider');
const bpmDisplay = document.getElementById('bpm-display');
const playPauseBtn = document.getElementById('play-pause-btn');
const trackBtns = document.querySelectorAll('.track-btn');
const metronomeSound = document.getElementById('metronome-sound');
const pads = document.querySelectorAll('.pad');
const musicNotes = document.querySelectorAll('.music-note');
const changeTrackIcons = document.querySelectorAll('.change-track-icon');
const soundModal = document.getElementById('sound-modal');
const soundNameInput = document.getElementById('sound-name-input');
const soundLinkInput = document.getElementById('sound-link-input');
const soundFileInput = document.getElementById('sound-file-input');
const selectFileBtn = document.getElementById('select-file-btn');
const cancelBtn = document.getElementById('cancel-btn');
const saveBtn = document.getElementById('save-btn');
const trackTimes = document.querySelectorAll('.track-time');
const spsDisplay = document.getElementById('sps-display');
const padController = document.getElementById('pad-controller');
const padVolumeSlider = document.getElementById('pad-volume-slider');
const padStepsSelect = document.getElementById('pad-steps-select');
const loop1sBtn = document.getElementById('loop-1s-btn');
const loop05sBtn = document.getElementById('loop-0.5s-btn');
const stopLoopBtn = document.getElementById('stop-loop-btn');
const changeMetronomeSoundIcon = document.getElementById('change-metronome-sound-icon');
const padBpmDisplay = document.getElementById('pad-bpm-display');
const padBpmSlider = document.getElementById('pad-bpm-slider');
const padPlayPauseBtn = document.getElementById('pad-play-pause-btn');

let bpm = 120;
let isPlaying = false;
let metronomeInterval;
let activeElement = null;
let selectedPad = null;
let spsCounter = 0;
let beatCount = 0;
let padBpm = 120;
let isPadPlaying = false;
let padMetronomeInterval;
let padBeatCount = 0;

setInterval(() => {
    spsDisplay.textContent = spsCounter;
    spsCounter = 0;
}, 1000);

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function clearIndefiniteLoop(pad) {
    if (pad.dataset.intervalId) {
        clearInterval(pad.dataset.intervalId);
        pad.removeAttribute('data-interval-id');
    }
}

bpmSlider.addEventListener('input', () => {
    bpm = bpmSlider.value;
    bpmDisplay.textContent = bpm;
    if (isPlaying) {
        clearInterval(metronomeInterval);
        metronomeInterval = setInterval(playMetronome, (60 / bpm) * 1000);
    }
});

padBpmSlider.addEventListener('input', () => {
    padBpm = padBpmSlider.value;
    padBpmDisplay.textContent = padBpm;
    if (isPadPlaying) {
        clearInterval(padMetronomeInterval);
        padMetronomeInterval = setInterval(playPadMetronome, (60 / padBpm) * 1000);
    }
});

playPauseBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
        playPauseBtn.textContent = 'Pause';
        beatCount = 0;
        metronomeInterval = setInterval(playMetronome, (60 / bpm) * 1000);
    } else {
        playPauseBtn.textContent = 'Play';
        clearInterval(metronomeInterval);
    }
});

padPlayPauseBtn.addEventListener('click', () => {
    isPadPlaying = !isPadPlaying;
    if (isPadPlaying) {
        padPlayPauseBtn.textContent = 'Pause';
        padBeatCount = 0;
        padMetronomeInterval = setInterval(playPadMetronome, (60 / padBpm) * 1000);
    } else {
        padPlayPauseBtn.textContent = 'Play';
        clearInterval(padMetronomeInterval);
    }
});

function playMetronome() {
    beatCount++;
    metronomeSound.currentTime = 0;
    metronomeSound.play();
}

function playPadMetronome() {
    if (selectedPad) {
        const sound = selectedPad.dataset.sound;
        if (sound) {
            const audio = new Audio(sound);
            audio.volume = selectedPad.dataset.volume;
            audio.play();
            spsCounter++;
        }
    }
}

trackBtns.forEach((btn, index) => {
    const trackId = btn.dataset.track;
    const track = document.getElementById(trackId);
    const trackTime = trackTimes[index];

    track.addEventListener('loadedmetadata', () => {
        trackTime.textContent = formatTime(track.duration);
    });

    track.addEventListener('timeupdate', () => {
        const remainingTime = track.duration - track.currentTime;
        trackTime.textContent = formatTime(remainingTime);
    });

    btn.addEventListener('click', () => {
        if (track.paused) {
            track.play();
            btn.textContent = 'Pause';
        } else {
            track.pause();
            btn.textContent = 'Play';
        }
    });
});

pads.forEach(pad => {
    pad.dataset.volume = "1";
    pad.dataset.steps = "1";

    pad.addEventListener('click', () => {
        selectedPad = pad;
        padController.classList.remove('hidden');
        padVolumeSlider.value = selectedPad.dataset.volume;
        padStepsSelect.value = selectedPad.dataset.steps;

        const sound = pad.dataset.sound;
        if (sound) {
            const audio = new Audio(sound);
            audio.volume = pad.dataset.volume;
            audio.play();
            spsCounter++;
        }
    });
});

padVolumeSlider.addEventListener('input', () => {
    if (selectedPad) {
        selectedPad.dataset.volume = padVolumeSlider.value;
    }
});

padStepsSelect.addEventListener('change', () => {
    if (selectedPad) {
        selectedPad.dataset.steps = padStepsSelect.value;
    }
});

loop1sBtn.addEventListener('click', () => {
    if (selectedPad) {
        clearIndefiniteLoop(selectedPad);

        const intervalId = setInterval(() => {
            const sound = selectedPad.dataset.sound;
            if (sound) {
                const audio = new Audio(sound);
                audio.volume = selectedPad.dataset.volume;
                audio.play();
                spsCounter++;
            }
        }, 1000);
        selectedPad.dataset.intervalId = intervalId;
    }
});

loop05sBtn.addEventListener('click', () => {
    if (selectedPad) {
        clearIndefiniteLoop(selectedPad);

        const intervalId = setInterval(() => {
            const sound = selectedPad.dataset.sound;
            if (sound) {
                const audio = new Audio(sound);
                audio.volume = selectedPad.dataset.volume;
                audio.play();
                spsCounter++;
            }
        }, 500);
        selectedPad.dataset.intervalId = intervalId;
    }
});

stopLoopBtn.addEventListener('click', () => {
    if (selectedPad) {
        clearIndefiniteLoop(selectedPad);
    }
});

musicNotes.forEach(note => {
    note.addEventListener('click', (e) => {
        activeElement = e.target.previousElementSibling;
        soundModal.dataset.type = 'pad';
        soundModal.classList.remove('hidden');
    });
});

changeTrackIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
        activeElement = e.target.parentElement.parentElement;
        soundModal.dataset.type = 'track';
        soundModal.classList.remove('hidden');
    });
});

changeMetronomeSoundIcon.addEventListener('click', () => {
    soundModal.dataset.type = 'metronome';
    soundModal.classList.remove('hidden');
});

selectFileBtn.addEventListener('click', () => {
    soundFileInput.click();
});

cancelBtn.addEventListener('click', () => {
    soundModal.classList.add('hidden');
});

saveBtn.addEventListener('click', () => {
    const soundName = soundNameInput.value;
    const soundLink = soundLinkInput.value;
    const soundFile = soundFileInput.files[0];
    const type = soundModal.dataset.type;

    let soundUrl = null;

    if (soundLink) {
        soundUrl = soundLink;
    } else if (soundFile) {
        soundUrl = URL.createObjectURL(soundFile);
    }

    if (soundUrl) {
        if (type === 'pad') {
            activeElement.dataset.sound = soundUrl;
            if (soundName) {
                activeElement.querySelector('.pad-name').textContent = soundName;
            }
        } else if (type === 'track') {
            const trackId = activeElement.querySelector('.track-btn').dataset.track;
            const track = document.getElementById(trackId);
            track.src = soundUrl;
            if (soundName) {
                activeElement.querySelector('.track-name').textContent = soundName;
            }
        } else if (type === 'metronome') {
            metronomeSound.src = soundUrl;
        }
    }

    soundNameInput.value = '';
    soundLinkInput.value = '';
    soundFileInput.value = '';
    soundModal.classList.add('hidden');
});

soundLinkInput.addEventListener('click', () => {
    soundFileInput.value = '';
});

soundFileInput.addEventListener('change', () => {
    soundLinkInput.value = '';
});
