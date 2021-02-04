let title = document.querySelector('#title');
let author = document.querySelector('#author');
let pages = document.querySelector('#page')
let read = document.querySelector('#read')
let btn = document.querySelector('#btn');
let add = document.querySelector('#add-book');
let submit = document.querySelector('#submit');
let row = document.querySelector('.row')

let myLibrary = [];

function Books(title, author, page, read){
  this.title = title;
  this.author = author;
  this.page = page;
  this.read = read;
}

