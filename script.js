// ✅ Final JavaScript Code (Fixed for new API structure and circle fill)
document.addEventListener("DOMContentLoaded", function () {

    const searchButton = document.getElementById("search-button");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");

    function validateUsername(username) {
        if (username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]+$/;
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("Invalid username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {
        const url = `https://leetcode-api-faisalshohag.vercel.app/${username}`;

        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            const data = await fetch(url).then(res => res.json());
            console.log("logging data:", data);

            displayUserData(data);

        } catch (error) {
            console.error(error);
            statsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
        } finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function updateProgress(solved, total, label, circle) {
        const progressDegree = (solved / total) * 100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    function displayUserData(data) {
        const totalEasy = data.totalEasy || 800;
        const totalMedium = data.totalMedium || 1500;
        const totalHard = data.totalHard || 600;

        updateProgress(data.easySolved, totalEasy, easyLabel, easyProgressCircle);
        updateProgress(data.mediumSolved, totalMedium, mediumLabel, mediumProgressCircle);
        updateProgress(data.hardSolved, totalHard, hardLabel, hardProgressCircle);
    }

    searchButton.addEventListener('click', function () {
        const username = usernameInput.value.trim();
        console.log("Logging username:", username);
        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    });
});
