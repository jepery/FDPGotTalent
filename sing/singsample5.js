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
        { time: 6, text: "It's been a long and winding journey\nBut I'm finally here tonight\n\n", missing: "tonight" },
        { time: 14, text: "I'm picking up the pieces\nAnd walking back into the ligh\n\n", missing: "walking" },
        { time: 21, text: "Into the sunset of your glory\n\n", missing: "sunset" },
        { time: 26, text: "Where my heart and future lies\n\n", missing: "future" },
        { time: 29, text: "There's nothing like that feeling\nWhen I look into your eyes\n\n", missing: "look" },
        { time: 37, text: "My dreams came true, when I found you\nI found you, my miracle\n\n", missing: "miracle" },
        { time: 51, text: "If you could see what I see\n\n", missing: "see" },
        { time: 58, text: "That you're the answer to my prayers\n\n", missing: "prayers" },
        { time: 65, text: "And if you could feel the tenderness I feel\n\n", missing: "tenderness" },
        { time: 73, text: "You would know, it would be clea\nThat angels brought me here\n\n", missing: "angels" },
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

