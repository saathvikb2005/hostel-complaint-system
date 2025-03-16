document.addEventListener("DOMContentLoaded", function () {
    const complaintTableBody = document.getElementById("adminComplaintTableBody");

    loadComplaints();

    function loadComplaints() {
        fetch("http://localhost:3001/api/complaints")
            .then(response => response.json())
            .then(complaints => {
                displayComplaints(complaints);
            })
            .catch(error => console.error("Error fetching complaints:", error));
    }

    function displayComplaints(complaints) {
        complaintTableBody.innerHTML = ""; // Clear previous data

        if (complaints.length === 0) {
            complaintTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">No complaints found</td></tr>`;
            return;
        }

        complaints.forEach(complaint => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${complaint.id}</td>
                <td>${complaint.title}</td>
                <td>${complaint.description}</td>
                <td>${complaint.category}</td>
                <td>${complaint.room_number}</td>
                <td>${complaint.status}</td>
                <td id="actions-${complaint.id}"></td>
            `;

            let actionsCell = row.querySelector(`#actions-${complaint.id}`);

            let resolveBtn = document.createElement("button");
            resolveBtn.textContent = "Resolve";
            resolveBtn.className = "action-btn resolve-btn";
            resolveBtn.onclick = () => updateComplaintStatus(complaint.id, "Resolved");

            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "action-btn delete-btn";
            deleteBtn.onclick = () => deleteComplaint(complaint.id);

            actionsCell.appendChild(resolveBtn);
            actionsCell.appendChild(deleteBtn);

            complaintTableBody.appendChild(row);
        });
    }

    function updateComplaintStatus(complaintId, newStatus) {
        fetch(`http://localhost:3001/api/complaints/resolve/${complaintId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Complaint marked as resolved!");
                loadComplaints();
            } else {
                alert("Error updating complaint status.");
            }
        })
        .catch(error => console.error("Error updating status:", error));
    }

    function deleteComplaint(complaintId) {
        if (!confirm("Are you sure you want to delete this complaint?")) return;

        fetch(`http://localhost:3001/api/complaints/delete/${complaintId}`, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Complaint deleted successfully!");
                loadComplaints();
            } else {
                alert("Error deleting complaint.");
            }
        })
        .catch(error => console.error("Error deleting complaint:", error));
    }
});
