const soundsDiv = document.getElementById('soundBoard');

let playingSoundElement = null;

function populateDiv(div, soundsToShow) {
    soundsToShow.forEach((sound) => {
        const audioElement = `
            <audio src="${sound.soundFile}" id="${sound.name}"></audio>
        `;

        function playThisSound() {
            playSound(audioElement);
        };

        const soundElement = `
            <div class="soundButton" onClick="() => {
                playSound(${playThisSound});
            }
                <p class="soundName">${sound.name}</p>
                ${audioElement}
            </div>
        `;
        div.innerHTML += soundElement;
    });
}

function playSound(soundToPlay) {
    if (playingSoundElement) stopSound(playingSoundElement);
    playingSoundElement = soundToPlay;
    playingSoundElement.play();
}


function stopSound(sound) {
    document.getElementById(sound.name).pause();
    document.getElementById(sound.name).currentTime = 0;
}


document.addEventListener('DOMContentLoaded', () => {
    populateDiv(soundsDiv, sounds);
});