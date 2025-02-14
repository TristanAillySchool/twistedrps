document.addEventListener("DOMContentLoaded", () => {
    const choices = ["rock", "paper", "scissors"];
    const winsDisplay = document.getElementById("wins");
    const lossesDisplay = document.getElementById("losses");
    const tiesDisplay = document.getElementById("ties");
    const resultDisplay = document.getElementById("result");

    let wins = 0, losses = 0, ties = 0;

    document.querySelectorAll(".choice").forEach(button => {
        button.addEventListener("click", () => {
            const playerChoice = button.getAttribute("data-choice");
            const computerChoice = choices[Math.floor(Math.random() * choices.length)];
            const result = determineWinner(playerChoice, computerChoice);
            
            if (result === "win") wins++;
            if (result === "lose") losses++;
            if (result === "tie") ties++;

            updateScore();
            resultDisplay.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. ${resultMessage(result)}`;
        });
    });

    document.getElementById("reset").addEventListener("click", () => {
        wins = 0;
        losses = 0;
        ties = 0;
        updateScore();
        resultDisplay.textContent = "Make a choice!";
    });

    document.getElementById("themeToggle").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    function determineWinner(player, computer) {
        if (player === computer) return "tie";
        if (
            (player === "rock" && computer === "scissors") ||
            (player === "paper" && computer === "rock") ||
            (player === "scissors" && computer === "paper")
        ) {
            return "win";
        }
        return "lose";
    }

    function resultMessage(result) {
        if (result === "win") return "You win! 🎉";
        if (result === "lose") return "You lose! 😞";
        return "It's a tie! 🤝";
    }

    function updateScore() {
        winsDisplay.textContent = wins;
        lossesDisplay.textContent = losses;
        tiesDisplay.textContent = ties;
    }
});
