// Login:
const loginEmailField = document.querySelector(".login-email-field");
const loginPassField = document.querySelector(".login-pass-field");
const loginBtn = document.querySelector(".login-btn");
const containerApp = document.querySelector(".app");
//

let accounts = JSON.parse(localStorage.getItem("accounts")) ?? [];

const timeout = function (ms) {
  return new Promise((res) => setTimeout(res, ms));
};

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (loginEmailField.value === "" || loginPassField.value === "") {
    alert("Field is empty!");
  } else {
    let currentAccount = accounts.find(
      (acc) => acc.email === loginEmailField.value
    );
    if (currentAccount) {
      if (currentAccount.password == loginPassField.value) {
        loginEmailField.value = loginPassField.value = "";
        loginPassField.blur();
        console.log(currentAccount);
        containerApp.style.opacity = 0;
        timeout(1000).then(function () {
          localStorage.setItem(
            "currentAccount",
            JSON.stringify(currentAccount)
          );
          window.location.replace("http://127.0.0.1:5500/contacts.html");
        });
      } else {
        alert("Password is incorrect!");
      }
    } else {
      alert("Account does not exist, please signup first.");
    }
  }
});
