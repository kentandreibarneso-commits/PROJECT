// Load users from localStorage or initialize empty object
        let users = JSON.parse(localStorage.getItem('users')) || {};

        // Function to show login form
        function showLogin() {
            document.getElementById('loginFormDiv').style.display = 'block';
            document.getElementById('registerFormDiv').style.display = 'none';
            document.getElementById('message').textContent = '';
        }

        // Function to show register form
        function showRegister() {
            document.getElementById('loginFormDiv').style.display = 'none';
            document.getElementById('registerFormDiv').style.display = 'block';
            document.getElementById('message').textContent = '';
        }

        // Login form handler
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            const messageDiv = document.getElementById('message');
            
            if (users[username] && users[username] === password) {
                // Hide auth and show portfolio
                document.getElementById('authContainer').style.display = 'none';
                document.getElementById('portfolio').style.display = 'block';
                document.body.style.backgroundColor = '#f0f0f0'; // Adjust for portfolio
            } else {
                messageDiv.textContent = 'Invalid username or password.';
                messageDiv.style.color = 'red';
            }
        });

        // Register form handler
        document.getElementById('registerForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('regUsername').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const messageDiv = document.getElementById('message');
            
            if (password !== confirmPassword) {
                messageDiv.textContent = 'Passwords do not match.';
                messageDiv.style.color = 'red';
                return;
            }
            if (users[username]) {
                messageDiv.textContent = 'Username already exists.';
                messageDiv.style.color = 'red';
                return;
            }
            if (username.trim() === '' || password.trim() === '') {
                messageDiv.textContent = 'Username and password cannot be empty.';
                messageDiv.style.color = 'red';
                return;
            }
            
            // Register user
            users[username] = password;
            localStorage.setItem('users', JSON.stringify(users));
            messageDiv.textContent = 'Registration successful! Please login.';
            messageDiv.style.color = 'green';
            showLogin(); // Switch to login after success
        });

        // Logout function
        function logout() {
            // Hide portfolio and show auth container
            document.getElementById('portfolio').style.display = 'none';
            document.getElementById('authContainer').style.display = 'block';
            document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; // Reset background
            // Optionally clear login form
            document.getElementById('loginUsername').value = '';
            document.getElementById('loginPassword').value = '';
            showLogin(); // Ensure login form is shown
        }