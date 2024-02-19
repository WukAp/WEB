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

  function goBack(){
    location.assign('http://127.0.0.1:3007/library')
  }
  function showInfo() {
    document.getElementById("info_dialog").showModal();
  }
  function showRent() {
    document.getElementById("rent_dialog").showModal();
  }
  function closeInfoDialog() {
    document.getElementById("info_dialog").close();
  }
  function rentBookDialod() {
    mName = document.getElementById("input_name").value;
    mContacts = document.getElementById("input_contacts").value;
    mDate =  new Date();

    document.getElementById("rent_dialog").close();
  
  postData(window.location.href+"/set_status_out", {
name:mName, 
contacts:mContacts, 
date:mDate
  }).then(() => {
    location.reload();
  });
  }
  function returnToLibrary(){
    postData(window.location.href+"/set_status_in", {
    }).then(() => {
      location.reload();
    });
  }
  document.getElementById("book_update_button").addEventListener("click", () => {
    mAuthor = document.getElementById("input_author_text").value;
    mTitle = document.getElementById("input_title_text").value;
    mYear = document.getElementById("input_year_text").value;
  
    postData("", {
      author: mAuthor,
      title: mTitle,
      year: mYear
    })
  });