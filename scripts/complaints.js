document.addEventListener("DOMContentLoaded", function () {
    let complaintTableBody = document.getElementById("complaintTableBody");
    let userRole = localStorage.getItem("userRole")?.toLowerCase();
    let loggedInUserId = localStorage.getItem("userId");

    console.log("User Role:", userRole, "User ID:", loggedInUserId); // Debugging

    loadComplaints();

    function loadComplaints() {
        fetch("http://localhost:3001/api/complaints")
            .then(response => response.json())
            .then(complaints => {
                console.log("Complaints received:", complaints); // Debugging log
                displayComplaints(complaints);
            })
            .catch(error => {
                console.error("API error:", error);
            });
    }

    function displayComplaints(complaints) {
        complaintTableBody.innerHTML = ""; // Clear table first

        if (complaints.length === 0) {
            complaintTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">No complaints found</td></tr>`;
            return;
        }

        complaints.forEach(complaint => {
            if (userRole === "user" && complaint.userId != loggedInUserId) {
                return; // Users can only see their own complaints
            }

            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${complaint.id}</td>
                <td>${complaint.title}</td>
                <td>${complaint.description}</td>
                <td>${complaint.category}</td>
                <td>${complaint.roomNumber}</td>
                <td>${complaint.status}</td>
                <td id="actions-${complaint.id}"></td>
            `;

            let actionsCell = row.querySelector(`#actions-${complaint.id}`);

            if (userRole === "admin") {
                addResolveDeleteButtons(actionsCell, complaint.id, false);
            } else if (userRole === "user") {
                addResolveDeleteButtons(actionsCell, complaint.id, true);
            }

            complaintTableBody.appendChild(row);
        });
    }

    function addResolveDeleteButtons(actionsCell, complaintId, disable) {
        let resolveBtn = document.createElement("button");
        resolveBtn.textContent = "Resolve";
        resolveBtn.className = "action-btn resolve-btn";
        resolveBtn.disabled = disable;
        resolveBtn.onclick = function () {
            if (!disable) updateComplaintStatus(complaintId, "Resolved");
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "action-btn delete-btn";
        deleteBtn.disabled = disable;
        deleteBtn.onclick = function () {
            if (!disable) deleteComplaint(complaintId);
        };

        actionsCell.appendChild(resolveBtn);
        actionsCell.appendChild(deleteBtn);
    }

    function updateComplaintStatus(complaintId, newStatus) {
        fetch(`http://localhost:3001/api/complaints/resolve/${complaintId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            loadComplaints();
        })
        .catch(error => console.error("Error:", error));
    }

    function deleteComplaint(complaintId) {
        fetch(`http://localhost:3001/api/complaints/delete/${complaintId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            loadComplaints();
        })
        .catch(error => console.error("Error:", error));
    }
});
