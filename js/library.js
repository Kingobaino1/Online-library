const title = document.querySelector('#title');
const author = document.querySelector('#author');
const page = document.querySelector('#page');
const read = document.querySelector('#read');
const btn = document.querySelector('#btn');
const add = document.querySelector('#add-book');
const submit = document.querySelector('#submit');
const close = document.querySelector('#close');
const row = document.querySelector('.row');

let myLibrary = [];

function Books(title, author, page, read) {
  return {
    title,
    author,
    page,
    read
  };
}

const Display = () => {
  const hideForm = () => {
    add.className = 'd-none';
  };

  const addBook = () => {
    add.className = 'd-block';
  };

  const resetForm = () => {
    title.value = '';
    author.value = '';
    page.value = '';
    read.checked = true;
  };

  const closeButton = () => {
    hideForm();
    resetForm();
  };

  const removeBook = (e) => {
    const warning = window.confirm('Are you sure you want to remove this book?');
    if (warning) {
      const bookIndex = myLibrary.indexOf(e.target);
      myLibrary.splice(bookIndex, 1);
      e.target.offsetParent.parentElement.parentElement.remove();
      store.saveLocal();
    } else {
      store.saveLocal();
    }
  };

  const changeStatus = (e) => {
    if (e.target.textContent === 'Mark as unread') {
      e.target.className = 'btn-secondary';
      e.target.textContent = 'Mark as read';
    } else {
      e.target.className = 'btn-success';
      e.target.textContent = 'Mark as unread';
    }
  };

  const status = (book) => {
    if (book.read) {
      return 'Mark as unread';
    }
    return 'Mark as read';
  };

  close.addEventListener('click', closeButton);
  btn.addEventListener('click', addBook);
  return {
    hideForm,
    addBook,
    resetForm,
    removeBook,
    changeStatus,
    status
  };
};

const display = Display();

function card(book) {
  const div = document.createElement('div');
  div.className = 'card, bg-primary col-6 pb-3';

  const ul = document.createElement('ul');
  ul.classList.add('list-group');
  ul.classList.add('list-group-flush');
  ul.classList.add('mt-4');

  const li1 = document.createElement('li');
  li1.classList.add('list-group-item');
  li1.textContent = book.title;

  const li2 = document.createElement('li');
  li2.classList.add('list-group-item');
  li2.textContent = `by ${book.author}`;

  const li3 = document.createElement('li');
  li3.classList.add('list-group-item');
  li3.textContent = `${book.page} pages`;

  const li4 = document.createElement('li');
  li4.classList.add('list-group-item');
  li4.classList.add('d-flex');
  li4.classList.add('justify-content-between');

  const btn1 = document.createElement('button');
  btn1.setAttribute('type', 'button');
  btn1.className = 'btn btn-success';
  btn1.textContent = display.status(book);
  btn1.addEventListener('click', display.changeStatus);

  const btn2 = document.createElement('button');
  btn2.setAttribute('type', 'button');
  btn2.className = 'btn btn-danger';
  btn2.textContent = 'Remove Book';
  btn2.addEventListener('click', display.removeBook);

  row.appendChild(div);
  div.appendChild(ul);
  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);
  li4.appendChild(btn1);
  li4.appendChild(btn2);
  ul.appendChild(li4);
}

function Storage() {
  const loop = () => {
    row.innerHTML = '';
    myLibrary.forEach((book) => {
      card(book);
    });
  };
  const saveLocal = () => {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  };

  const populateData = () => {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    if (myLibrary === null) {
      myLibrary = [];
    }
    loop();
  };

  return {
    loop,
    saveLocal,
    populateData
  };

}

const store = Storage();

function addBookToLibrary() {
  if (title.value === '' || author.value === '' || page.value === '') {
    alert('Fields with * must not be blank');
  } else {
    const book = Books(title.value, author.value, page.value, read.checked);
    myLibrary.push(book);
    store.saveLocal();
    store.loop();
    store.populateData();
    display.resetForm();
    display.hideForm();
  }
}

submit.addEventListener('click', addBookToLibrary);
store.populateData();
