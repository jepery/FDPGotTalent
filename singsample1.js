// script.js
document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById('videoke');
    const lyricsContainer = document.getElementById('lyrics');
    const form = document.getElementById('quiz-form');
    const answerInput = document.getElementById('answer');
    const feedback = document.getElementById('feedback');
    const tallyContainer = document.getElementById('tally');
    const correctSound = document.getElementById('correct-sound');
    const incorrectSound = document.getElementById('incorrect-sound');

    const lyrics = [
        { time: 28, text: "There I was waiting for a chance\nHoping that you'll understand the things I wanna say\n\n", missing: "chance" },
        { time: 42, text: "As my love went stronger than before, I wanna see\n you more and more but you closed your door\n\n", missing: "stronger" },
        { time: 60, text: "Why don't you try, To open up your heart\n I won't take so much of your time\n\n", missing: "heart" },
        { time: 74, text: "Maybe, it's wrong to say, please love me too\nCause I know you'll never do\n\n", missing: "never" },
        { time: 82, text: "Somebody else is waiting there inside for you\n Maybe it's wrong to love you more each day\n\n", missing: "inside" },
        // Add more lyrics timing and text as needed
        { time: 93, text: "Cause I know he's here to stay\nBut I know to whom you should belong\n", missing: "belong" },
        { time: 106, text: "I believed what you said to me\nWe should set each other free\nThat's how you want it to be\n\n", missing: "free" },
        { time: 120, text: "But my love went stronger than before\nI wanna see you more and more But you closed your door\n\n", missing: "before" },
        { time: 138, text: "Why don't you try, To open up your heart?\nI won't take so much of your time\n\n", missing: "time" },
        { time: 152, text: "Maybe, it's wrong to say, please love me too\nCause I know you'll never do\n\n", missing: "wrong" },
        { time: 161, text: "Somebody else is waiting there inside for you\n Maybe it's wrong to love you more each day\n\n", missing: "love" },
        { time: 174, text: "Cause I know he's here to stay\nBut my love is strong\nI don't know if this is wrong But I know to whom you should belong\n", missing: "stay" },
        { time: 213, text: "Maybe, it's wrong to say, please love me too\nCause I know you'll never do\n\n", missing: "please" },
        { time: 220, text: "Somebody else is waiting there inside for you\n Maybe it's wrong to love you more each day\n\n", missing: "waiting" },
        { time: 232, text: "Cause I know he's here to stay\nBut my love is strong\n", missing: "strong" },
        { time: 240, text: "I don't know if this is wrong\n Cause I know to whom you should belong\n\n", missing: "Cause" },
    ];

    let currentIndex = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    video.addEventListener('timeupdate', () => {
        const currentTime = video.currentTime;
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
        }
    });

    function displayTally() {
        tallyContainer.innerHTML = `
            <p>Correct Answers: ${correctAnswers}</p>
            <p>Incorrect Answers: ${incorrectAnswers}</p>
        `;
    }
});
