let patients = JSON.parse(localStorage.getItem("patients")) || [];

let editingId = null;

const form = document.getElementById("patientForm");
const search = document.getElementById("search");
const table = document.getElementById("patientTable");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");


function savePatients() {
    localStorage.setItem("patients", JSON.stringify(patients));
}


function displayPatients(list = patients) {

    table.innerHTML = "";

    if (list.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7">
                    No patient records found
                </td>
            </tr>
        `;

        return;
    }

    list.forEach(patient => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${patient.patientId}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.gender}</td>
            <td>${patient.contact}</td>
            <td>${patient.condition}</td>

            <td>

                <button
                    class="action-btn edit"
                    onclick="editPatient('${patient.patientId}')">
                    Edit
                </button>

                <button
                    class="action-btn delete"
                    onclick="deletePatient('${patient.patientId}')">
                    Delete
                </button>

            </td>
        `;

        table.appendChild(row);
    });
}


function login() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const loginMessage =
        document.getElementById("loginMessage");

    if (username === "admin" && password === "admin123") {

        loginMessage.textContent =
            "Login successful.";

    } else {

        loginMessage.textContent =
            "Invalid username or password.";
    }
}


form.addEventListener("submit", function(event) {

    event.preventDefault();

    const patientId =
        document.getElementById("patientId").value.trim();

    const name =
        document.getElementById("name").value.trim();

    const age =
        document.getElementById("age").value.trim();

    const gender =
        document.getElementById("gender").value;

    const contact =
        document.getElementById("contact").value.trim();

    const condition =
        document.getElementById("condition").value.trim();


    if (
        !patientId ||
        !name ||
        !age ||
        !gender ||
        !contact ||
        !condition
    ) {

        message.textContent =
            "Please fill all fields.";

        return;
    }


    if (editingId !== null) {

        const index = patients.findIndex(
            patient => patient.patientId === editingId
        );

        if (index !== -1) {

            patients[index] = {
                patientId,
                name,
                age,
                gender,
                contact,
                condition
            };
        }

        editingId = null;

        submitBtn.textContent = "Add Patient";

        message.textContent =
            "Patient record updated successfully.";

    } else {

        const exists = patients.some(
            patient => patient.patientId === patientId
        );

        if (exists) {

            message.textContent =
                "Patient ID already exists.";

            return;
        }

        patients.push({
            patientId,
            name,
            age,
            gender,
            contact,
            condition
        });

        message.textContent =
            "Patient added successfully.";
    }


    savePatients();

    form.reset();

    displayPatients();
});


function deletePatient(patientId) {

    const confirmed = confirm(
        "Are you sure you want to delete this patient record?"
    );

    if (!confirmed) {
        return;
    }

    patients = patients.filter(
        patient => patient.patientId !== patientId
    );

    savePatients();

    displayPatients();

    message.textContent =
        "Patient record deleted successfully.";
}


function editPatient(patientId) {

    const patient = patients.find(
        patient => patient.patientId === patientId
    );

    if (!patient) {
        return;
    }

    document.getElementById("patientId").value =
        patient.patientId;

    document.getElementById("name").value =
        patient.name;

    document.getElementById("age").value =
        patient.age;

    document.getElementById("gender").value =
        patient.gender;

    document.getElementById("contact").value =
        patient.contact;

    document.getElementById("condition").value =
        patient.condition;

    editingId = patientId;

    submitBtn.textContent =
        "Update Patient";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


search.addEventListener("input", function() {

    const value =
        search.value.toLowerCase().trim();

    const filtered =
        patients.filter(patient =>
            patient.name.toLowerCase().includes(value) ||
            patient.patientId.toLowerCase().includes(value)
        );

    displayPatients(filtered);
});


displayPatients();