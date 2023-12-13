// Utility functions for managing authentication tokens using localStorage
function saveToken(token) {
    localStorage.setItem('authToken', token);
}

function getToken() {
    return localStorage.getItem('authToken');
}

function clearToken() {
    localStorage.removeItem('authToken');
}

// Base URL for API requests
const baseUrl = 'http://localhost:8080/https://qa2.sunbasedata.com';

// Function related to login.html
function login(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Extract login credentials from the form
    const loginId = event.target.elements.loginId.value;
    const password = event.target.elements.password.value;

    // Send a POST request to authenticate the user
    fetch(`${baseUrl}/sunbase/portal/api/assignment_auth.jsp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login_id: loginId, password: password })
    })
    .then(response => response.json())
    .then(data => {
        // Save the authentication token and redirect to customerList.html
        saveToken(data.access_token);
        window.location.href = 'customerList.html';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed!');
    });
}

// Functions related to customerList.html
function fetchCustomers() {
    // Retrieve authentication token
    const token = getToken();
    if (!token) return window.location.href = 'login.html';

    // Fetch customer data and display it in the table
    fetch(`${baseUrl}/sunbase/portal/api/assignment.jsp?cmd=get_customer_list`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => displayCustomers(data))
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to fetch customers');
    });
}

function displayCustomers(customers) {
    // Display customer data in an HTML table
    const customerListTable = document.getElementById('customerList');

    // Clear existing table
    customerListTable.innerHTML = '';

    // Create table rows for each customer
    customers.forEach(customer => {
        const row = customerListTable.insertRow();
        // Populate table cells with customer data
        row.insertCell(0).textContent = customer.first_name;
        row.insertCell(1).textContent = customer.last_name;
        row.insertCell(2).textContent = customer.address;
        row.insertCell(3).textContent = customer.city;
        row.insertCell(4).textContent = customer.state;
        row.insertCell(5).textContent = customer.email;
        row.insertCell(6).textContent = customer.phone;

        // Create buttons for update and delete actions
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Edit';
        updateButton.addEventListener('click', () => showUpdateCustomerForm(customer.uuid));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteCustomer(customer.uuid));

        // Add buttons to the action cell
        const actionCell = row.insertCell(7);
        actionCell.appendChild(updateButton);
        actionCell.appendChild(deleteButton);
    });
}

function deleteCustomer(uuid) {
    // Retrieve authentication token
    const token = getToken();
    if (!token) return window.location.href = 'login.html';

    // Send a POST request to delete the customer
    fetch(`${baseUrl}/sunbase/portal/api/assignment.jsp?cmd=delete&uuid=${uuid}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            cmd: 'delete',
            uuid: uuid
        })
    })
    .then(response => {
        if (response.status === 200) {
            alert('Successfully Deleted');
            // Refresh the customer list after deletion
            fetchCustomers();
        } else {
            alert('Error Deleting Customer');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to delete customer');
    });
}

function showUpdateCustomerForm(uuid) {
    // Redirect to the update customer form with the customer's UUID
    window.location.href = `updateCustomer.html?uuid=${uuid}`;
}

// Function related to updateCustomer.html
function updateCustomer(event) {
    // Retrieve authentication token
    const token = getToken();
    if (!token) return window.location.href = 'login.html';

    event.preventDefault();

    // Retrieve UUID from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get('uuid');

    // Extract updated customer data from the form
    const firstName = event.target.elements.firstName.value;
    const lastName = event.target.elements.lastName.value;
    const street = event.target.elements.street.value;
    const address = event.target.elements.address.value;
    const city = event.target.elements.city.value;
    const state = event.target.elements.state.value;
    const email = event.target.elements.email.value;
    const phone = event.target.elements.phone.value;

    // Send a POST request to update the customer data
    fetch(`${baseUrl}/sunbase/portal/api/assignment.jsp?cmd=update&uuid=${uuid}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            address: address,
            city: city,
            state: state,
            email: email,
            phone: phone,
            street: street
        })
    })
    .then(response => {
        if (response.status === 200) {
            alert('Successfully Updated');
            // Redirect to the customerList.html after updating
            window.location.href = 'customerList.html';
        } else {
            alert('Error Updating Customer');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to update customer');
    });
}

function showAddCustomerForm() {
    // Redirect to the add customer form
    window.location.href = 'addCustomer.html';
}

// Function related to addCustomer.html
function addCustomer(event) {
    // Retrieve authentication token
    const token = getToken();
    if (!token) return window.location.href = 'login.html';

    event.preventDefault();

    // Extract new customer data from the form
    const firstName = event.target.elements.firstName.value;
    const lastName = event.target.elements.lastName.value;
    const street = event.target.elements.street.value;
    const address = event.target.elements.address.value;
    const city = event.target.elements.city.value;
    const state = event.target.elements.state.value;
    const email = event.target.elements.email.value;
    const phone = event.target.elements.phone.value;

    // Send a POST request to create a new customer
    fetch(`${baseUrl}/sunbase/portal/api/assignment.jsp?cmd=create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            address: address,
            city: city,
            state: state,
            email: email,
            phone: phone,
            street: street
        })
    })
    .then(response => {
        if (response.status === 201) {
            alert('Successfully Created');
            // Redirect to the customerList.html after creating a new customer
            window.location.href = 'customerList.html';
        } else {
            alert('Error Creating Customer');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add customer');
    });
}

// Initialization code for each page
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.endsWith('login.html')) {
        // Initialize login page
    } else if (path.endsWith('customerList.html')) {
        // Fetch and display the list of customers
        fetchCustomers();
    } else if (path.endsWith('addCustomer.html')) {
        // Initialize add customer page
    }
});