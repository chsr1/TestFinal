                                                                                                                                                                                                                                                                                                                                                    api
                                                                                                                                                                                                                                                                                                                                                    const API_URL = "https://your-vercel-app.vercel.app/api/students";

async function loadStudents() {
    const response = await fetch(API_URL);
    const students = await response.json();

    const table = document.getElementById("studentTable");

    table.innerHTML = students.map(student => `
        <tr>
            <td>${student.rollNo}</td>
            <td>${student.name}</td>
            <td>${student.grade}</td>
            <td>
                <button onclick="deleteStudent('${student._id}')">Delete</button>
            </td>
        </tr>
    `).join("");
}

document.getElementById("studentForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const student = {
        rollNo: document.getElementById("rollNo").value,
        name: document.getElementById("name").value,
        grade: document.getElementById("grade").value
    };

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
    });

    loadStudents();
});

async function deleteStudent(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadStudents();
}

loadStudents();