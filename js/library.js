let title = document.querySelector('#title');
let author = document.querySelector('#author');
let pages = document.querySelector('#page')
let read = document.querySelector('#read')
let btn = document.querySelector('#btn');
let add = document.querySelector('#add-book');
let submit = document.querySelector('#submit');
let close = document.querySelector('#close');
let row = document.querySelector('.row')

let myLibrary = [];

function Books(title, author, page, read){
  this.title = title;
  this.author = author;
  this.page = page;
  this.read = read;
}

function saveLocal() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function populateData(){
  myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  if(myLibrary === null){
    myLibrary = []
  }
  loop()
}

btn.addEventListener('click', addBook);

submit.addEventListener('click', addBookToLibrary);
close.addEventListener('click', closeButton);

function closeButton(){
  hideForm();
  resetForm();
}

function addBook(){
  add.className = 'd-block'
}

function status(book){
  if(book.read){
    return 'Mark as unread'
  }else {
    return 'Mark as read'
  }
}

function changeStatus(e){
if(e.target.textContent == 'Mark as unread'){
    e.target.className = 'btn-secondary'
    e.target.textContent = 'Mark as read';
  } else{
    e.target.className = 'btn-success'
    e.target.textContent = 'Mark as unread'
    read.value = true
  }
}

function removeBook(e){
  let warning = confirm('Are you sure you want to remove this book?');
  if(warning){
    let bookIndex = myLibrary.indexOf(e.target);
    myLibrary.splice(bookIndex, 1);
    e.target.offsetParent.parentElement.parentElement.remove();
    saveLocal()
  }else {
    saveLocal
  }

}

function card(book){
  let div = document.createElement('div')
  div.className = 'card, bg-primary col-6 pb-3'

  let ul = document.createElement('ul');
  ul.classList.add('list-group');
  ul.classList.add('list-group-flush');
  ul.classList.add('mt-4');

  let li1 = document.createElement('li');
  li1.classList.add('list-group-item');
  li1.textContent = book.title;

  let li2 = document.createElement('li');
  li2.classList.add('list-group-item');
  li2.textContent = `by ${book.author}`;

  let li3 = document.createElement('li');
  li3.classList.add('list-group-item');
  li3.textContent = `${book.page} pages`;

  let li4 = document.createElement('li');    
  li4.classList.add('list-group-item');
  li4.classList.add('d-flex');
  li4.classList.add('justify-content-between');

  let btn1 = document.createElement('button');
  btn1.setAttribute('type', 'button');
  btn1.className = 'btn btn-success';
  btn1.textContent = status(book);
  btn1.addEventListener('click', changeStatus);

  let btn2 = document.createElement('button');
  btn2.setAttribute('type', 'button');
  btn2.className = 'btn btn-danger';
  btn2.textContent = 'Remove Book';
  btn2.addEventListener('click', removeBook);

  row.appendChild(div)
  div.appendChild(ul)
  ul.appendChild(li1)
  ul.appendChild(li2)
  ul.appendChild(li3)
  li4.appendChild(btn1)
  li4.appendChild(btn2)
  ul.appendChild(li4)
}

function loop(){
  row.innerHTML = ''
  myLibrary.forEach((book) => {
    card(book)
    
  })
}

function hideForm(){
  add.className = 'd-none'
}

function resetForm(){
  title.value = ''
  author.value = ''
  page.value = ''
  read.checked = true
}

function addBookToLibrary(){
  if(title.value == '' || author.value == '' || page.value == ''){
    alert("Fields with * must not be blank")
  } else {
    let book = new Books(title.value, author.value, page.value, read.checked);
    myLibrary.push(book);
    saveLocal()
    loop()
    populateData();
    resetForm();
    hideForm()
  }
  
}

populateData()
