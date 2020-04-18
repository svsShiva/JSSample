// var base_url = "https://my-json-server.typicode.com/svsShiva/api";

// Get references of email and password ( using a built‐in method for the document object)
var emailInput = document.getElementById("inputEmail");
var passwordInput = document.getElementById("inputPassword");


// Adding keyup event listener for validating email and password using addeventlistener
emailInput.addEventListener("keyup", ValidateEmail);
passwordInput.addEventListener("keyup", ValidatePassword);

// Global variables to check if email and password are valid
var isEmailValid = false;
var isPasswordValid = false;

// Navigates to home page on successful login (Form validations - email, password)
function Login() { 
    location.href = "home.html"
}

// Enables login button if both email and password are valid
function ValidateLogin() {
    //  check if both email and password are valid(using if statement with logical AND in condition)
    if (isEmailValid && isPasswordValid) {
        document.getElementById('loginButton').disabled = false;
    }
}

// Validate if email is valid
function ValidateEmail(event) {
    // Get the email using event target property
    var email = event.target.value;

    // Regex to validate email
    var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isEmailValid = emailRegex.test(email)

    // Show invalid email alert if email is not validate
    InputError("email", isEmailValid);

    ValidateLogin();
}


// Validate if password is valid
function ValidatePassword(event) {
    // Get the password using event target property
    var password = event.target.value;

    // Regex to validate password
    var passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    isPasswordValid = passwordRegex.test(password);

    // Show invalid password alert if password is not validate
    InputError("password", isPasswordValid);
    ValidateLogin();
}

// Promt alerts for invalid email/password 
function InputError(input, isError) {
    var x;

    // Get either email alert element or password alert based on input paramater. (if - else if)
    if (input == "email") {
        // Get email invalid email alert using getElementbyId
        x = document.getElementById("emailError");
    }
    else if (input == "password") {
        // Get email invalid password alert using getElementbyId
        x = document.getElementById("passwordError");
    }

    // show/ hide Invalid email and password alerts (using Logical NOT)
    if (!isError) {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}