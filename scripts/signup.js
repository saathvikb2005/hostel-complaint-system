document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("signupForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        // Ensure these IDs match those in signup.html
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const role = document.getElementById("role").value; 

        if (!username || !email || !password) {
            alert("⚠️ All fields are required.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password, role }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                window.location.href = "index.html"; // Redirect to login page
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("❌ Signup Error:", error);
            alert("❌ Something went wrong. Please try again.");
        }
    });
});
