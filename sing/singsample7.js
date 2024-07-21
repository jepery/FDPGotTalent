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
        { time: 7, text: "You're on the phone with your girlfriend, she's upset\n\n", missing: "phone" },
        { time: 11, text: "She's going off about something that you said\nCause she doesn't get your humor like I do\n\n", missing: "something" },
        { time: 22, text: "I'm in the room, it's a typical Tuesday night\n\n", missing: "Tuesday" },
        { time: 25, text: "I'm listening to the kind of music she doesn't like \nAnd she'll never know your story like I do\n\n", missing: "story" },
        { time: 36, text: "But she wears short skirts, I wear T-shirts\n\n", missing: "skirts" },
        { time: 40, text: "She's Cheer Captain and I'm on the bleachers\n\n", missing: "bleachers" },
        { time: 44, text: "Dreaming 'bout the day when you wake up and find\n\n", missing: "wake" },
        { time: 47, text: "That what you're looking for has been here the whole time\n\n", missing: "looking" },
        { time: 51, text: "If you could see that I'm the one who understands you\n\n", missing: "understands" },
        { time: 55, text: "Been here all along, so why can't you see?\nYou belong with me, you belong with me\n\n", missing: "belong" },
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

