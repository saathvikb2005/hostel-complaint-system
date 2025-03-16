

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        alert("⚠️ Unauthorized! Please log in.");
        window.location.href = "login.html"; // Redirect to login page
        return;
    }

    // Display user role
    document.getElementById("userRole").innerHTML = "";

    // Show student or admin panel based on role
    if (role === "admin") {
        document.getElementById("adminPanel").style.display = "block";
        document.getElementById("studentPanel").style.display = "none";
    } else {
        document.getElementById("studentPanel").style.display = "block";
        document.getElementById("adminPanel").style.display = "none";
    }

    // Logout function - Clears session and redirects to home.html
    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        // alert("✅ Logged out successfully!");
        window.location.href = "home.html"; // Redirect to home page
    });
});
