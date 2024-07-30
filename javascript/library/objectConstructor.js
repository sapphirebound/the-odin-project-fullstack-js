const myLibrary = [];
const body = document.querySelector('body');
const tbody = document
    .getElementById('libraryTable')
    .getElementsByTagName('tbody')[0];


function Book(id, title, author, pages) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
}

// create sample book to loop through
const sampleBook = new Book('id', 'title', 'author', 'pages');

function addBookToLibrary(id, title, author, pages) {
    const entry = new Book(id, title, author, pages);
    myLibrary.push(entry);
}

// test entry
addBookToLibrary(0, '123', 'def', 123);

// Function to auto-add action buttons
function actionButtons() {
    const actionDiv = document.createElement("div");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    actionDiv.appendChild(deleteButton);
    return actionDiv;
}

// new book button
const addButton = document.createElement("button");
addButton.textContent = "Add Book to Library";
body.appendChild(addButton);

// book submission form
const form = document.createElement('form');

// adding input fields
let input = '';
for (property in Object.getOwnPropertyNames(sampleBook)) {
    const formKey = Object.getOwnPropertyNames(sampleBook)[property];
    input += `<div><label for='${formKey}'>${formKey}</label><input type='text' id='${formKey}' name='${formKey}' /></div>`;
}
input += `<input type='submit' value='Add Book' />`;
form.innerHTML = input;

// submit button
const formSubmit = document.createElement('input');

//create dialog to contain form
const formDialog = document.createElement('dialog');
formDialog.className = 'addBookForm';
formDialog.appendChild(form);

body.appendChild(formDialog);

// Click add to show form
addButton.addEventListener("click", (e) => {
    formDialog.show();
});

// add entries to table
myLibrary.forEach((entry) => {
    let newRow = tbody.insertRow(entry.id);
    let cellCount = 0;
    for (const e in entry) {
        let newCell = newRow.insertCell(cellCount);
        newCell.textContent = entry[e];
        cellCount += 1;
    };
    let actions = newRow.insertCell(cellCount);
    actions.appendChild(actionButtons());
}
);