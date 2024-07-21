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
        { time: 14, text: "I was down, my dreams were wearing thin\nWhen you're lost, where do you begin?\n\n", missing: "thin" },
        { time: 29, text: "My heart always seemed to drift from day to day\n\n", missing: "drift" },
        { time: 36, text: "Looking for the love that never came my way\n", missing: "love" },
        { time: 42, text: "Then you smiled and I reached out to you\n\n", missing: "smiled" },
        { time: 48, text: "I could tell you were lonely too\nOne look and then it all began for you and me\n\n", missing: "lonely" },
        { time: 64, text: "The moment that we touched I knew that there would be\n\n", missing: "touched" },
        { time: 69, text: "Two less lonely people in the world\nAnd it's gonna be fine\n\n", missing: "world" },
        { time: 77, text: "Out of all the people in the world\n\n", missing: "people" },
        { time: 80, text: "I just can't believe you're mine \nIn my life where everything was wrong\n\n", missing: "mine" },
        { time: 88, text: "Something finally went right\nNow there's two less lonely people In the world tonight\n\n", missing: "right" },
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

