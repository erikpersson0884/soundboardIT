const sounds = [
    {
        name: "John Doe", 
        soundFile: "sounds/1.wav"
    },
    {
        name: "Jane Doe",
        soundFile: "sounds/boom.wav"
    },
    {
        name: "Hund",
        soundFile: "sounds/dog.wav"
    },
    {
        name: "laugh",
        soundFile: "sounds/laugh.wav"
    },
    {
        name: "retro",
        soundFile: "sounds/retro.wav"
    },
    {
        name: "oooh my god",
        soundFile: "sounds/ohmygod.wav",    
        image: "images/ohmygod.jpg"
    }
]

const soundsDiv = document.getElementById('soundBoard');

const numRows = Math.ceil(Math.sqrt(sounds.length)); // Calculate number of rows
const numCols = Math.ceil(sounds.length / numRows); // Calculate number of columns

soundsDiv.style.setProperty('--num-rows', numRows); // Set custom property for number of rows
soundsDiv.style.setProperty('--num-cols', numCols); // Set custom property for number of columns


let playingSound;


sounds.forEach((sound) => {
    const soundElement = document.createElement('div');
    soundElement.classList.add('soundButton');
    soundElement.innerHTML = sound.name;

    soundElement.addEventListener('click', () => {
        stopSounds();
        if (playingSound !== sound.name) {
            console.log(playingSound, sound.name);
            document.getElementById(sound.name).play();
            playingSound = sound.name;
        } else playingSound = null;
    });

    soundsDiv.appendChild(soundElement);
    const audioElement = document.createElement('audio');
    audioElement.src = sound.soundFile;
    audioElement.id = sound.name;

    soundsDiv.appendChild(audioElement);
});

function stopSounds() {
    sounds.forEach((sound) => {
        document.getElementById(sound.name).pause();
        document.getElementById(sound.name).currentTime = 0;
    });
}
