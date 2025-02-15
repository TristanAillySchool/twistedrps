document.addEventListener("DOMContentLoaded", () => {
    const themeCards = document.querySelectorAll(".theme-card");
    const playerBlock = document.getElementById("playerBlock");
    const computerBlock = document.getElementById("computerBlock");
    const battleZone = document.getElementById("fightAnimation");
    const resultDisplay = document.getElementById("battleResult");
    let wins = 0, losses = 0, ties = 0;

    themeCards.forEach(card => {
        card.addEventListener("click", () => {
            document.body.className = card.dataset.theme;
        });
    });

    document.querySelectorAll(".choice").forEach(button => {
        button.addEventListener("click", () => {
            const playerChoice = button.getAttribute("data-choice");
            const computerChoice = getRandomChoice();
            const result = determineWinner(playerChoice, computerChoice);
            animateBattle(playerChoice, computerChoice, result);
            updateScore(result);
        });
    });

    document.getElementById("reset").addEventListener("click", () => {
        wins = 0;
        losses = 0;
        ties = 0;
        updateScore();
        resultDisplay.textContent = "Choose your move!";
    });

    function getRandomChoice() {
        const choices = ["rock", "paper", "scissors", "lightning", "lava", "wind", "earth", "ice", "fire", "water", "shadow"];
        return choices[Math.floor(Math.random() * choices.length)];
    }

    function determineWinner(player, computer) {
        const rules = {
            rock: ["scissors", "wind", "fire"],
            paper: ["rock", "lightning", "water"],
            scissors: ["paper", "wind", "shadow"],
            lightning: ["rock", "scissors", "ice"],
            lava: ["paper", "scissors", "earth"],
            wind: ["paper", "lava", "shadow"],
            earth: ["water", "fire", "lightning"],
            ice: ["fire", "rock", "shadow"],
            fire: ["wind", "earth", "paper"],
            water: ["fire", "lava", "scissors"],
            shadow: ["lightning", "rock", "earth"]
        };

        if (player === computer) return "tie";
        return rules[player]?.includes(computer) ? "win" : "lose";
    }

    function updateScore(result) {
        if (result === "win") wins++;
        if (result === "lose") losses++;
        if (result === "tie") ties++;
        document.getElementById("wins").textContent = wins;
        document.getElementById("losses").textContent = losses;
        document.getElementById("ties").textContent = ties;
    }

    function animateBattle(playerChoice, computerChoice, result) {
        playerBlock.textContent = getEmoji(playerChoice);
        computerBlock.textContent = getEmoji(computerChoice);
        playerBlock.classList.add("fight");
        computerBlock.classList.add("fight");

        setTimeout(() => {
            battleZone.innerHTML = "💨";
        }, 500);

        setTimeout(() => {
            battleZone.innerHTML = "⚔️";
        }, 1000);

        setTimeout(() => {
            battleZone.innerHTML = "";
            playerBlock.classList.remove("fight");
            computerBlock.classList.remove("fight");
            resultDisplay.textContent = getMessage(result);
        }, 1500);
    }

    function getEmoji(choice) {
        const emojis = {
            rock: "🪨", paper: "📄", scissors: "✂️",
            lightning: "⚡", lava: "🔥", wind: "💨",
            earth: "🌍", ice: "❄", fire: "🔥", water: "💧", shadow: "🕶"
        };
        return emojis[choice] || "❓";
    }

    function getMessage(result) {
        return result === "win" ? "You win! 🎉" : result === "lose" ? "You lose! 😞" : "It's a tie! 🤝";
    }
});
