// Signup:
const signupNameField = document.querySelector(".signup-name-field");
const signupEmailField = document.querySelector(".signup-email-field");
const signupPassField = document.querySelector(".signup-pass-field");
const signupBtn = document.querySelector(".signup-btn");
const containerApp = document.querySelector(".app");
//

signupBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    signupEmailField.value === "" ||
    signupNameField.value === "" ||
    signupPassField.value === ""
  ) {
    alert("Field is empty!");
  } else {
    let newAccount = {
      fullName: signupNameField.value,
      email: signupEmailField.value,
      password: +signupPassField.value,
      contacts: [],
    };
    let updatedAccounts = JSON.parse(localStorage.getItem("accounts")) ?? [];
    let accExists = updatedAccounts.some(
      (acc) => acc.email === newAccount.email
    );
    if (accExists) {
      alert("Account already exists!");
    } else {
      updatedAccounts.push(newAccount);
      localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
      signupNameField.value =
        signupEmailField.value =
        signupPassField.value =
          "";
      signupPassField.blur();
      containerApp.style.opacity = 0;
      setTimeout(function () {
        window.location.href = "http://127.0.0.1:5500/index.html";
      }, 1000);
    }
  }
});

