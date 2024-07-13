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
        const newName = prompt("Enter new name:", employee.name);
        const newRole = prompt("Enter new role:", employee.role);
        if (newName && newRole) {
            employee.name = newName;
            employee.role = newRole;
            updateEmployeeTable();
            updateEmployeeDropdown();
            updateEmployeeInfoDropdown();
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
        const newDescription = prompt("Enter new description:", task.description);
        const newAssignedTo = prompt("Enter new assigned employee ID:", task.assignedTo);
        const newStarted = prompt("Enter new start date and time:", task.started);
        const newEnded = prompt("Enter new end date and time:", task.ended);
        const newPriority = prompt("Enter new priority (High, Medium, Low):", task.priority);

        if (newDescription && newAssignedTo && newStarted && newEnded && newPriority) {
            task.description = newDescription;
            task.assignedTo = newAssignedTo;
            task.started = newStarted;
            task.ended = newEnded;
            task.priority = newPriority;
            updateTaskTable();
        }
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


updateEmployeeInfoDropdown();
