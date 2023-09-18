document.addEventListener("DOMContentLoaded", function () {
    const passwordForm = document.getElementById("password-form");
    const passwordList = document.getElementById("password-list");
    const addButton = document.getElementById("add-password");
    const passwordInput = document.getElementById("password");
    const showPasswordCheckbox = document.getElementById("show-password");

    // Load passwords from localStorage
    const savedPasswords = JSON.parse(localStorage.getItem("passwords")) || [];

    // Function to display passwords
    function displayPasswords() {
        passwordList.innerHTML = "";
        savedPasswords.forEach((password, index) => {
            const passwordItem = document.createElement("div");
            passwordItem.classList.add("password-item");
            passwordItem.innerHTML = `
                <label style="margin-top:20px;"><b>Website:</b></label> ${password.website}<br>
                <label><b>Username:</b></label> ${password.username}<br>
                <label><b>Password:</b></label> <span id="password-${index}">${password.password}</span><br>
                <button class="show-password-button" style="margin-top:10px;" data-index="${index}">Hide Password</button>
                <button class="delete-password-button" data-index="${index}">Delete</button>

                <div class="long-line"></div>
            `;
            passwordList.appendChild(passwordItem);

            // Add event listener to show password button
            const showPasswordButton = passwordItem.querySelector(`[data-index="${index}"]`);
            showPasswordButton.addEventListener("click", function () {
                const passwordElement = document.getElementById(`password-${index}`);
                if (passwordElement.textContent === password.password) {
                    passwordElement.textContent = "********";
                } else {
                    passwordElement.textContent = password.password;
                }

                if (passwordElement.classList.contains("hidden-password")) {
                    passwordElement.classList.remove("hidden-password");
                    showPasswordButton.textContent = "Hide Password";
                } else {
                    passwordElement.classList.add("hidden-password");
                    showPasswordButton.textContent = "Show Password";
                }
            });

             // Add event listener to delete password button
            const deletePasswordButton = passwordItem.querySelector(`.delete-password-button`);
            deletePasswordButton.addEventListener("click", function () {
            savedPasswords.splice(index, 1);
            localStorage.setItem("passwords", JSON.stringify(savedPasswords));
                 displayPasswords();
            });

        });
    }

    // Initial display of saved passwords
    displayPasswords();

    addButton.addEventListener("click", function () {
        const website = document.getElementById("website").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Create a new password object
        const newPassword = {
            website,
            username,
            password
        };

        // Add the password to the savedPasswords array
        savedPasswords.push(newPassword);

        // Save passwords to localStorage
        localStorage.setItem("passwords", JSON.stringify(savedPasswords));

        // Display updated passwords
        displayPasswords();

        // Clear the form inputs
        passwordForm.reset();
    });
});
