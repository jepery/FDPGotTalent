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
        { time: 9, text: "She's always on my mind\nFrom the time I wake up\n\n", missing: "mind" },
        { time: 17, text: "Til I close my eyes\nShe's everywhere I go\n\n", missing: "close" },
        { time: 25, text: "She's all I know\n", missing: "know" },
        { time: 31, text: "Though she's so far away\nIt just keeps getting stronger\n\n", missing: "stronger" },
        { time: 41, text: "Everyday, and even now she's gone\nI'm still holding onI'm still holding on\n\n", missing: "gone" },
        { time: 51, text: "So tell me where do I start\n'Cause it's breaking my heart \n\n", missing: "start" },
        { time: 57, text: "Don't wanna let her go\n\n", missing: "go" },
        { time: 64, text: "Maybe my love will come back someday\nOnly heaven knows\n\n", missing: "someday" },
        { time: 76, text: "And maybe our hearts will find their way\nOnly heaven knows\n\n", missing: "hearts" },
        { time: 88, text: "And all I can do is hope and pray\n'Cause heaven knows\n\n", missing: "pray" },
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

