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
        { time: 42, text: "Friday night and the lights are low\n\n", missing: "lights" },
        { time: 48, text: "Looking out for a place to go\n\n", missing: "place" },
        { time: 52, text: "Where they play the right music, getting in the swing\n\n", missing: "music" },
        { time: 56, text: "You come to look for a king\n\n", missing: "king" },
        { time: 63, text: "Anybody could be that guy\nNight is young and the music's high\n\n", missing: "young" },
        { time: 72, text: "With a bit of rock music, everything is fine\nYou're in the mood for a dance\n\n", missing: "dance" },
        { time: 80, text: "And when you get the chance\nYou are the dancing queen Young and sweet, only seventeen\n\n", missing: "seventeen" },
        { time: 96, text: "Dancing queen\nFeel the beat from the tambourine, oh yeah\n\n", missing: "tambourine" },
        { time: 106, text: "You can dance, you can jive\nHaving the time of your life\n\n", missing: "life" },
        { time: 115, text: "Ooh, see that girl, watch that scene\nDigging the dancing queen\n\n", missing: "dancing" },
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

