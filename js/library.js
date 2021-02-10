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

class Books {
  constructor(title, author, page, read){
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
  }

  hideForm() {
    add.className = 'd-none';
  }

  addBook() {
   add.className = 'd-block';
  }

  resetForm () {
    title.value = '';
    author.value = '';
    page.value = '';
    read.checked = true;
  }

  status(book) {
    if (book.read) {
      return 'Mark as unread';
    }
    return 'Mark as read';
  }

  saveLocal() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  }

  changeStatus(e) {
    if (e.target.textContent === 'Mark as unread') {
      e.target.className = 'btn-secondary';
      e.target.textContent = 'Mark as read';
    } else {
      e.target.className = 'btn-success';
      e.target.textContent = 'Mark as unread';
    }
  }


  removeBook(e) {
    const warning = window.confirm('Are you sure you want to remove this book?');
    if (warning) {
      const bookIndex = myLibrary.indexOf(e.target);
      myLibrary.splice(bookIndex, 1);
      e.target.offsetParent.parentElement.parentElement.remove();
      this.saveLocal();
    } else {
      this.saveLocal();
      }
  }

  card(book) {
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
  btn1.textContent = this.status(book);
  btn1.addEventListener('click', this.changeStatus);

  const btn2 = document.createElement('button');
  btn2.setAttribute('type', 'button');
  btn2.className = 'btn btn-danger';
  btn2.textContent = 'Remove Book';
  btn2.addEventListener('click', this.removeBook);

  row.appendChild(div);
  div.appendChild(ul);
  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);
  li4.appendChild(btn1);
  li4.appendChild(btn2);
  ul.appendChild(li4);
}

  loop() {
    row.innerHTML = '';
    myLibrary.forEach((book) => {
      this.card(book);
    });
  }

  populateData() {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    if (myLibrary === null) {
      myLibrary = [];
    }
    this.loop();
  }
}


let book = new Books(title.value, author.value, page.value, read.checked);
close.addEventListener('click', closeButton);
btn.addEventListener('click', book.addBook);
  function closeButton() {
    book.hideForm();
    book.resetForm();
  }
function addBookToLibrary() {
  if (title.value === '' || author.value === '' || page.value === '') {
    alert('Fields with * must not be blank');
  } else {
    book = new Books(title.value, author.value, page.value, read.checked);
    myLibrary.push(book);
    book.saveLocal();
    book.loop();
    book.populateData();
    book.resetForm();
    book.hideForm();
  }
}

submit.addEventListener('click', addBookToLibrary);
book.populateData();
