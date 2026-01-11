// 1. DATABASE LOGIC: Kukunin ang data sa browser memory para hindi nawawala
let students = JSON.parse(localStorage.getItem('iscc_portal_db')) || [
    { id: "C-24-21444", pass: "iscc123", name: "MARVIN P. BAGLIG", course: "BSIT", role: "STUDENT" }
];

// Function para i-save ang updated list sa memory
function saveToLocal() {
    localStorage.setItem('iscc_portal_db', JSON.stringify(students));
}

// 2. LOGIN LOGIC
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const idInput = document.getElementById('user-id').value;
    const passInput = document.getElementById('user-pass').value;

    // Admin Login
    if(idInput === "admin" && passInput === "admin123") {
        enterPortal("ADMIN", { name: "SYSTEM ADMIN", role: "Registrar's Office" });
        return;
    }

    // Student Login (Dito iche-check ang in-enroll mong students)
    const foundStudent = students.find(s => s.id === idInput && s.pass === passInput);
    
    if(foundStudent) {
        enterPortal("STUDENT", foundStudent);
    } else {
        alert("Invalid ID Number or Password! Pakicheck kung na-enroll na ang ID sa Admin panel.");
    }
});

function enterPortal(role, user) {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('portal-main').style.display = 'flex';
    
    document.getElementById('side-name').innerText = user.name;
    document.getElementById('side-role').innerText = user.role || user.course;
    document.getElementById('side-avatar').innerText = user.name.substring(0, 2);

    if(role === "ADMIN") {
        document.getElementById('admin-menu').style.display = 'block';
        document.getElementById('student-menu').style.display = 'none';
        renderMasterlist();
        navTo('admin-enroll', document.querySelector('#admin-menu .iscc-nav-item'));
    } else {
        document.getElementById('admin-menu').style.display = 'none';
        document.getElementById('student-menu').style.display = 'block';
        navTo('dash', document.querySelector('.iscc-nav-item'));
    }
}

// 3. NAVIGATION LOGIC
function navTo(tabId, el) {
    document.querySelectorAll('.iscc-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.iscc-nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    if(el) el.classList.add('active');
    document.getElementById('nav-indicator').innerText = tabId.toUpperCase().replace('-', ' ');
}

// 4. ADMIN: ENROLLMENT LOGIC (Saving to LocalStorage)
document.getElementById('enrollment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newStudent = {
        name: document.getElementById('new-name').value.toUpperCase(),
        id: document.getElementById('new-id').value,
        course: document.getElementById('new-course').value.toUpperCase(),
        pass: document.getElementById('new-pass').value,
        role: "STUDENT"
    };

    // I-check kung existing na ang ID
    if(students.find(s => s.id === newStudent.id)) {
        alert("Error: Ang ID na ito ay enrolled na!");
        return;
    }

    // I-add sa array at i-save sa browser memory
    students.push(newStudent);
    saveToLocal(); 

    alert("SUCCESS! Enrolled na si " + newStudent.name + ". Pwede na siyang mag-login.");
    this.reset();
    renderMasterlist();
});

// Function para ipakita ang listahan sa Admin Records
function renderMasterlist() {
    const listBody = document.getElementById('masterlist-body');
    if(!listBody) return;
    
    listBody.innerHTML = "";
    students.forEach(s => {
        listBody.innerHTML += `
            <tr>
                <td>${s.id}</td>
                <td>${s.name}</td>
                <td>${s.course}</td>
                <td><span style="color: green; font-weight: bold;">ACTIVE</span></td>
            </tr>
        `;
    });
}
