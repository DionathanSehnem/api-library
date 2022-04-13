let baseUrl = 'http://localhost:3000';
let listBook = document.getElementById("tableDataBook")

let addBookHTML = '<input type="text" name="title" id="title" placeholder="Title"><select name="author" id="author"></select><input type="text" name="publishing" id="publishing" placeholder="Publishing"><input type="text" name="numberPages" id="numberPages" placeholder="NumberPages"><button onclick="createNewBook()">Create book</button><button onclick="closeBook()">Cancel</button>'
let buttonHTMLBook = '<button onclick="openBook()" id="buttonNewBook">Add new book</button>';
let elementContainerBook = document.getElementById("containerNewBook");

function createListDataBook(data) {
    listBook.innerHTML += `<tr><td>${data.title}</td><td>${data.author.name}</td>
    <td>${data.publishing}</td><td>${data.numberPages}</td><td><button id="${data._id}" onclick="editBook(this)" class="button edit"></button><button id="${data._id}" onclick="deleteBook(this)" class="button remove"></button></td></tr>`
}

async function getDataFromApi(address, method, body, code) {
    let header = method == "GET" || method == "DELETE" ? {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: method,
    } : {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: method,
        body: JSON.stringify(body)
    };
    await fetch(baseUrl + address, header)
        .then((response) => { return response.json() })
        .then((data) => code(data))
        .catch((err) => {
            console.log(err);
        })
}

async function getDataBooks() {
    await getDataFromApi("/books", "GET", null, (data) => {
        if (data[0] != null) {
            document.getElementById("textEmptyBook").remove();
            localStorage.setItem("books", JSON.stringify(data));
        }
        for (let i = 0; i < data.length; i++) {
            createListDataBook(data[i]);
        }
    })
}

getDataBooks();

async function deleteBook(element) {
    await getDataFromApi(`/books/${element.id}`, "DELETE", null, (data) => {
        document.location.reload(true);
    })
}

function getBookValues() {
    let inputTitle = document.getElementById("title");
    let inputPublishing = document.getElementById("publishing");
    let inputNumberPages = document.getElementById("numberPages");
    let inputAuthor = document.getElementById("author");


    let body = {
        title: inputTitle.value,
        author: inputAuthor.value,
        publishing: inputPublishing.value,
        numberPages: inputNumberPages.value,
    }

    return body;
}

async function createNewBook() {
    await getDataFromApi('/books', "POST", getBookValues(), (data) => {
        document.location.reload(true);
    })
}

async function saveBook(element) {
    await getDataFromApi(
        `/books/${element.attributes.id.value}`,
        "PUT",
        getBookValues(),
        (data) => {
            document.location.reload(true);
        },
    )
}

function editBook(element) {
    let booksData = JSON.parse(localStorage.getItem("books"));
    let data;
    for (let i = 0; i < booksData.length; i++) {
        if (booksData[i]._id == element.attributes.id.value) {
            data = booksData[i];
        }
    }
    let editBookHTML = `<input type="text" name="title" id="title" value="${data.title}" placeholder="Title"><select name="author" id="author"></select><input type="text" name="publishing" id="publishing" value="${data.publishing}" placeholder="Publishing"><input type="text" name="numberPages" id="numberPages" value="${data.numberPages}" placeholder="NumberPages"><button id="${element.attributes.id.value}" onclick="saveBook(this)">Save book</button><button onclick="closeBook()">Cancel</button>`
    elementContainerBook.innerHTML = editBookHTML;
    getAuthors(data.author.name);
}

async function getAuthors(authorName) {
    hasValue = authorName == null || undefined ? false : true;
    let authorOptions = document.getElementById('author');
    let options = hasValue ? '<option disabled>Author</option>' : '<option selected disabled>Author</option>';
    let data = JSON.parse(localStorage.getItem("authors"));
    for (let i = 0; i < data.length; i++) {
        if (hasValue) {
            if (authorName == data[i].name) {
                options += `<option value="${data[i]._id}" selected>${data[i].name}</option>`;
            } else {
                options += `<option value="${data[i]._id}">${data[i].name}</option>`;
            }
        } else {
            options += `<option value="${data[i]._id}">${data[i].name}</option>`;
        }
    }
    authorOptions.innerHTML = options;
}

function openBook() {
    elementContainerBook.innerHTML = addBookHTML;
    getAuthors();
}

function closeBook() {
    elementContainerBook.innerHTML = buttonHTMLBook;
}