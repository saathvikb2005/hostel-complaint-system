document.addEventListener("DOMContentLoaded", () => {
    const role = localStorage.getItem("role");
    const addContactBtn = document.getElementById("addContact");
    const contactList = document.getElementById("contactList");
    const backToDashboardBtn = document.getElementById("backToDashboard");

    // ✅ Fetch contacts from API
    async function fetchContacts() {
        try {
            const response = await fetch("http://localhost:3001/api/contacts");
            const contacts = await response.json();

            console.log("Contacts from API:", contacts); // Debugging

            contactList.innerHTML = ""; // Clear previous list

            contacts.forEach((contact) => {
                const contactItem = document.createElement("div");
                contactItem.classList.add("contact-item");
                contactItem.innerHTML = `
                    <p><strong>${contact.name}</strong></p>
                    <p>📞 ${contact.phone}</p>
                    <p>📧 ${contact.email}</p>
                `;

                if (role === "admin") {
                    contactItem.innerHTML += `
                        <button class="editContact" data-id="${contact.id}">✏️ Edit</button>
                        <button class="deleteContact" data-id="${contact.id}">❌ Delete</button>
                    `;
                }

                contactList.appendChild(contactItem);
            });

            // Add event listeners for admin actions
            if (role === "admin") {
                document.querySelectorAll(".editContact").forEach(button => {
                    button.addEventListener("click", (e) => {
                        editContact(e.target.dataset.id);
                    });
                });

                document.querySelectorAll(".deleteContact").forEach(button => {
                    button.addEventListener("click", (e) => {
                        deleteContact(e.target.dataset.id);
                    });
                });
            }
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    }

    // ✅ Add new contact (Admin only)
    async function addContact() {
        const name = prompt("Enter contact name:");
        const phone = prompt("Enter phone number:");
        const email = prompt("Enter email:");

        if (name && phone && email) {
            try {
                const response = await fetch("http://localhost:3001/api/contacts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, phone, email }),
                });

                if (response.ok) {
                    alert("Contact added successfully!");
                    fetchContacts();
                }
            } catch (error) {
                console.error("Error adding contact:", error);
            }
        }
    }

    // ✅ Edit contact (Admin only)
    async function editContact(id) {
        const newName = prompt("Enter new name:");
        const newPhone = prompt("Enter new phone:");
        const newEmail = prompt("Enter new email:");

        if (newName && newPhone && newEmail) {
            try {
                const response = await fetch(`http://localhost:3001/api/contacts/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: newName, phone: newPhone, email: newEmail }),
                });

                if (response.ok) {
                    alert("Contact updated successfully!");
                    fetchContacts();
                }
            } catch (error) {
                console.error("Error updating contact:", error);
            }
        }
    }

    // ✅ Delete contact (Admin only)
    async function deleteContact(id) {
        if (confirm("Are you sure you want to delete this contact?")) {
            try {
                const response = await fetch(`http://localhost:3001/api/contacts/${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    alert("Contact deleted successfully!");
                    fetchContacts();
                }
            } catch (error) {
                console.error("Error deleting contact:", error);
            }
        }
    }

    if (role === "admin") {
        addContactBtn.style.display = "block";
        addContactBtn.addEventListener("click", addContact);
    }

    if (backToDashboardBtn) {
        backToDashboardBtn.addEventListener("click", () => {
            window.location.href = "dashboard.html";
        });
    }

    // ✅ Load contacts on page load
    fetchContacts();
});
