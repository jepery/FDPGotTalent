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
        { time: 11, text: "I know it's been some time\nBut there's something on my mind\n\n", missing: "something" },
        { time: 19, text: "You see, I haven't been the same\nSince that cold November day\n\n", missing: "November" },
        { time: 27, text: "We said we needed space\nBut all we found was an empty place\n", missing: "found" },
        { time: 35, text: "And the only things I learned\nIs that I need you desperately\n\n", missing: "desperately" },
        { time: 42, text: "So here I am, And can you please tell me, oh\n\n", missing: "please" },
        { time: 52, text: "Where do broken hearts go?\nCan they find their way home\n\n", missing: "broken" },
        { time: 61, text: "Back to the open arms\n\n", missing: "open" },
        { time: 64, text: "Of a love that's waiting there?\n\n", missing: "waiting" },
        { time: 68, text: "And if somebody loves you\nWon't they always love you?\n\n", missing: "always" },
        { time: 76, text: "I look in your eyes\nAnd I know that you still care, for me\n\n", missing: "still" },
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

