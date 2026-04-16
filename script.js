document.addEventListener('DOMContentLoaded', () => {
    //Grab Elements
    const questionContainer = document.getElementById("question-container");
    const resultContainer = document.getElementById("result-container");
    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices-list");
    const nextButton = document.getElementById("next-btn");
    const scoreDisplay = document.getElementById("score");
    const restartButton = document.getElementById("restart-btn");
    const startButton = document.getElementById("start-btn");

    //Fetchquestions from the API
    async function getTrivia() {
        const apiURL = "https://the-trivia-api.com/v2/questions";
        try {
            const response = await fetch(apiURL);
            // console.log(response);
            if (!response.ok) {
                throw new Error("Failed to Fetch");
            }

            const data = await response.json();

            return data;

        } catch (error) {
            console.error("Error fetching question", error)
        }
    }

    // console.log(getTrivia());
    let quiz;
    let quizIdx = 0;
    async function handleEvent(){
        quiz = await getTrivia();
        console.log(quiz[quizIdx]);
        renderQuiz(quiz[quizIdx++]);
        resultContainer.classList.add('hidden');
    }

    startButton.addEventListener("click",handleEvent);
    restartButton.addEventListener("click",handleEvent);

    nextButton.addEventListener("click", (e) => {
        renderQuiz(quiz[quizIdx++]);
        if (quizIdx === 10) {
            resultContainer.classList.remove('hidden');
            nextButton.classList.add('hidden');
            questionText.textContent = "";
            choicesList.innerHTML = "";
            quizIdx = 0;
        }
    })

    // Display quiz data
    function renderQuiz(q) {
        questionContainer.classList.remove('hidden');
        startButton.classList.add('hidden');
        nextButton.classList.remove('hidden');
        questionText.textContent = q.question.text;

        choicesList.innerHTML = "";

        for (let i = 0; i < 3; i++) {
            const li = document.createElement('li');
            li.textContent = q.incorrectAnswers[i];
            choicesList.appendChild(li);
        }
        const li = document.createElement('li');
        li.textContent = q.correctAnswer;
        const idx = parseInt(Math.random() * 4);
        choicesList.insertBefore(li, choicesList.children[idx]);
    }



})