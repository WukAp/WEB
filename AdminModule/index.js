

let expr = require("express");
let fs = require("fs");

const app = expr();
const router = expr.Router();
app.use(expr.static("/snap/WEB_LABS-main/AdminModule/public"));
app.set("view engine", "pug");

app.use(expr.urlencoded({ extended: true }));
app.use(expr.json());
app.use("/", router);
var http = require('http');
var https = require('https');
var httpsServer =
  https.createServer({
    cert: fs.readFileSync('public/ssl_cert/server.crt', 'utf8'),
    key: fs.readFileSync('public/ssl_cert/key.pem', 'utf8')
  }, app);
httpsServer.listen(8443);

const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: { origin: '*' }
});

const port = 3000;


httpServer.listen(port, () => console.log(`listening on port ${port}`));

let users;
fs.readFile("public/users.json", (err, data) => {
  if (err) throw err;
  users = JSON.parse(data);
});
let enums;
fs.readFile("public/enums.json", (err, data) => {
  if (err) throw err;
  enums = JSON.parse(data);
});
let news;
fs.readFile("public/news.json", (err, data) => {
  if (err) throw err;
  news = JSON.parse(data);
});
let messages;
fs.readFile("public/messages.json", (err, data) => {
  if (err) throw err;
  messages = JSON.parse(data);
});

function updateJSON(users) {
  let usersJSON = JSON.stringify(users);
  fs.writeFile("public/users.json", usersJSON, (err) => {
    if (err) console.log(err, "Error!");
  });
}
function updateNewJSON(news) {
  let newsJSON = JSON.stringify(news);
  fs.writeFile("public/news.json", newsJSON, (err) => {
    if (err) console.log("Error!");
  });
}
  function updateMessageJSON(messages) {
    let messagesJSON = JSON.stringify(messages);
    fs.writeFile("public/messages.json", messagesJSON, (err) => {
      if (err) console.log("Error!");
    });
  }
io.on("connection", (socket) => { 
  socket.on('msg', (msg) => { // Сообщение "msg"
    msgSTR = `${msg.message.data} ${users.find(el => el.id == msg.message.from_id).name}: ${msg.message.body}` // Сообщение
    console.log(msg)
    messages.push(msg.message)
    updateMessageJSON(messages);
    socket.emit("msg", msg.message); // Отправка "обратно"
    socket.broadcast.emit("msg", msg.message); /* Отправка
  всем */
  });
});
router.get("/adminModule/users", (request, response) => {
  response.render("users", {
    users: users
  });
});
router.get("/adminModule/usersJson", (request, response) => {

  response.json(users);
});
router.get("/adminModule/messageJson/:num1/:num2", (request, response) => {
  let friend_id = request.params.num1;
  let my_id = request.params.num2;
  
  
  const usersMessages = messages.filter((message) => message.to_id==friend_id&&message.from_id==my_id
  || message.to_id==my_id&&message.from_id==friend_id);
  
  console.log(usersMessages)
  response.json(usersMessages);
});router.get("/adminModule/newsJson/:num", (request, response) => {
  let id = request.params.num;
  let currentUser = users.find(el => el.id == id)
  console.log(currentUser)
  console.log(id)
  const usersNews = news.filter((userNew) => currentUser.friends.includes(userNew.id) || userNew.id == id);
  for (let el of usersNews) {
    const user = users.find(e => e.id == el.id)
    el.name = user.name
    el.avatar = user.avatar
  }
  usersNews.reverse()
  console.log(usersNews)
  response.json(usersNews);
});
router.get("/adminModule/users/:num", (request, response, next) => {
  let id = request.params.num;
  let currentUser = users.find(el => el.id == id)
  const friends = users.filter((user) => currentUser.friends.includes(user.id));
  console.log(friends)
  response.render("userCard", {
    user: currentUser,
    enums: enums,
    friends: friends
  });

  next();
});
router.get("/adminModule/users/:num/news", (request, response, next) => {
  let id = request.params.num;
  let currentUser = users.find(el => el.id == id)
  const usersNews = news.filter((userNew) => currentUser.friends.includes(userNew.id));
  for (let el of usersNews) {
    const user = users.find(e => e.id == el.id)
    el.name = user.name
    el.avatar = user.avatar
  }

  console.log(usersNews)
  response.render("usersNews", { usersNews: usersNews });

  next();
});

router.post("/adminModule/users/:num", (request, response, next) => {
  console.log("post user", request.body)
  let id = request.params.num;
  for (let value in users)
    if (users[value].id == id) {
      users[value].name = request.body.name
      users[value].date_of_birth = request.body.date_of_birth
      users[value].email = request.body.email
      users[value].role = request.body.role
      users[value].status = request.body.status
      if (request.body.avatar)
        users[value].avatar = request.body.avatar
      if (request.body.friends)
        users[value].friends = request.body.friends.filter(e => e)

      updateJSON(users);
    }
  next();
});
router.post("/adminModule/new", (request, response, next) => {
  console.log("post new", request.body)
  news.push(request.body)
  updateNewJSON(news);
  next();
});
router.post("/adminModule/newUser", (request, response, next) => {
  console.log("post new user", request.body)
  if (users.filter(el => el.email == request.body.email).lenght > 0) {
    response.status(403).send(`User exstis`);
  } else {
    users.push(request.body)
    updateJSON(users);
    response.status(200).send();
  }
  next();
});