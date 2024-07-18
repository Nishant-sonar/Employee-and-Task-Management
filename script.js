let employees = [];
let tasks = [];
let employeeIdCounter = 1;

function addEmployee() {
    const name = document.getElementById('employeeName').value;
    const role = document.getElementById('employeeRole').value;
    if (name && role) {
        const employee = { id: employeeIdCounter++, name, role };
        employees.push(employee);
        updateEmployeeTable();
        updateEmployeeDropdown();
        updateEmployeeInfoDropdown();
        clearEmployeeInputs();
    }
}

function updateEmployee(id) {
    const employee = employees.find(e => e.id === id);
    if (employee) {
        document.getElementById('updateEmployeeId').value = employee.id;
        document.getElementById('updateEmployeeName').value = employee.name;
        document.getElementById('updateEmployeeRole').value = employee.role;

        const updateEmployeeModal = new bootstrap.Modal(document.getElementById('updateEmployeeModal'));
        updateEmployeeModal.show();
    }
}

function saveUpdatedEmployee() {
    const id = parseInt(document.getElementById('updateEmployeeId').value);
    const newName = document.getElementById('updateEmployeeName').value;
    const newRole = document.getElementById('updateEmployeeRole').value;

    if (newName && newRole) {
        const employee = employees.find(e => e.id === id);
        if (employee) {
            employee.name = newName;
            employee.role = newRole;
            updateEmployeeTable();
            updateEmployeeDropdown();
            updateEmployeeInfoDropdown();

            const updateEmployeeModal = bootstrap.Modal.getInstance(document.getElementById('updateEmployeeModal'));
            updateEmployeeModal.hide();
        }
    }
}

function deleteEmployee(id) {
    employees = employees.filter(e => e.id !== id);
    updateEmployeeTable();
    updateEmployeeDropdown();
    updateEmployeeInfoDropdown();
}

function updateEmployeeTable() {
    const tableBody = document.querySelector('#employeeTable tbody');
    tableBody.innerHTML = '';
    employees.forEach(employee => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.role}</td>
            <td>
                <button onclick="updateEmployee(${employee.id})" class="btn btn-sm btn-warning">Update</button>
                <button onclick="deleteEmployee(${employee.id})" class="btn btn-sm btn-danger">Delete</button>
            </td>
        `;
    });
}

function updateEmployeeDropdown() {
    const dropdown = document.getElementById('assignedTo');
    dropdown.innerHTML = '';
    employees.forEach(employee => {
        const option = document.createElement('option');
        option.value = employee.id;
        option.textContent = employee.name;
        dropdown.appendChild(option);
    });
}

function clearEmployeeInputs() {
    document.getElementById('employeeName').value = '';
    document.getElementById('employeeRole').value = '';
}

function addTask() {
    const description = document.getElementById('taskDescription').value;
    const assignedTo = document.getElementById('assignedTo').value;
    const started = document.getElementById('taskStarted').value;
    const ended = document.getElementById('taskEnded').value;
    const priority = document.getElementById('taskPriority').value;

    if (description && assignedTo && started && ended && priority) {
        const task = { description, assignedTo, started, ended, priority };
        tasks.push(task);
        updateTaskTable();
        clearTaskInputs();
    }
}

function updateTask(index) {
    const task = tasks[index];
    if (task) {
        document.getElementById('updateTaskIndex').value = index;
        document.getElementById('updateTaskDescription').value = task.description;
        document.getElementById('updateTaskAssignedTo').value = task.assignedTo;
        document.getElementById('updateTaskStarted').value = task.started;
        document.getElementById('updateTaskEnded').value = task.ended;
        document.getElementById('updateTaskPriority').value = task.priority;

        const assignedToDropdown = document.getElementById('updateTaskAssignedTo');
        assignedToDropdown.innerHTML = '';
        employees.forEach(employee => {
            const option = document.createElement('option');
            option.value = employee.id;
            option.textContent = employee.name;
            assignedToDropdown.appendChild(option);
        });

        const updateTaskModal = new bootstrap.Modal(document.getElementById('updateTaskModal'));
        updateTaskModal.show();
    }
}

function saveUpdatedTask() {
    const index = parseInt(document.getElementById('updateTaskIndex').value);
    const newDescription = document.getElementById('updateTaskDescription').value;
    const newAssignedTo = document.getElementById('updateTaskAssignedTo').value;
    const newStarted = document.getElementById('updateTaskStarted').value;
    const newEnded = document.getElementById('updateTaskEnded').value;
    const newPriority = document.getElementById('updateTaskPriority').value;

    if (newDescription && newAssignedTo && newStarted && newEnded && newPriority) {
        tasks[index] = {
            description: newDescription,
            assignedTo: newAssignedTo,
            started: newStarted,
            ended: newEnded,
            priority: newPriority
        };
        updateTaskTable();

        const updateTaskModal = bootstrap.Modal.getInstance(document.getElementById('updateTaskModal'));
        updateTaskModal.hide();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskTable();
}

function updateTaskTable() {
    const tableBody = document.querySelector('#taskTable tbody');
    tableBody.innerHTML = '';
    tasks.forEach((task, index) => {
        const row = tableBody.insertRow();
        const assignedEmployee = employees.find(e => e.id === parseInt(task.assignedTo));
        row.innerHTML = `
            <td>${task.description}</td>
            <td>${assignedEmployee ? assignedEmployee.name : 'Unknown'}</td>
            <td>${task.started}</td>
            <td>${task.ended}</td>
            <td>${task.priority}</td>
            <td>
                <button onclick="updateTask(${index})" class="btn btn-sm btn-warning">Update</button>
                <button onclick="deleteTask(${index})" class="btn btn-sm btn-danger">Delete</button>
            </td>
        `;
    });
}

function clearTaskInputs() {
    document.getElementById('taskDescription').value = '';
    document.getElementById('assignedTo').value = '';
    document.getElementById('taskStarted').value = '';
    document.getElementById('taskEnded').value = '';
    document.getElementById('taskPriority').value = 'High';
}

function updateEmployeeInfoDropdown() {
    const dropdown = document.getElementById('employeeInfoSelect');
    dropdown.innerHTML = '<option value="">Select an employee</option>';
    employees.forEach(employee => {
        const option = document.createElement('option');
        option.value = employee.id;
        option.textContent = employee.name;
        dropdown.appendChild(option);
    });
}

function showEmployeeInfo() {
    const employeeId = document.getElementById('employeeInfoSelect').value;
    const infoContent = document.getElementById('employeeInfoContent');

    if (employeeId) {
        const employee = employees.find(e => e.id === parseInt(employeeId));
        const assignedTasks = tasks.filter(t => t.assignedTo === employeeId);

        let html = `<h3>${employee.name}</h3>`;
        html += `<p><strong>Role:</strong> ${employee.role}</p>`;
        html += `<p><strong>Assigned Tasks:</strong></p>`;

        if (assignedTasks.length > 0) {
            html += '<ul>';
            assignedTasks.forEach(task => {
                html += `<li>${task.description} (Priority: ${task.priority})</li>`;
            });
            html += '</ul>';
        } else {
            html += '<p>No tasks assigned.</p>';
        }

        infoContent.innerHTML = html;
    } else {
        infoContent.innerHTML = '';
    }
}

function addTask() {
    const description = document.getElementById('taskDescription').value;
    const assignedTo = document.getElementById('assignedTo').value;
    const started = document.getElementById('taskStarted').value;
    const ended = document.getElementById('taskEnded').value;
    const priority = document.getElementById('taskPriority').value;

    if (description && assignedTo && started && ended && priority) {
        const task = { description, assignedTo, started, ended, priority };
        tasks.push(task);
        updateTaskTable();
        clearTaskInputs();
        saveTasks(); // Save tasks to local storage
    }
}

function updateTaskTable() {
    const tableBody = document.querySelector('#taskTable tbody');
    tableBody.innerHTML = '';
    tasks.forEach((task, index) => {
        const row = tableBody.insertRow();
        const assignedEmployee = employees.find(e => e.id === parseInt(task.assignedTo));
        row.innerHTML = `
            <td>${task.description}</td>
            <td>${assignedEmployee ? assignedEmployee.name : 'Unknown'}</td>
            <td>${task.started}</td>
            <td>${task.ended}</td>
            <td>${task.priority}</td>
            <td>
                <button onclick="updateTask(${index})" class="btn btn-sm btn-warning">Update</button>
                <button onclick="deleteTask(${index})" class="btn btn-sm btn-danger">Delete</button>
            </td>
        `;
    });
}

function clearTaskInputs() {
    document.getElementById('taskDescription').value = '';
    document.getElementById('assignedTo').value = '';
    document.getElementById('taskStarted').value = '';
    document.getElementById('taskEnded').value = '';
    document.getElementById('taskPriority').value = 'High';
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        updateTaskTable();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadEmployees();
    loadTasks();
 
});
function updateEmployeeTable() {
    const tableBody = document.querySelector('#employeeTable tbody');
    tableBody.innerHTML = '';
    employees.forEach(employee => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.role || 'Not specified'}</td>
            <td>${employee.email || 'N/A'}</td>
            <td>${employee.phone || 'N/A'}</td>
            <td>
                <button onclick="updateEmployee(${employee.id})" class="btn btn-sm btn-warning">Update</button>
                <button onclick="deleteEmployee(${employee.id})" class="btn btn-sm btn-danger">Delete</button>
            </td>
        `;
    });
}


function fetchEmployees() {
    fetch("https://petstore-demo.apidog.com/pet/findByStatus?status")
        .then((response) => response.json())
        .then((data) => {
            employees = data.map(employee => ({
                id: employee.id,
                name: employee.first_name + ' ' + employee.last_name,
                role: 'Not specified',
                email: employee.email,
                phone: employee.phone
            }));
            employeeIdCounter = Math.max(...employees.map(e => e.id)) + 1;
            updateEmployeeTable();
            updateEmployeeDropdown();
            updateEmployeeInfoDropdown();
            saveEmployees();
        })
        .catch(error => console.error('Error fetching employees:', error));
}

function addEmployee() {
    const name = document.getElementById('employeeName').value;
    const role = document.getElementById('employeeRole').value;
    if (name && role) {
        const employee = { id: employeeIdCounter++, name, role };
        employees.push(employee);
        updateEmployeeTable();
        updateEmployeeDropdown();
        updateEmployeeInfoDropdown();
        clearEmployeeInputs();
        saveEmployees();
    }
}


function updateEmployeeTable() {
    const tableBody = document.querySelector('#employeeTable tbody');
    tableBody.innerHTML = '';
    employees.forEach(employee => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.role || 'Not specified'}</td>
            <td>${employee.email || 'N/A'}</td>
            <td>${employee.phone || 'N/A'}</td>
            <td>
                <button onclick="updateEmployee(${employee.id})" class="btn btn-sm btn-warning">Update</button>
                <button onclick="deleteEmployee(${employee.id})" class="btn btn-sm btn-danger">Delete</button>
            </td>
        `;
    });
}


function saveEmployees() {
    localStorage.setItem('employees', JSON.stringify(employees));
}


function loadEmployees() {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
        employees = JSON.parse(savedEmployees);
        employeeIdCounter = Math.max(...employees.map(e => e.id)) + 1;
        updateEmployeeTable();
        updateEmployeeDropdown();
        updateEmployeeInfoDropdown();
    } else {
        fetchEmployees();
    }
}



document.addEventListener('DOMContentLoaded', () => {
    loadEmployees();
});

updateEmployeeInfoDropdown();

function updateEmployeeInfoDropdown() {
    const dropdown = document.getElementById('employeeInfoSelect');
    dropdown.innerHTML = '<option value="">Select an employee</option>';
    employees.forEach(employee => {
        const option = document.createElement('option');
        option.value = employee.id;
        option.textContent = employee.name;
        dropdown.appendChild(option);
    });
}

function showEmployeeInfo() {
    const employeeId = document.getElementById('employeeInfoSelect').value;
    const infoContent = document.getElementById('employeeInfoContent');

    if (employeeId) {
        const employee = employees.find(e => e.id === parseInt(employeeId));
        if (employee) {
            const assignedTasks = tasks.filter(t => t.assignedTo === employeeId);

            let html = `<h3>${employee.name}</h3>`;
            html += `<p><strong>Role:</strong> ${employee.role || 'Not specified'}</p>`;
            html += `<p><strong>Email:</strong> ${employee.email || 'N/A'}</p>`;
            html += `<p><strong>Phone:</strong> ${employee.phone || 'N/A'}</p>`;
            html += `<p><strong>Assigned Tasks:</strong></p>`;

            if (assignedTasks.length > 0) {
                html += '<ul>';
                assignedTasks.forEach(task => {
                    html += `<li>${task.description} (Priority: ${task.priority})</li>`;
                });
                html += '</ul>';
            } else {
                html += '<p>No tasks assigned.</p>';
            }

            infoContent.innerHTML = html;
        } else {
            infoContent.innerHTML = '<p>Employee not found.</p>';
        }
    } else {
        infoContent.innerHTML = '';
    }
}

document.getElementById('employeeInfoSelect').addEventListener('change', showEmployeeInfo);

document.addEventListener('DOMContentLoaded', () => {
    loadEmployees();
    loadTasks();
    updateEmployeeInfoDropdown();
});
