document.addEventListener("DOMContentLoaded", function() {
    let complaintBtn = document.getElementById("complaintBtn");

    // Check if user is signed in (Example: Checking localStorage)
    let isSignedIn = localStorage.getItem("userLoggedIn");

    if (isSignedIn) {
        complaintBtn.removeAttribute("disabled");
        complaintBtn.classList.remove("disabled");
        complaintBtn.addEventListener("click", function() {
            window.location.href = "complaint-form.html"; // Redirect to the complaint form
        });
    } else {
        complaintBtn.addEventListener("click", function() {
            alert("Please sign in to file a complaint.");
        });
    }
});
