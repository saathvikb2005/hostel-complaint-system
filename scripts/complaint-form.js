document.addEventListener("DOMContentLoaded", () => {
    const complaintForm = document.getElementById("complaintForm");

    if (!complaintForm) {
        console.error("❌ Error: Complaint form not found.");
        return;
    }

    complaintForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Collect values from the form
        let title = document.getElementById("title")?.value.trim();
        let description = document.getElementById("description")?.value.trim();
        let category = document.getElementById("category")?.value.trim();
        let roomNumber = document.getElementById("roomNumber")?.value.trim();

        // Validate the input values
        if (!title || !description) {
            alert("⚠️ Title and description are required.");
            return;
        }

        // Set default values if empty
        category = category || "General";
        roomNumber = roomNumber || "Unknown";

        // Get userId from localStorage (assuming it's stored after login)
        let userId = localStorage.getItem("userId");
        if (!userId) {
            alert("⚠️ User not logged in. Please log in first.");
            console.error("❌ Error: User ID not found in localStorage.");
            return;
        }

        // Create complaint object
        let complaintData = {
            userId,
            title,
            description,
            category,
            roomNumber,
            status: "Pending", // Default status
        };

        console.log("📩 Sending complaint data:", complaintData);

        try {
            // Send complaint to backend
            let response = await fetch("http://localhost:3001/api/complaints", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(complaintData)
            });

            let result = await response.json();
            console.log("📨 Response received:", result);

            if (response.ok) {
                alert("✅ Complaint Submitted Successfully!");
                window.location.href = "complaints.html"; // Redirect to complaints page
            } else {
                alert("❌ Error: " + (result.message || "Could not submit complaint."));
            }
        } catch (error) {
            console.error("❌ Error submitting complaint:", error);
            alert("⚠️ Failed to submit complaint. Try again later.");
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    // Load dark mode preference from localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        darkModeToggle.textContent = "☀️ Light Mode";
    }

    // Toggle Dark Mode
    darkModeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            darkModeToggle.textContent = "☀️ Light Mode";
        } else {
            localStorage.setItem("darkMode", "disabled");
            darkModeToggle.textContent = "🌙 Dark Mode";
        }
    });
});
