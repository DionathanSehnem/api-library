let listAuthor = document.getElementById("tableDataAuthor")

let addAuthorHTML = '<input type="text" name="name" id="name" placeholder="Name"><input type="text" name="nationality" id="nationality" placeholder="Nationality"><button onclick="createNewAuthor()">Create Author</button><button onclick="closeAuthor()">Cancel</button>'
let buttonHTMLAuthor = '<button onclick="openAuthor()" id="buttonNewAuthor">Add new Author</button>';
let elementContainerAuthor = document.getElementById("containerNewAuthor");

function createListDataAuthor(data) {
    listAuthor.innerHTML += `<tr><td>${data.name}</td><td>${data.nationality}</td><td><button id="${data._id}" onclick="editAuthor(this)" class="button edit"></button></td></tr>`
}

async function getDataAuthors() {
    await getDataFromApi("/authors", "GET", null, (data) => {
        if (data[0] != null) {
            document.getElementById("textEmptyAuthor").remove();
            localStorage.setItem("authors", JSON.stringify(data));
        }
        for (let i = 0; i < data.length; i++) {
            createListDataAuthor(data[i]);
        }
    })
}

getDataAuthors();

async function deleteAuthor(element) {
    await getDataFromApi(`/authors/${element.id}`, "DELETE", null, (data) => {
        document.location.reload(true);
    })
}

function getAuthorValues() {
    let inputName = document.getElementById("name");
    let inputNationality = document.getElementById("nationality");

    let body = {
        name: inputName.value,
        nationality: inputNationality.value,
    }
    return body;
}

async function createNewAuthor() {
    await getDataFromApi('/authors', "POST", getAuthorValues(), (data) => {
        document.location.reload(true);
    })
}

async function saveAuthor(element) {
    await getDataFromApi(
        `/authors/${element.attributes.id.value}`,
        "PUT",
        getAuthorValues(),
        (data) => {
            document.location.reload(true);
        },
    )
}

function editAuthor(element) {
    let authorsData = JSON.parse(localStorage.getItem("authors"));
    let data;
    for (let i = 0; i < authorsData.length; i++) {
        if (authorsData[i]._id == element.attributes.id.value) {
            data = authorsData[i];
        }
    }
    let editAuthorHTML = `<input type="text" name="name" id="name" value="${data.name}" placeholder="Name"><input type="text" name="nationality" id="nationality" value="${data.nationality}" placeholder="Nationality"><button id="${element.attributes.id.value}" onclick="saveAuthor(this)">Save Author</button><button onclick="closeAuthor()">Cancel</button>`
    elementContainerAuthor.innerHTML = editAuthorHTML;
}


function openAuthor() {
    elementContainerAuthor.innerHTML = addAuthorHTML;
}

function closeAuthor() {
    elementContainerAuthor.innerHTML = buttonHTMLAuthor;
}