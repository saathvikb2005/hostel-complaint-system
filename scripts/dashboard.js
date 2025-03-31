document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    console.log("Retrieved User Role:", role);

    if (!token) {
        alert("⚠️ Unauthorized! Please log in.");
        window.location.href = "login.html";
        return;
    }

    if (role === "admin") {
        document.getElementById("adminPanel").style.display = "block";
        document.getElementById("studentPanel").style.display = "none";
    } else {
        document.getElementById("studentPanel").style.display = "block";
        document.getElementById("adminPanel").style.display = "none";
    }

    document.getElementById("logout").addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "home.html";
    });

    const toggleDarkModeBtn = document.getElementById("toggleDarkMode");
    const body = document.body;

    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        toggleDarkModeBtn.innerText = "☀️ Light Mode";
    }

    toggleDarkModeBtn.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            toggleDarkModeBtn.innerText = "☀️ Light Mode";
        } else {
            localStorage.setItem("darkMode", "disabled");
            toggleDarkModeBtn.innerText = "🌙 Dark Mode";
        }
    });

    // ✅ Fetch and display announcements
    await loadAnnouncements();
});

async function loadAnnouncements() {
    const announcementsList = document.getElementById("announcementsList");

    try {
        const response = await fetch("http://localhost:3001/api/announcements");
        const data = await response.json();

        announcementsList.innerHTML = "";
        if (data.length === 0) {
            announcementsList.innerHTML = "<li>No announcements yet.</li>";
            return;
        }

        data.forEach(announcement => {
            const li = document.createElement("li");
            li.textContent = `📢 ${announcement.title}: ${announcement.message}`;
            announcementsList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching announcements:", error);
        announcementsList.innerHTML = "<li>Failed to load announcements.</li>";
    }
}
