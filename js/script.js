const soundsDiv = document.getElementById('soundBoard');

let playingSoundElement = null;

function populateSoundDiv(soundsDiv, soundsToShow) {
    soundsToShow.forEach((sound) => {
        const audioElement = document.createElement('audio');
        audioElement.src = sound.soundFile;
        audioElement.id = sound.name;

        const soundElement = document.createElement('div');
        soundElement.classList.add('soundButton');

        soundElement.addEventListener('click', () => {
            playSound(audioElement);
        });

        soundElement.innerHTML = `
            <p class="soundName">${sound.name}</p>
            <button class="starButton" data-sound-name="${sound.name}">
                <img src="images/${sound.starred ? 'starred' : 'unstarred'}.png" alt="starred">
            </button>
        `;

        const starButton = soundElement.querySelector('.starButton');
        starButton.addEventListener('click', (event) => toggleStarredSound(event, sound));

        soundsDiv.appendChild(soundElement);
    });
}

function playSound(soundToPlay) {
    if (playingSoundElement !== null) stopSound(playingSoundElement);
    playingSoundElement = soundToPlay;
    playingSoundElement.play();
}

function stopSound(sound) {
    sound.pause();
    sound.currentTime = 0;
}

function sortSounds(sounds) {
    let starredSounds = [];
    let generalSounds = [];

    const starredSoundsNames = JSON.parse(localStorage.getItem('starredSounds')) || [];

    sounds.forEach((sound) => {
        if (starredSoundsNames.includes(sound.name)) {
            sound.starred = true;
            starredSounds.push(sound);
        } else {
            sound.starred = false;
            generalSounds.push(sound);
        }
        
    });

    return { starredSounds, generalSounds };
}

function toggleStarredSound(event, sound) {
    event.stopPropagation();  // Prevents the click event from triggering play

    let starredSounds = JSON.parse(localStorage.getItem('starredSounds')) || [];

    if (starredSounds.includes(sound.name)) {
        starredSounds = starredSounds.filter((starredSound) => starredSound !== sound.name);
        sound.starred = false;
    } else {
        starredSounds.push(sound.name);
        sound.starred = true;
    }

    localStorage.setItem('starredSounds', JSON.stringify(starredSounds));
    location.reload();
}

function updateStarButton(button, isStarred) {
    const img = button.querySelector('img');
    img.src = `images/${isStarred ? 'starred' : 'unstarred'}.png`;
}

document.addEventListener('DOMContentLoaded', () => {
    const { starredSounds, generalSounds } = sortSounds(sounds);

    if (starredSounds.length > 0) {
        const starredSoundDiv = document.getElementById('starredSounds');
        document.getElementById("starredSoundsSection").classList.remove('hidden');
        populateSoundDiv(starredSoundDiv, starredSounds);
    }

    const generalSoundDiv = document.getElementById('generalSounds');
    populateSoundDiv(generalSoundDiv, generalSounds);
});
