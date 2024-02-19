function addBook() {
  document.getElementById("book_input_dialog").showModal();
}
function deleteBook(event) {
  let isDelete = confirm("Delete selected book?");
  if (!isDelete) {
    return;
  }
  deleteData("http://127.0.0.1:3007/library/" + event.id).then(() => {
    location.reload();
  });
}
function updateTable(body) {
  let grid = `
  <caption><td></td>
    <td><b>AUTHOR</b></td>
    <td><b>TITLE<b></td><td><b>YEAR<b></td></caption>`;
  body.forEach((book) => {
    grid += `
    <tr> 
    <td class="fa-ul"><i class="fa fa-times-circle" aria-hidden="true" id="${book.id}" onclick="deleteBook(this)"></i></td>
    <td><a href="library/${book.id}">${book.author}</a></td>
    <td><a href="library/${book.id}"> &quot;${book.title}&quot;</a></td>
    <td><a href="library/${book.id}">${book.year}</a></td>
   </tr>`;
  });
  document.getElementById("book_table").innerHTML = grid;
}

document.getElementById("book_input_button").addEventListener("click", () => {
  mAuthor = document.getElementById("input_author_text").value;
  mTitle = document.getElementById("input_title_text").value;
  mYear = document.getElementById("input_year_text").value;
  mCover = document.getElementById("input_cover_text").value;
  mStatus = "in";

  document.getElementById("book_input_dialog").close();
  postData("", {
    author: mAuthor,
    title: mTitle,
    year: mYear,
    status: mStatus,
    cover: mCover,
  }).then(() => {
    location.reload();
  });
});

function buttonEnable() {
  document.getElementById("book_input_button").disabled =
    !(document.getElementById("input_author_text").value &&
    document.getElementById("input_title_text").value);
}

document.getElementById("filter").addEventListener("change", (event) => {
  let url = `http://127.0.0.1:3007/filter?filter=${event.target.value}`;
  getData(url).then((response) => {
    response.json().then((body) => {
      updateTable(body);
    });
  });
});

const getData = async (url = "", data = {}) => {
  // Формируем запрос
  const response = await fetch(url, {
    // Метод, если не указывать, будет использоваться GET
    method: "GET",
    // Заголовок запроса
  });
  return response;
};
const postData = async (url = "", data = {}) => {
  // Формируем запрос
  const response = await fetch(url, {
    // Метод, если не указывать, будет использоваться GET
    method: "POST",
    // Заголовок запроса
    headers: {
      "Content-Type": "application/json",
    },
    // Данные
    body: JSON.stringify(data),
  });
  return response;
};

const deleteData = async (url = "") => {
  // Формируем запрос
  const response = await fetch(url, {
    // Метод, если не указывать, будет использоваться GET
    method: "DELETE",
    // Заголовок запроса
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
