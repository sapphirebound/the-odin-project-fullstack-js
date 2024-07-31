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
addBookToLibrary('123', 'def', 123, "read");

// Function to auto-add action buttons
function actionButtons() {
    const actionDiv = document.createElement("div");

    //adding delete button
    const deleteButton = document.createElement("button");
    deleteButton.id = 'deleteButton';
    deleteButton.textContent = "delete";

    //adding edit button
    const updateReadButton = document.createElement("button");
    updateReadButton.id = 'updateReadButton';

    //conditional to check if book is read or not and update status
    updateReadButton.textContent = "Read";

    actionDiv.appendChild(deleteButton);
    actionDiv.appendChild(updateReadButton);
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
    if (formKey === 'status') {
        input += `<label for='${formKey}'>${formKey}</label>
        <input type='radio' id='read' name='${formKey}' value='read'/>
        <label for='read'>Read</label><br>
        <input type='radio' id='unread' name='${formKey}' value='unread'/>
        <label for='unread'>Not Read</label>`;
    }
    else {
        input += `<label for='${formKey}'>${formKey}</label>
        <input type='text' id='${formKey}' name='${formKey}' />`;
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

// form submit action
function addBook(e) {
    e.preventDefault(); //disable sending data to server
    const userTitle = document.querySelector('input#title').value;
    const userAuthor = document.querySelector('input#author').value;
    const userPages = document.querySelector('input#pages').value;
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
    console.log(rowID);
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
    const target = e.target.closest('button#updateReadButton');
    if (target) {
        const bookIndex = getBook(target);
        console.log(bookIndex);
        let bookStatus = myLibrary[bookIndex].status;
        myLibrary[bookIndex].status =
            //conditional to check current status
            bookStatus == 'read' ? 'unread' : 'read';
        updateTable();
    }
}

tbody.addEventListener('click', updateStatus);
tbody.addEventListener('click', deleteRow);