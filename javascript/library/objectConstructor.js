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

function addBookToLibrary(id, title, author, pages) {
    const entry = new Book(id, title, author, pages);
    myLibrary.push(entry);
}

// test entry
addBookToLibrary(0, '123', 'def', 123);

// Function to auto-add delete button
function actionButtons() {
    const actionDiv = document.createElement("div");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    actionDiv.appendChild(deleteButton);
    return actionDiv;
}

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