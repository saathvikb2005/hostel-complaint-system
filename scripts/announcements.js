document.addEventListener("DOMContentLoaded", async () => {
    const role = localStorage.getItem("role");

    // Show admin controls if user is admin
    if (role === "admin") {
        document.getElementById("adminControls").style.display = "block";
    }

    // Load announcements
    await loadAnnouncements();

    // Add announcement
    document.getElementById("addAnnouncement").addEventListener("click", async () => {
        const title = document.getElementById("title").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!title || !message) {
            alert("⚠️ Please enter both title and message.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/api/announcements/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, message }),
            });

            const data = await response.json();
            alert(data.message);
            document.getElementById("title").value = "";
            document.getElementById("message").value = "";
            await loadAnnouncements(); // Reload announcements
        } catch (error) {
            console.error("Error adding announcement:", error);
        }
    });

    // Back to dashboard button
    document.getElementById("backToDashboard").addEventListener("click", () => {
        window.location.href = "dashboard.html";
    });
});

async function loadAnnouncements() {
    const announcementsList = document.getElementById("announcementsList");
    announcementsList.innerHTML = "<p>Loading announcements...</p>";

    try {
        const response = await fetch("http://localhost:3001/api/announcements");
        const announcements = await response.json();

        announcementsList.innerHTML = "";
        if (announcements.length === 0) {
            announcementsList.innerHTML = "<p>No announcements yet.</p>";
            return;
        }

        announcements.forEach((announcement) => {
            const div = document.createElement("div");
            div.className = "announcement";
            div.innerHTML = `
                <h3>${announcement.title}</h3>
                <p>${announcement.message}</p>
                <small>📅 Posted on: ${new Date(announcement.created_at).toLocaleString()}</small>
            `;

            // Delete button for admins
            if (localStorage.getItem("role") === "admin") {
                const deleteBtn = document.createElement("button");
                deleteBtn.innerText = "🗑️ Delete";
                deleteBtn.className = "delete-btn";
                deleteBtn.addEventListener("click", async () => {
                    if (confirm("Are you sure you want to delete this announcement?")) {
                        await deleteAnnouncement(announcement.id);
                    }
                });
                div.appendChild(deleteBtn);
            }

            announcementsList.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching announcements:", error);
        announcementsList.innerHTML = "<p>Failed to load announcements.</p>";
    }
}

async function deleteAnnouncement(id) {
    try {
        const response = await fetch(`http://localhost:3001/api/announcements/delete/${id}`, {
            method: "DELETE",
        });

        const data = await response.json();
        alert(data.message);
        await loadAnnouncements();
    } catch (error) {
        console.error("Error deleting announcement:", error);
    }
}
