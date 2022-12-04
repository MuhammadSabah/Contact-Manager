class Contact {
  constructor(id, name, phone, email) {
    this.id = id;
    this.cname = name;
    this.phone = phone;
    this.email = email;
  }
}

//
const tableBody = document.getElementById("tableBody");
const logoutBtn = document.querySelector(".logout-btn");
const containerApp = document.querySelector(".app");
const deleteContactBtn = document.getElementsByTagName(".delete-contact-btn");

// Add Contact Elements
const addContactNameInput = document.getElementById("add-contact-name");
const addPhoneNoInput = document.getElementById("add-phone-no");
const addEmailInput = document.getElementById("add-email");
const saveAddContact = document.querySelector(".save-add-contact-btn");
const addContactModal = document.getElementById("addContactModal");

// Edit Contact Elements
const editContactNameInput = document.getElementById("edit-contact-name");
const editPhoneNoInput = document.getElementById("edit-phone-no");
const editEmailInput = document.getElementById("edit-email");
const editContactModal = document.getElementById("editContactModal");
//
const timeout = function (ms) {
  return new Promise((res) => setTimeout(res, ms));
};

if (localStorage.hasOwnProperty("currentAccount") === false) {
  window.location.href = "http://127.0.0.1:5500/index.html";
} else {
  // Get the current account from local storage
  let currAcc = JSON.parse(localStorage.getItem("currentAccount"));

  // Displaying Contacts
  const displayContacts = function (currAcc) {
    if (currAcc.contacts === null || currAcc.contacts === undefined) {
      currAcc.contacts = [];
    }
    currAcc.contacts.forEach(function (el, i, arr) {
      let row = `<tr id="${el.id}">
      <th scope="row">${i + 1}</th>
      <td class="name-value">${el.cname}</td>
      <td class="phone-value">${el.phone}</td>
      <td class="email-value">${el.email}</td>
      <td>
          <div>
            <button type="button" class="btn btn-primary edit-contact-btn" data-bs-toggle="modal"
                data-bs-target="#editContactModal">
                <ion-icon name="create-outline" class="action-icon"></ion-icon>
            </button>
            <button type="button" class="btn btn-danger delete-contact-btn">
                <ion-icon name="trash-outline" class="action-icon"></ion-icon>
            </button>
          </div>
         </td>
       </tr>`;
      if (tableBody.firstElementChild === null) {
        tableBody.innerHTML = row;
      } else {
        tableBody.lastElementChild.insertAdjacentHTML("afterend", row);
      }
    });
  };
  displayContacts(currAcc);

  // Update Storage Accounts
  const updateStorageAccounts = function () {
    let accs = JSON.parse(localStorage.getItem("accounts"));
    let accIndex = accs.findIndex((acc) => acc.id === currAcc.id);
    accs[accIndex] = currAcc;
    localStorage.setItem("accounts", JSON.stringify(accs));
  };

  // Add Contact
  const addContact = function () {
    if (
      addContactNameInput.value === "" ||
      addEmailInput.value === "" ||
      addPhoneNoInput.value === ""
    ) {
      alert("Field is empty!");
    } else {
      let newContact = new Contact(
        currAcc.contacts.length + 1,
        addContactNameInput.value,
        addPhoneNoInput.value,
        addEmailInput.value
      );

      // Remove empty and other falsy values.
      currAcc.contacts = currAcc.contacts.filter((el) => el);

      currAcc.contacts.push(newContact);
      localStorage.setItem("currentAccount", JSON.stringify(currAcc));
      addContactNameInput.value =
        addEmailInput.value =
        addPhoneNoInput.value =
          "";
      updateStorageAccounts();
      let modal = bootstrap.Modal.getInstance(addContactModal);
      modal.hide();
      location.reload();
    }
  };
  saveAddContact.addEventListener("click", () => addContact());

  // Logout
  const logout = function () {
    if (confirm("Are you sure?") === true) {
      containerApp.style.opacity = 0;
      timeout(1000).then(function () {
        localStorage.removeItem("currentAccount");
        window.location.href = "http://127.0.0.1:5500/index.html";
      });
    }
  };
  logoutBtn.addEventListener("click", () => logout());

  // Remove Contact
  const removeContact = function () {
    tableBody.addEventListener("click", function (e) {
      let deleteBtn = e.target.classList.contains("delete-contact-btn");
      let row = e.target.closest("tr");
      let deleteIcon = e.target.closest(".delete-contact-btn");
      let elID = row.getAttribute("id");
      if (deleteBtn || deleteIcon) {
        let updatedAccountContacts = currAcc.contacts.filter((contact) => {
          return +elID !== +contact.id;
        });
        currAcc.contacts = updatedAccountContacts;
        localStorage.setItem("currentAccount", JSON.stringify(currAcc));
        //
        updateStorageAccounts();
        //
        row.remove();
        displayContacts(currAcc.contacts);
        location.reload();
      }
    });
  };
  removeContact();

  // Edit Contact
  let currentContactIndex;
  const editContact = function () {
    tableBody.addEventListener("click", function (e) {
      let editBtn = e.target.classList.contains("edit-contact-btn");
      let editIcon = e.target.closest(".edit-contact-btn");
      if (editBtn || editIcon) {
        let parentRow = e.target.closest("tr");
        let nameValue = parentRow.children[1];
        let phoneValue = parentRow.children[2];
        let emailValue = parentRow.children[3];
        //
        editContactNameInput.value = nameValue.textContent;
        editPhoneNoInput.value = phoneValue.textContent;
        editEmailInput.value = emailValue.textContent;
        //
        currentContactIndex = currAcc.contacts.findIndex(
          (contact) =>
            nameValue.textContent == contact.cname &&
            phoneValue.textContent == contact.phone &&
            emailValue.textContent == contact.email
        );
        let saveEditContact = document.querySelector(".save-edit-contact-btn");
        saveEditContact.addEventListener("click", function (e) {
          console.log(currentContactIndex);
          let editedContact = {
            id: currentContactIndex == 0 ? 1 : currentContactIndex + 1,
            cname: editContactNameInput.value,
            phone: editPhoneNoInput.value,
            email: editEmailInput.value,
          };

          currAcc.contacts[currentContactIndex] = editedContact;
          updateStorageAccounts();
          localStorage.setItem("currentAccount", JSON.stringify(currAcc));
          tableBody.innerHTML = "";
          displayContacts(currAcc);
          let modal = bootstrap.Modal.getInstance(editContactModal);
          modal.hide();
        });
      }
    });
  };

  editContact();
}
