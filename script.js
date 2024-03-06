document.getElementById('name').addEventListener('input', function () {
  var name = document.getElementById('name')
  var username = this.value;
  var errorElement = document.getElementById('nameErrorMessage');

  // Check if the input contains only characters (letters)
  if (!/^[a-zA-Z]+$/.test(username)) {
    errorElement.textContent = 'Name must contain only alphabetical characters.';
    return;
  }

  // Check the length of the name
  if (username.length < 3) {
    errorElement.textContent = 'Name must be at least 3 characters long.';
    name.classList.add("is-invalid");

  } else if (username.length > 35) {
    errorElement.textContent = 'Name cannot exceed 35 characters.';
    name.classList.add("is-invalid");

  } else {
    errorElement.textContent = ''; // Clear the error message if within the limits
    name.classList.remove("is-invalid");

  }
});


//for name

function validateName() {
  var nameInput = document.getElementById('name');
  var nameErrorMessage = document.getElementById('nameErrorMessage');

  if (nameInput.value.trim() === '') {
    // If the name is empty, display an error message
    nameErrorMessage.innerHTML = 'Name is required.';
  } else {
    // If the name is not empty, clear the error message
    nameErrorMessage.innerHTML = '';

    // Perform additional validation or submit the form as needed
    // For example, you can submit the form using nameForm.submit();
  }
}



//// this is for validating usernames/////////////////////////////////////////////////////////////////////////////

async function loadUsernames() {
  try {
    const response = await fetch('/usernames.json'); // Replace with your JSON file path
    const data = await response.json();
    return data.usernames;
  } catch (error) {
    console.error('Error loading usernames:', error);
    return [];
  }
}

let existingUsernames = [];

// Load the usernames when the page is loaded
document.addEventListener('DOMContentLoaded', async () => {
  existingUsernames = await loadUsernames();
});

document.getElementById('username').addEventListener('input', async function () {
  const usernameInput = document.getElementById('username');
  const availabilityMessage = document.getElementById('availabilityMessage');

  const username = usernameInput.value.trim();

  if (!username) {
    availabilityMessage.textContent = 'Please enter a username.';
    usernameInput.classList.add("is-invalid");

    return;
  }

  // Check if the username exists in the loaded data
  const isUsernameAvailable = !existingUsernames.includes(username);

  if (isUsernameAvailable) {
    availabilityMessage.textContent = 'Username is available!';
    availabilityMessage.className = 'text-success'
    usernameInput.classList.remove("is-invalid");

  } else {
    availabilityMessage.textContent = 'Username is not available. Please choose another.';
    availabilityMessage.className = 'text-danger';
    usernameInput.classList.add("is-invalid");

  }
})


// validate email address\

// emailValidation.js

document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('email');
  const emailValidationMessage = document.getElementById('emailValidationMessage');

  emailInput.addEventListener('input', validateEmail);

  function validateEmail() {
    const email = emailInput.value.trim();

    if (!email) {
      displayMessage('Please enter an email address.', 'invalid-email');
      emailInput.classList.add("is-invalid");

      return;
    }

    const emailRegex = /^[a-zA-Z._%+-][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    ;

    if (emailRegex.test(email)) {
      displayMessage('Email address is valid!', 'valid-email');
      emailInput.classList.remove("is-invalid");

    } else {
      displayMessage('Please enter a valid email address.', 'invalid-email');
      emailInput.classList.add("is-invalid");

    }
    if (!email) {
      displayMessage('Please enter an email address.', 'invalid-email');
      emailInput.classList.add("is-invalid");

      return;
    }

    if (email.length > 40) {
      displayMessage('Email address must be 40 characters or less.', 'invalid-email');
      emailInput.classList.add("is-invalid");

      return;
    }
  }

  function displayMessage(message, className) {
    emailValidationMessage.textContent = message;
    emailValidationMessage.className = className;
  }
});


// this is for confirming emails
const emailInput = document.getElementById('email');
const confirmEmailInput = document.getElementById('cemail');
const confirmEmailValidationMessage = document.getElementById('confirmEmailValidationMessage');

// Add input event listener to the confirmation email field
confirmEmailInput.addEventListener('input', validateConfirmEmail);

function validateConfirmEmail() {
  const email = emailInput.value.trim();
  const confirmEmail = confirmEmailInput.value.trim();

  if (!confirmEmail) {
    displayMessage('Please confirm your email address.', 'text-danger', confirmEmailValidationMessage);
    confirmEmailInput.classList.add("is-invalid");

  } else if (confirmEmail !== email) {
    displayMessage('Email addresses do not match.', 'text-danger', confirmEmailValidationMessage);
    confirmEmailInput.classList.add("is-invalid");

  } else {
    displayMessage('Email addresses match!', 'text-success', confirmEmailValidationMessage);
    confirmEmailInput.classList.remove("is-invalid");

  }
}

function displayMessage(message, className, element) {
  element.textContent = message;
  element.className = className;
}
// emailValidation.js

document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('cxemail');
  const emailValidationMessage = document.getElementById('emailValidationMessage');

  emailInput.addEventListener('input', validateEmail);

  function validateEmail() {
    const email = emailInput.value.trim();

    if (!email) {
      displayMessage('Please enter an email address.', 'invalid-email');
      return;
    }

    if (email.length > 40) {
      displayMessage('Email address must be 40 characters or less.', 'invalid-email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      displayMessage('Email address is valid!', 'valid-email');
    } else {
      displayMessage('Please enter a valid email address.', 'invalid-email');
    }
  }

  function displayMessage(message, className) {
    emailValidationMessage.textContent = message;
    emailValidationMessage.className = className;
  }
});
// password strength checker///////////////////////////////////////////////////////

function checkPasswordStrength() {
  const passwordInput = document.getElementById('password-input');
  const strengthText = document.getElementById('password-strength-text');

  const password = passwordInput.value;

  const minLength = 8;
  const maxLength = 15;

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

  let strengthClass = '';

  if (password.length < minLength || password.length > maxLength) {
    strengthText.textContent = 'Password should be between 8 and 15 characters';
    strengthClass = 'strength-weak';
  } else if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
    strengthText.textContent = 'Password is moderate';
    strengthClass = 'strength-moderate';
  } else {
    strengthText.textContent = 'Password is strong';
    strengthClass = 'strength-strong';
  }

  // Clear previous strength classes
  strengthText.classList.remove('strength-weak', 'strength-moderate', 'strength-strong');
  // Apply current strength class
  strengthText.classList.add(strengthClass);
}

// password confirmation message////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('password-input');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const confirmPasswordValidationMessage = document.getElementById('confirmPasswordValidationMessage');
  const passwordMatchMessage = document.getElementById('passwordMatchMessage');

  passwordInput.addEventListener('input', checkPasswordStrength);
  confirmPasswordInput.addEventListener('input', validateConfirmPassword);

  function validateConfirmPassword() {
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (!confirmPassword) {
      displayMessage(confirmPasswordValidationMessage, 'Please confirm your password.', 'validation-message');
      displayMatchMessage(passwordMatchMessage, '', 'match-message');
      confirmPasswordInput.classList.add("is-invalid");

      return;
    }

    if (password === confirmPassword) {
      displayMessage(confirmPasswordValidationMessage, 'Passwords match.', 'match-message');
      displayMatchMessage(passwordMatchMessage, 'Passwords match.', 'match-message');
    } else {
      displayMessage(confirmPasswordValidationMessage, 'Passwords do not match.', 'validation-message');
      displayMatchMessage(passwordMatchMessage, 'Passwords do not match.', 'match-message');
      confirmPasswordInput.classList.add("is-invalid");

    }
  }

  function displayMessage(element, message, className) {
    element.textContent = message;
    element.className = className;
  }

  function displayMatchMessage(element, message, className) {
    element.textContent = message;
    element.className = className;
  }
});


// validate the user is more than 18 years old

function validateDOB() {
  var dob = document.getElementById("dob");
  // Get the entered date of birth
  var dob = new Date(document.getElementById('dob').value);

  // Calculate age
  var today = new Date();
  var age = today.getFullYear() - dob.getFullYear();
  var monthDiff = today.getMonth() - dob.getMonth();

  // Adjust age if the birthday hasn't occurred yet this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  // Check if age is 18 or older
  var resultMessage = document.getElementById('resultMessage');

  if (age >= 18) {
    // If age is 18 or older, display a success message
    resultMessage.innerHTML = '<span class="text-success">Form can be submitted. Age is: ' + age + '</span>';
  } else {
    // If age is less than 18, display an error message
    resultMessage.innerHTML = '<span class="text-danger">You must be 18 years or older to submit this form.</span>';
    dob.classList.add("is-invalid");

  }
}

//validate phone no///////////////////////////////////////////////////////
function validatePhoneNumber() {
  // Get selected country code
  var countryCode = document.getElementById("countryCode").value;

  // Get the phone number input
  var phoneNumberInput = document.getElementById("phoneNumber");

  // Remove any non-digit characters from the phone number
  var phoneNumber = phoneNumberInput.value.replace(/\D/g, '');

  // Validate the phone number based on the selected country code
  var isValid = false;

  switch (countryCode) {
    case "+91": // India
      isValid = /^(\+91-|\+91|0)?[6789]\d{9}$/.test(phoneNumber);
      break;
    case "+1": // United States and Canada
      isValid = /^(\+1)?[2-9]\d{2}[-.\s]?[2-9]\d{2}[-.\s]?\d{4}$/.test(phoneNumber);
      break;

    case "+44": // United Kingdom
      isValid = /^(\+44|0)7\d{9}$/.test(phoneNumber);
      break;
    case "+61": // Australia
      isValid = /^(\+61|0)4\d{8}$/.test(phoneNumber);
      break;
    // Add more cases for other country codes as needed

    default:
      break;
  }

  // Display validation message
  var validationMessage = document.getElementById("phoneValidationMessage");
  validationMessage.textContent = isValid ? "" : "Invalid phone number";

  // You can also add/remove classes or change the style of the input based on validation result
  if (isValid) {
    phoneNumberInput.classList.remove("is-invalid");
  } else {
    phoneNumberInput.classList.add("is-invalid");
  }
}



///////////////////////////////////////////////////////////////////////////////////

function toggleSubmitButton() {
  var agreeCheckbox = document.getElementById('agreeCheckbox');
  var submitButton = document.getElementById('submitButton');

  // Enable or disable the submit button based on the checkbox status
  submitButton.disabled = !agreeCheckbox.checked;
}


// onsubmite function

function handleFormSubmission() {
  // Perform any form validation if needed

  // Show an alert indicating successful form submission
  alert("Form submitted successfully!");

  // Prevent the default form submission behavior
  return false;
}
