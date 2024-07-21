// script.js
document.addEventListener("DOMContentLoaded", () => {
    const iframe = document.querySelector('#videoke iframe');
    const player = new Vimeo.Player(iframe);
    const lyricsContainer = document.getElementById('lyrics');
    const form = document.getElementById('quiz-form');
    const answerInput = document.getElementById('answer');
    const feedback = document.getElementById('feedback');
    const tallyContainer = document.getElementById('tally');
    const correctSound = document.getElementById('correct-sound');
    const incorrectSound = document.getElementById('incorrect-sound');

    const lyrics = [
        { time: 14, text: "I'd never gone with the wind, just let it flow\n\n", missing: "wind" },
        { time: 22, text: "Let it take me where it wants to go\n\n", missing: "wants" },
        { time: 26, text: "Til you open the door, there's so much more\n\n", missing: "door" },
        { time: 33, text: "I'd never seen it before\n\n", missing: "before" },
        { time: 36, text: "I was tryin' to fly\n\n", missing: "fly" },
        { time: 39, text: "but I couldn't find wings\n\n", missing: "wings" },
        { time: 44, text: "But you came along and you changed everything\n\n", missing: "leave" },
        { time: 48, text: "You lift my feet off the ground, You spin me around\nYou make me crazier, crazier\n\n", missing: "feet" },
        { time: 57, text: "Feels like I'm fallin' and I am lost in your eyes \n\n", missing: "fallin" },
        { time: 66, text: "You make me crazier, crazier, crazier\n\n", missing: "crazier" },
    ];

    let currentIndex = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    player.on('timeupdate', (data) => {
        const currentTime = data.seconds;
        const currentLyrics = lyrics[currentIndex];

        if (currentLyrics && currentTime >= currentLyrics.time) {
            lyricsContainer.innerHTML = currentLyrics.text.replace(currentLyrics.missing, `<span class="missing-word">______</span>`);
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const currentLyrics = lyrics[currentIndex];

        if (answerInput.value.toLowerCase() === currentLyrics.missing.toLowerCase()) {
            correctAnswers++;
            feedback.textContent = "Correct!";
            feedback.classList.remove('incorrect');
            feedback.classList.add('correct');
            correctSound.play();
        } else {
            incorrectAnswers++;
            feedback.textContent = "Incorrect";
            feedback.classList.remove('correct');
            feedback.classList.add('incorrect');
            incorrectSound.play();
        }
        
        currentIndex++;
        answerInput.value = "";

        if (currentIndex >= lyrics.length) {
            form.style.display = "none";
            displayTally();
        } else {
            feedback.textContent = ""; // Reset feedback for the next question
            feedback.classList.remove('correct', 'incorrect');
        }
    });

    function displayTally() {
        tallyContainer.innerHTML = `
            <p>Correct Answers: ${correctAnswers}</p>
            <p>Incorrect Answers: ${incorrectAnswers}</p>
        `;
    }
});

