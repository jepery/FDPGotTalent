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
        { time: 23, text: "The daylight's fading slowly\n\n", missing: "slowly" },
        { time: 27, text: "But time with you is standing still\n\n", missing: "standing" },
        { time: 30, text: "I'm waiting for you only, The slightest touch and I feel weak\n\n", missing: "waiting" },
        { time: 39, text: "I cannot lie\n\n", missing: "lie" },
        { time: 42, text: "From you, I cannot hide\nAnd I'm losing the will to try\n\n", missing: "hide" },
        { time: 49, text: "Can't hide it\nCan't fight it\n\n", missing: "fight" },
        { time: 53, text: "So go on, go on\nCome on, leave me breathless\n\n", missing: "leave" },
        { time: 59, text: "Tempt me, tease me\nUntil I can't deny this\n\n", missing: "tease" },
        { time: 65, text: "Loving feeling\n\n", missing: "feeling" },
        { time: 68, text: "Make me long for your kiss\nGo on (Go on), go on (Go on), Yeah, come on\n\n", missing: "kiss" },
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

