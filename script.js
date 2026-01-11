// SIMULATED DATA
let students = [
    { id: "C-24-21444", pass: "iscc123", name: "MARVIN P. BAGLIG", course: "BSIT", role: "STUDENT" }
];

// 1. LOGIN SYSTEM
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('user-id').value;
    const pass = document.getElementById('user-pass').value;

    if(id === "admin" && pass === "admin123") {
        enterSystem("ADMIN", { name: "ICT ADMIN", role: "Registrar's Office" });
    } else {
        const student = students.find(s => s.id === id && s.pass === pass);
        if(student) {
            enterSystem("STUDENT", student);
        } else {
            alert("Mali ang ID o Password! (Student Password: iscc123)");
        }
    }
});

function enterSystem(role, user) {
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

// 2. TAB NAVIGATION
function navTo(tabId, el) {
    document.querySelectorAll('.iscc-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.iscc-nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    if(el) el.classList.add('active');
    document.getElementById('nav-indicator').innerText = tabId.toUpperCase().replace('-', ' ');
}

// 3. ADMIN: ADD STUDENT
document.getElementById('enrollment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const newStudent = {
        name: document.getElementById('new-name').value.toUpperCase(),
        id: document.getElementById('new-id').value,
        course: document.getElementById('new-course').value.toUpperCase(),
        pass: document.getElementById('new-pass').value,
        role: "STUDENT"
    };

    students.push(newStudent);
    alert("SUCCESS! Student Enrolled Digitaly. No more queues!");
    this.reset();
    renderMasterlist();
});

function renderMasterlist() {
    const list = document.getElementById('masterlist-body');
    list.innerHTML = students.map(s => `
        <tr><td>${s.id}</td><td>${s.name}</td><td>${s.course}</td><td><span style="color:green; font-weight:bold;">ENROLLED</span></td></tr>
    `).join('');
}