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

        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.user.role);
        // console.log("userRole", data.user.role);
        // alert("Login successful!");
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } catch (error) {
        console.error("Login request error:", error);
        alert("Login request failed.");
    }
});
