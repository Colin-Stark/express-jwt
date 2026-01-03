// Pure JavaScript for JWT Auth app with accessibility and UX considerations

const BASE_URL = 'https://express-jwt-ten.vercel.app';

document.addEventListener('DOMContentLoaded', function () {
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register form handling
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Protected page handling
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
        loadProtectedContent();
    }

    // Real-time validation
    setupValidation();
});

function setupValidation() {
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
}

function validateField(event) {
    const field = event.target;
    const errorElement = document.getElementById(field.id + 'Error');
    let isValid = true;
    let message = '';

    if (!field.value.trim()) {
        isValid = false;
        message = `${field.previousElementSibling.textContent} is required.`;
    } else if (field.type === 'password' && field.value.length < 6) {
        isValid = false;
        message = 'Password must be at least 6 characters long.';
    }

    errorElement.textContent = message;
    field.setAttribute('aria-invalid', !isValid);
    return isValid;
}

function clearError(event) {
    const field = event.target;
    const errorElement = document.getElementById(field.id + 'Error');
    if (errorElement.textContent) {
        errorElement.textContent = '';
        field.setAttribute('aria-invalid', 'false');
    }
}

async function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validate all fields
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });

    if (!isValid) return;

    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        const messageDiv = document.getElementById('message');

        if (response.ok) {
            localStorage.setItem('token', result.token);
            messageDiv.className = 'message success';
            messageDiv.textContent = 'Login successful! Redirecting...';
            setTimeout(() => {
                window.location.href = 'protected.html';
            }, 1000);
        } else {
            messageDiv.className = 'message error';
            messageDiv.textContent = result.message || 'Login failed.';
        }
    } catch (error) {
        console.error('Login error:', error);
        const messageDiv = document.getElementById('message');
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Network error. Please try again.';
    }
}

async function handleRegister(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validate all fields
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });

    if (!isValid) return;

    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        const messageDiv = document.getElementById('regMessage');

        if (response.ok) {
            messageDiv.className = 'message success';
            messageDiv.textContent = 'Registration successful! You can now log in.';
            form.reset();
        } else {
            messageDiv.className = 'message error';
            messageDiv.textContent = result.message || 'Registration failed.';
        }
    } catch (error) {
        console.error('Register error:', error);
        const messageDiv = document.getElementById('regMessage');
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Network error. Please try again.';
    }
}

async function loadProtectedContent() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/protected`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const contentDiv = document.getElementById('protectedContent');
        const messageDiv = document.getElementById('protMessage');

        if (response.ok) {
            const data = await response.json();
            // Extract username from message: "Welcome username, you have accessed a protected route!"
            const username = data.message.split(' ')[1].replace(',', '');
            contentDiv.innerHTML = `<p>Hello, ${username}! This is protected content.</p>`;
        } else {
            messageDiv.className = 'message error';
            messageDiv.textContent = 'Access denied. Please log in again.';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    } catch (error) {
        console.error('Protected content error:', error);
        const messageDiv = document.getElementById('protMessage');
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Network error. Please try again.';
    }
}

function handleLogout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}

// Accessibility: Keyboard navigation enhancements
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && event.target.tagName === 'INPUT') {
        event.target.form.dispatchEvent(new Event('submit'));
    }
});