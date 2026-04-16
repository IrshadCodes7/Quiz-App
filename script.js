document.addEventListener('DOMContentLoaded',()=>{
    //Grab Elements
    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices-list");
    const nextButton = document.getElementById("next-btn");
    const scoreDisplay = document.getElementById("score");
    const restartButton = document.getElementById("restart-btn");
    const startButton = document.getElementById("start-btn");
    
    async function getTrivia(){
        const apiURL = "https://the-trivia-api.com/v2/questions";
        try{
            const response = await fetch(apiURL);
            // console.log(response);
            if(!response.ok){
                throw new Error("Failed to Fetch");
            } 

            const data  = await response.json();

            return data;

        }catch(error){
            console.error("Error fetching question",error)
        }
    }

    console.log(getTrivia());

})