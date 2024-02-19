require("../css/style.css");

$("#goBack").on("click", () => {
  location.assign("https://127.0.0.1:8443/adminModule/users");
});

$("#user_update_button").on("click", () => {
  data = {
    name: document.getElementById("input_name").value,
    date_of_birth: document.getElementById("input_date_of_birth").value,
    email: document.getElementById("input_email").value,
    role: document.getElementById("input_role").value,
    status: document.getElementById("input_status").value,
  };
  console.log(data);
  console.log(document.getElementById("input_role"));
  $.post("", data).done((data) => {
    
  });
});
$("#show_news_button").on("click", () => {
  location.assign(window.location.href+"/news");
});
// $(function() {

//   var names = ["Катя", "Маша"];
  
//   $('input').autocomplete({
//       source: names
//   })
// });
