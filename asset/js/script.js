import Contact from "./Contact.js";

const account = {
  fullName: "Muhammad Sabah Ibrahim",
  email: "hama.s.ibrahim9@gmail.com",
  password: 4444,
  contacts: [
    new Contact(1, "shad", "789345834", "shad@email.com"),
    new Contact(2, "halkawt", "7983245", "halkawt@email.com"),
    new Contact(3, "rahen", "893045", "rahen@email.com"),
  ],
};

const accounts = [account];

// Elements
const containerApp = document.querySelector(".app");

// Signup:
const signupNameField = document.querySelector(".signup-name-field");
const signupEmailField = document.querySelector(".signup-email-field");
const signupPassField = document.querySelector(".signup-pass-field");

// Login:
const loginEmailField = document.querySelector(".login-email-field");
const loginPassField = document.querySelector(".login-pass-field");

// Buttons
const signupBtn = document.querySelector(".signup-btn");
const loginBtn = document.querySelector(".login-btn");
const deleteContactBtn = document.querySelector(".delete-contact-btn");

//

//
let loggedIn = false;

const timeout = function (ms) {
  return new Promise((res) => setTimeout(res, ms));
};
let currentAccount;

async function navigateToContacts() {
  await timeout(1000).then(function () {
    window.location.replace("http://127.0.0.1:5500/contacts.html");
  });
}

if (loginBtn) {
  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (loginEmailField.value === "" || loginPassField.value === "") {
      alert("Field is empty!");
    } else {
      currentAccount = accounts.find(
        (acc) => acc.email === loginEmailField.value
      );
    }

    if (+currentAccount.password === +loginPassField.value) {
      loginEmailField.value = loginPassField.value = "";
      loginPassField.blur();
      containerApp.style.opacity = 0;
      loggedIn = true;
      navigateToContacts();
    } else {
      alert("Password is incorrect!");
    }
  });
}
if (signupBtn) {
  signupBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let newAccount = {
      fullName: signupNameField.value,
      email: signupEmailField.value,
      password: +signupPassField.value,
    };
    accounts.push(newAccount);
    signupNameField.value = signupEmailField.value = signupPassField.value = "";
    console.log(accounts);
    signupPassField.blur();
    containerApp.style.opacity = 0;
    setTimeout(function () {
      window.location.href = "http://127.0.0.1:5500/index.html";
    }, 1000);
  });
}

// Displaying Contacts
const displayContacts = function (currAcc) {
  const tableBody = document.getElementById("tableBody");
  currAcc.contacts.forEach(function (el, i, arr) {
    let row = `<tr id="${el.id}">
    <th scope="row">${el.id}</th>
    <td>${el.cname}</td>
    <td>${el.phone}</td>
    <td>${el.phone}</td>
    <td>
        <div>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                data-bs-target="#editContactModal">
                <ion-icon name="create-outline" class="action-icon"></ion-icon>
            </button>
            <button type="button" class="btn btn-danger delete-contact-btn">
                <ion-icon name="trash-outline" class="action-icon"></ion-icon>
            </button>
        </div>
    </td>
  </tr>`;
    console.log(tableBody);
    if (tableBody.firstElementChild === null) {
      tableBody.innerHTML = row;
    } else {
      tableBody.firstElementChild.insertAdjacentHTML("afterend", row);
    }
  });
};
