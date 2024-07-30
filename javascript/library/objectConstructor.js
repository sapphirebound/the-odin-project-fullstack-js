const myLibrary = [];
const body = document.querySelector('body');
const tbody = document
    .getElementById('libraryTable')
    .getElementsByTagName('tbody')[0];


function Book(id, title, author, pages) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
}

// create sample book to loop through
const sampleBook = new Book('id', 'title', 'author', 'pages');

function addBookToLibrary(title, author, pages) {
    let bookID = myLibrary.length > 0 ? myLibrary.length : 0; //check if library length is not 0
    bookID = 'BookID-' + String(bookID);
    const entry = new Book(bookID, title, author, pages);
    myLibrary.push(entry);
}

// test entry
addBookToLibrary('123', 'def', 123);

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
    if (formKey === 'id') {
        continue;
    }
    else {
        input += `<label for='${formKey}'>${formKey}</label><input type='text' id='${formKey}' name='${formKey}' />`;
    }
}
input += `<input type='submit' value='Add Book' />`;
form.innerHTML = input;


//create dialog to contain form
const formDialog = document.createElement('dialog');
formDialog.className = 'addBookForm';
formDialog.appendChild(form);

body.appendChild(formDialog);

// Click add to show form
addButton.addEventListener("click", (e) => {
    formDialog.show();
});

// submit button
const formSubmit = document.querySelector('input[type="submit"]');

// form submit

form.addEventListener('submit', (e) => {
    e.preventDefault(); //disable sending data to server
    const userTitle = document.querySelector('input#title').value;
    const userAuthor = document.querySelector('input#author').value;
    const userPages = document.querySelector('input#pages').value;
    addBookToLibrary(userTitle, userAuthor, userPages);
    updateTable();
    form.reset();
    formDialog.close();
});

// add entries to table
function updateTable() {
    tbody.innerHTML = '';
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
}

updateTable();