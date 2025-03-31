document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3001/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Login failed:", data.message);
            alert(`Login failed: ${data.message}`);
            return;
        }

        // ✅ Store token and role correctly
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id); 
        localStorage.setItem("role", data.user.role); // 🔹 Use "role" instead of "userRole"

        console.log("User ID stored:", data.user.id); 
        console.log("User Role stored:", data.user.role); // Debugging log

        window.location.href = "dashboard.html"; // Redirect to dashboard
    } catch (error) {
        console.error("Login request error:", error);
        alert("Login request failed.");
    }
});
