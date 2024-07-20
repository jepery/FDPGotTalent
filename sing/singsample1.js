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
        { time: 13, text: "I know when he's been on your mind\nThat distant look is in your eyes\n\n", missing: "mind" },
        { time: 23, text: "I thought with time you'd realize\n It's over, over\n\n", missing: "realize" },
        { time: 30, text: "It's not the way I choose to live\n\n", missing: "choose" },
        { time: 34, text: "And something somewhere's got to give\nAs sharing this relationship Gets older, older\n\n", missing: "give" },
        { time: 46, text: "You know I'd fight for you\n But how can I fight someone who isn't even there?\n\n", missing: "fight" },
        { time: 53, text: "I've had the rest of you, now I want the best of you\n", missing: "best" },
        { time: 57, text: "I don't care if that's not fair\n\n", missing: "fair" },
        { time: 60, text: "Cause I want it all or nothing at all\nThere's no where left to fall\n\n", missing: "nothing" },
        { time: 68, text: "When you reach the bottom, it's now or never\nIs it all, or are we just friends\n\n", missing: "friends" },
        { time: 81, text: "Is this how it ends, with a simple telephone call\nYou leave me here, with nothing at all\n\n", missing: "telephone" },
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

