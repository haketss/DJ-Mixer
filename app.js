
import * as state from './state.js';
import * as audio from './audio.js';
import * as ui from './ui.js';
import * as padController from './pad-controller.js';

padController.init();

// Initialize pads
ui.pads.forEach((pad, index) => {
    const padId = `pad-${index + 1}`;
    pad.id = padId;
    state.initPadState(padId);

    pad.addEventListener('click', () => {
        state.setSelectedPadId(padId);
        const padState = state.getPadState(padId);

        ui.padController.classList.remove('hidden');
        ui.padVolumeSlider.value = padState.volume;
        ui.padBpmSlider.value = padState.bpm;
        ui.padBpmDisplay.textContent = padState.bpm;
        ui.padPlayPauseBtn.textContent = padState.isPlaying ? 'Pause' : 'Play';

        padController.updateActiveStepButton();

        const sound = padState.sound;
        if (sound) {
            audio.playSound(pad);
        }
    });
});


ui.bpmSlider.addEventListener('input', () => {
    state.setBpm(ui.bpmSlider.value);
    ui.bpmDisplay.textContent = state.bpm;
    if (state.isPlaying) {
        clearInterval(state.metronomeInterval);
        state.setMetronomeInterval(setInterval(audio.playMetronome, (60 / state.bpm) * 1000));
    }
});

ui.padBpmSlider.addEventListener('input', () => {
    if (state.selectedPadId) {
        const padState = state.getPadState(state.selectedPadId);
        state.setPadBpm(state.selectedPadId, ui.padBpmSlider.value);
        ui.padBpmDisplay.textContent = ui.padBpmSlider.value;

        if (padState.isPlaying) {
            clearInterval(padState.metronomeInterval);
            const newInterval = setInterval(() => audio.playPadSound(state.selectedPadId), (60 / ui.padBpmSlider.value) * 1000);
            state.setPadMetronomeInterval(state.selectedPadId, newInterval);
        }
    }
});

ui.playPauseBtn.addEventListener('click', () => {
    state.setIsPlaying(!state.isPlaying);
    if (state.isPlaying) {
        ui.playPauseBtn.textContent = 'Pause';
        state.setBeatCount(0);
        state.setMetronomeInterval(setInterval(audio.playMetronome, (60 / state.bpm) * 1000));
    } else {
        ui.playPauseBtn.textContent = 'Play';
        clearInterval(state.metronomeInterval);
    }
});

ui.padPlayPauseBtn.addEventListener('click', () => {
    if (state.selectedPadId) {
        const padState = state.getPadState(state.selectedPadId);
        state.setIsPadPlaying(state.selectedPadId, !padState.isPlaying);

        if (padState.isPlaying) {
            ui.padPlayPauseBtn.textContent = 'Pause';
            const newInterval = setInterval(() => audio.playPadSound(state.selectedPadId), (60 / padState.bpm) * 1000);
            state.setPadMetronomeInterval(state.selectedPadId, newInterval);
        } else {
            ui.padPlayPauseBtn.textContent = 'Play';
            clearInterval(padState.metronomeInterval);
            state.setPadMetronomeInterval(state.selectedPadId, null);
        }
    }
});

ui.trackBtns.forEach((btn, index) => {
    const trackId = btn.dataset.track;
    const track = document.getElementById(trackId);
    const trackTime = ui.trackTimes[index];

    track.addEventListener('loadedmetadata', () => {
        trackTime.textContent = ui.formatTime(track.duration);
    });

    track.addEventListener('timeupdate', () => {
        const remainingTime = track.duration - track.currentTime;
        trackTime.textContent = ui.formatTime(remainingTime);
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

ui.padVolumeSlider.addEventListener('input', () => {
    if (state.selectedPadId) {
        state.setPadVolume(state.selectedPadId, ui.padVolumeSlider.value);
    }
});

ui.loop1sBtn.addEventListener('click', () => {
    if (state.selectedPadId) {
        audio.setIndefiniteLoop(state.selectedPadId, 1000);
    }
});

ui.loop05sBtn.addEventListener('click', () => {
    if (state.selectedPadId) {
        audio.setIndefiniteLoop(state.selectedPadId, 500);
    }
});

ui.loop2sBtn.addEventListener('click', () => {
    if (state.selectedPadId) {
        audio.setIndefiniteLoop(state.selectedPadId, 2000);
    }
});

ui.loop3sBtn.addEventListener('click', () => {
    if (state.selectedPadId) {
        audio.setIndefiniteLoop(state.selectedPadId, 3000);
    }
});

ui.loop4sBtn.addEventListener('click', () => {
    if (state.selectedPadId) {
        audio.setIndefiniteLoop(state.selectedPadId, 4000);
    }
});

ui.loop5sBtn.addEventListener('click', () => {
    if (state.selectedPadId) {
        audio.setIndefiniteLoop(state.selectedPadId, 5000);
    }
});

ui.stopLoopBtn.addEventListener('click', () => {
    if (state.selectedPadId) {
        audio.clearIndefiniteLoop(state.selectedPadId);
    }
});

ui.musicNotes.forEach(note => {
    note.addEventListener('click', (e) => {
        state.setActiveElement(e.target.previousElementSibling);
        ui.soundModal.dataset.type = 'pad';
        ui.soundModal.classList.remove('hidden');
    });
});

ui.changeTrackIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
        state.setActiveElement(e.target.parentElement.parentElement);
        ui.soundModal.dataset.type = 'track';
        ui.soundModal.classList.remove('hidden');
    });
});

ui.changeMetronomeSoundIcon.addEventListener('click', () => {
    ui.soundModal.dataset.type = 'metronome';
    ui.soundModal.classList.remove('hidden');
});

ui.selectFileBtn.addEventListener('click', () => {
    ui.soundFileInput.click();
});

ui.cancelBtn.addEventListener('click', () => {
    ui.soundModal.classList.add('hidden');
});

ui.saveBtn.addEventListener('click', () => {
    const soundName = ui.soundNameInput.value;
    const soundLink = ui.soundLinkInput.value;
    const soundFile = ui.soundFileInput.files[0];
    const type = ui.soundModal.dataset.type;

    let soundUrl = null;

    if (soundLink) {
        soundUrl = soundLink;
    } else if (soundFile) {
        soundUrl = URL.createObjectURL(soundFile);
    }

    if (soundUrl) {
        if (type === 'pad') {
            const padId = state.activeElement.id;
            state.setPadSound(padId, soundUrl);
            state.activeElement.dataset.sound = soundUrl; // Keep this for now for the simple click sound
            if (soundName) {
                state.activeElement.querySelector('.pad-name').textContent = soundName;
            }
        } else if (type === 'track') {
            const trackId = state.activeElement.querySelector('.track-btn').dataset.track;
            const track = document.getElementById(trackId);
            track.src = soundUrl;
            if (soundName) {
                state.activeElement.querySelector('.track-name').textContent = soundName;
            }
        } else if (type === 'metronome') {
            ui.metronomeSound.src = soundUrl;
        }
    }

    ui.soundNameInput.value = '';
    ui.soundLinkInput.value = '';
    ui.soundFileInput.value = '';
    ui.soundModal.classList.add('hidden');
});

ui.soundLinkInput.addEventListener('click', () => {
    ui.soundFileInput.value = '';
});

ui.soundFileInput.addEventListener('change', () => {
    ui.soundLinkInput.value = '';
});

document.addEventListener('keydown', (e) => {
    const keyPadMap = {
        'ArrowUp': 0,
        'ArrowLeft': 1,
        'ArrowDown': 2,
        'ArrowRight': 3
    };

    if (keyPadMap.hasOwnProperty(e.key)) {
        e.preventDefault();
        const padIndex = keyPadMap[e.key];
        const pad = ui.pads[padIndex];
        if (pad) {
            audio.playSound(pad);
            // Optional: add a visual feedback, like a class
            pad.classList.add('bg-gray-400');
            setTimeout(() => {
                pad.classList.remove('bg-gray-400');
            }, 100);
        }
    }
});
