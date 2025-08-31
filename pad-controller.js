import * as ui from './ui.js';
import * as state from './state.js';
import * as audio from './audio.js';

function createStepButtons() {
    for (let i = 1; i <= 8; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.dataset.steps = i;
        button.classList.add('bg-gray-600', 'hover:bg-gray-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded');
        ui.padStepsContainer.appendChild(button);

        button.addEventListener('click', () => {
            if (state.selectedPadId) {
                state.setPadSteps(state.selectedPadId, i);
                updateActiveStepButton();
                // Play sound `i` times
                for (let j = 0; j < i; j++) {
                    setTimeout(() => {
                        const padElement = document.getElementById(state.selectedPadId);
                        audio.playSound(padElement);
                    }, j * 100); // Stagger the sounds slightly
                }
            }
        });
    }
}

export function updateActiveStepButton() {
    if (state.selectedPadId) {
        const padState = state.getPadState(state.selectedPadId);
        const steps = padState.steps;
        const buttons = ui.padStepsContainer.querySelectorAll('button');
        buttons.forEach(button => {
            if (parseInt(button.dataset.steps) === steps) {
                button.classList.add('bg-blue-500');
                button.classList.remove('bg-gray-600');
            } else {
                button.classList.remove('bg-blue-500');
                button.classList.add('bg-gray-600');
            }
        });
    }
}

export function init() {
    createStepButtons();
}