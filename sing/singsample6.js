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
        { time: 14, text: "The snow glows white on the mountain tonight\n\n", missing: "mountain" },
        { time: 17, text: "Not a footprint to be seen\n\n", missing: "footprint" },
        { time: 21, text: "A kingdom of isolation\nAnd it looks like I'm the queen\n\n", missing: "isolation" },
        { time: 29, text: "The wind is howling like this swirling storm inside\nCouldn't keep it in, Heaven knows I tried\n\n", missing: "swirling" },
        { time: 43, text: "Don't let them in, don't let them see\nBe the good girl you always have to be\n\n", missing: "good" },
        { time: 50, text: "conceal, don't feel, don't let them know\nWell, now they know\n\n", missing: "conceal" },
        { time: 60, text: "Let it go, let it go, Can't hold it back anymore\n\n", missing: "anymore" },
        { time: 66, text: "Let it go, let it go, Turn away and slam the door\n\n", missing: "away" },
        { time: 73, text: "I don't care what they're going to say\n\n", missing: "say" },
        { time: 81, text: "Let the storm rage on\nThe cold never bothered me anyway\n\n", missing: "storm" },
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

