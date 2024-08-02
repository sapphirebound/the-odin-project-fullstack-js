const myLibrary = [];
const body = document.querySelector('body>div');
console.log(body);
const tbody = document
    .getElementById('libraryTable')
    .getElementsByTagName('tbody')[0];


function Book(id, title, author, pages, status) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.status = status;
}

// create sample book to loop through
const sampleBook = new Book('id', 'title', 'author', 'pages', 'status');

function addBookToLibrary(title, author, pages, status) {
    let bookID = myLibrary.length > 0 ? myLibrary.length : 0; //check if library length is not 0
    bookID = 'BookID-' + String(bookID);
    const entry = new Book(bookID, title, author, pages, status);
    myLibrary.push(entry);
}

// test entry
addBookToLibrary('Mitch Albom', 'How to Win Friends and Influence People', 123, "read");

//inner function to add button

function addActionButton(buttonText, buttonIconPath, id) {
    const actionButton = document.createElement("button");
    const actionButtonIcon = document.createElement("img");

    actionButtonIcon.src = buttonIconPath;
    actionButton.appendChild(actionButtonIcon);

    if (buttonText) {
        const actionButtonText = document.createElement('span');
        actionButtonText.textContent = buttonText;
        actionButton.appendChild(actionButtonText);
    }

    actionButton.id = id;
    actionButton.className = 'bookActionButton';
    return actionButton;
}

// Function to auto-add action buttons
function actionButtons() {
    const actionDiv = document.createElement("div");
    //adding delete button
    const deleteButton = addActionButton('Delete', 'src/icons/delete.svg', 'deleteButton');
    //adding edit button
    const updateButton = addActionButton('Read', 'src/icons/read.svg', 'updateButton');
    //conditional to check if book is read or not and update status

    actionDiv.appendChild(deleteButton);
    actionDiv.appendChild(updateButton);
    return actionDiv;


}

// new book button
const addButton = document.createElement("button");
addButton.textContent = "+ Add Book";
addButton.id = 'addBookButton';
body.appendChild(addButton);

// book submission form
const form = document.createElement('form');

// adding input fields
let input = '';
for (property in Object.getOwnPropertyNames(sampleBook)) {
    let formKey = Object.getOwnPropertyNames(sampleBook)[property];
    formKey = formKey.charAt(0).toUpperCase() + formKey.slice(1); //make key uppercase
    if (formKey === 'Id') {
        continue;
    }
    if (formKey === 'Status') {
        input += `<section id='userStatus'><label for='${formKey}'>${formKey}</label>
        <p id='userStatus-Read'><input type='radio' id='read' name='${formKey}' value='read'/>
        <label for='read'>Read</label></p>
        <p id='userStatus-unread'><input type='radio' id='unread' name='${formKey}' value='unread'/>
        <label for='unread'>Not Read</label>
        </section></p>`;
    }
    else {
        input += `<p><label for='${formKey}'>${formKey}</label>
        <input type='text' id='${formKey}' name='${formKey}' /></p>`;
    }
}
input += `<input type='submit' value='Add Book' />`;
form.innerHTML = input;


//create dialog to contain form
const formDialog = document.createElement('dialog');
const formDialogClose = document.createElement('img');
formDialogClose.src = 'src/icons/close.svg';
formDialogClose.id = 'closeModal';
formDialog.className = 'addBookForm';
formDialog.appendChild(formDialogClose);
formDialog.appendChild(form);

body.appendChild(formDialog);

// Click add to show form
addButton.addEventListener("click", (e) => {
    formDialog.showModal();
});

// submit button
const formSubmit = document.querySelector('input[type="submit"]');

// form submit action
function addBook(e) {
    e.preventDefault(); //disable sending data to server
    const userTitle = document.querySelector('input#Title').value;
    const userAuthor = document.querySelector('input#Author').value;
    const userPages = document.querySelector('input#Pages').value;
    const userStatus = document.querySelector('input[type=radio]:checked').value;
    addBookToLibrary(userTitle, userAuthor, userPages, userStatus);
    updateTable();
    form.reset();
    formDialog.close();
};

form.addEventListener('submit', addBook);

// add entries to table
function updateTable() {
    tbody.innerHTML = '';
    let entryID = 0;
    myLibrary.forEach((entry) => {
        let newRow = tbody.insertRow(entryID);
        let cellCount = 0;
        for (const e in entry) {
            if (e === 'id') {
                newRow.id = entry[e]; //assign bookID to row
                continue; //skips adding bookID property as table data
            }
            else {
                let newCell = newRow.insertCell(cellCount);
                newCell.id = e;
                newCell.textContent = entry[e];
                cellCount += 1;
            }
        };
        let actions = newRow.insertCell(cellCount);
        actions.appendChild(actionButtons());
        entryID += 1;
    }
    );
}

updateTable(); //draw table on load

//get book from table function
function getBook(target) {
    const rowID = target.closest('tr').id;
    const bookIndex = myLibrary
        .map((x) => { return x.id; }) //returns array of book IDs
        .indexOf(rowID); //find index of row to delete
    return bookIndex;
}


// delete button action
function deleteRow(e) {
    const target = e.target.closest('button#deleteButton'); //targets delete button of the row
    if (target) {
        const bookIndex = getBook(target);
        myLibrary.splice(bookIndex, 1); // removes the entry
        updateTable();

    }
};

// update button action
function updateStatus(e) {
    const target = e.target.closest('button#updateButton');
    if (target) {
        const bookIndex = getBook(target);
        let bookStatus = myLibrary[bookIndex].status;
        myLibrary[bookIndex].status =
            //conditional to check current status
            bookStatus == 'read' ? 'unread' : 'read';
        updateTable();
    }
}

// close dialog action

formDialogClose.addEventListener('click', (e) => {
    formDialog.close();
    console.log('test close');
});

tbody.addEventListener('click', updateStatus);
tbody.addEventListener('click', deleteRow);