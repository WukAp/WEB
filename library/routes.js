import express from "express";

const app = express();

const router = express.Router();
export { router };
import fs from "fs";

let books;
fs.readFile("public/books.json", (err, data) => {
  if (err) throw err;
  books = JSON.parse(data);
});

function updateJSON(books) {
  let booksJSON = JSON.stringify(books);
  fs.writeFile("public/books.json", booksJSON, (err) => {
    if (err) console.log("Error!");
  });
}
router.get("/library/:num", (request, response, next) => {
  let id = request.params.num;
  for (let value in books)
    if (books[value].id == id) {
      console.log(books[value])
      response.render("bookCard", {
        book: books[value]
      });
    }
  next();
});
router.get("/filter", (request, response) => {
  let filter = request.query.filter;
  console.log(filter);
  let bufBook;
  switch (filter) {
    case "in_stock":
      bufBook = books.filter((book) => {
        if (book.status == "in") return true;
      });
      break;
    case "rented":
      bufBook = books.filter((book) => {
        if (book.status == "out") return true;
      });
      break;
    case "overdue":
      bufBook = books.filter((book) => {
        const DAYS = 14;
        if (Date.now() - Date.parse(book.date) > 3600 * 1000 * 24 * DAYS)
          return true;
      });
      break;
    default:
      bufBook = books;
  }
  response.json(bufBook);
});
router.get("/library", (request, response) => {
  response.render("library", {
    books: books,
  });
});


router.post("/library", (request, response) => {
  const body = request.body;
  console.log(body, "post book");
  if (!body.author || !body.title || !body.status) {
    return response.sendStatus(400);
  }
  books.push({
    author: body.author,
    title: body.title,
    year: body.year,
    status: body.status,
    cover: body.cover,
    id: books[books.length - 1].id + 1,
  });
  updateJSON(books);
  response.sendStatus(200);
});

router.post("/library/:num/set_status_in", (request, response, next) => {
  console.log("post num set_status_in")
  let id = request.params.num;
  for (let value in books)
    if (books[value].id == id) {
      books[value].status= "in"
      delete books[value].date
      delete books[value].contacts
      delete books[value].reader

  updateJSON(books);
    }
  next();
});
router.post("/library/:num/set_status_out", (request, response, next) => {
  console.log("post num set_status_out")
  let id = request.params.num;
  for (let value in books)
    if (books[value].id == id) {
      books[value].status= "out"
      books[value].date = request.body.date
      books[value].contacts = request.body.contacts
      books[value].reader = request.body.name

  updateJSON(books);
    }
  next();
});

router.post("/library/:num", (request, response, next) => {
  console.log("post num")
  let id = request.params.num;
  for (let value in books)
    if (books[value].id == id) {
      books[value].author = request.body.author
      books[value].title = request.body.title
      books[value].year = request.body.year

  updateJSON(books);
    }
  next();
});

router.delete("/library/:num", (request, response) => {
  let id = request.params.num;
  console.log("delete book", id);
  for (let value in books)
    if (books[value].id == id) {
      books.splice(value, 1);
    }
  updateJSON(books);
  response.sendStatus(200);
});
