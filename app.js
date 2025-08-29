import * as state from './state.js';
import * as audio from './audio.js';
import * as ui from './ui.js';

ui.bpmSlider.addEventListener('input', () => {
    state.setBpm(ui.bpmSlider.value);
    ui.bpmDisplay.textContent = state.bpm;
    if (state.isPlaying) {
        clearInterval(state.metronomeInterval);
        state.setMetronomeInterval(setInterval(audio.playMetronome, (60 / state.bpm) * 1000));
    }
});

ui.padBpmSlider.addEventListener('input', () => {
    state.setPadBpm(ui.padBpmSlider.value);
    ui.padBpmDisplay.textContent = state.padBpm;
    if (state.isPadPlaying) {
        clearInterval(state.padMetronomeInterval);
        state.setPadMetronomeInterval(setInterval(audio.playPadMetronome, (60 / state.padBpm) * 1000));
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
    state.setIsPadPlaying(!state.isPadPlaying);
    if (state.isPadPlaying) {
        ui.padPlayPauseBtn.textContent = 'Pause';
        state.setPadMetronomeInterval(setInterval(audio.playPadMetronome, (60 / state.padBpm) * 1000));
    } else {
        ui.padPlayPauseBtn.textContent = 'Play';
        clearInterval(state.padMetronomeInterval);
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

ui.pads.forEach(pad => {
    pad.dataset.volume = "1";
    pad.dataset.steps = "1";

    pad.addEventListener('click', () => {
        state.setSelectedPad(pad);
        ui.padController.classList.remove('hidden');
        ui.padVolumeSlider.value = state.selectedPad.dataset.volume;
        ui.padStepsSelect.value = state.selectedPad.dataset.steps;

        const sound = pad.dataset.sound;
        if (sound) {
            const audio = new Audio(sound);
            audio.volume = pad.dataset.volume;
            audio.play();
            state.setSpsCounter(state.spsCounter + 1);
        }
    });
});

ui.padVolumeSlider.addEventListener('input', () => {
    if (state.selectedPad) {
        state.selectedPad.dataset.volume = ui.padVolumeSlider.value;
    }
});

ui.padStepsSelect.addEventListener('change', () => {
    if (state.selectedPad) {
        state.selectedPad.dataset.steps = ui.padStepsSelect.value;
    }
});

ui.loop1sBtn.addEventListener('click', () => {
    if (state.selectedPad) {
        audio.setIndefiniteLoop(state.selectedPad, 1000);
    }
});

ui.loop05sBtn.addEventListener('click', () => {
    if (state.selectedPad) {
        audio.setIndefiniteLoop(state.selectedPad, 500);
    }
});

ui.loop2sBtn.addEventListener('click', () => {
    if (state.selectedPad) {
        audio.setIndefiniteLoop(state.selectedPad, 2000);
    }
});

ui.loop3sBtn.addEventListener('click', () => {
    if (state.selectedPad) {
        audio.setIndefiniteLoop(state.selectedPad, 3000);
    }
});

ui.loop4sBtn.addEventListener('click', () => {
    if (state.selectedPad) {
        audio.setIndefiniteLoop(state.selectedPad, 4000);
    }
});

ui.loop5sBtn.addEventListener('click', () => {
    if (state.selectedPad) {
        audio.setIndefiniteLoop(state.selectedPad, 5000);
    }
});

ui.stopLoopBtn.addEventListener('click', () => {
    if (state.selectedPad) {
        audio.clearIndefiniteLoop(state.selectedPad);
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
            state.activeElement.dataset.sound = soundUrl;
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
});r('click', () => {
    ui.soundFileInput.value = '';
});

ui.soundFileInput.addEventListener('change', () => {
    ui.soundLinkInput.value = '';
});