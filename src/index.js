const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const morgan = require('morgan');

const route = require('./routes');
const db = require('./config/db');

db.connect();

const app = express();
const port = 3000;

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

// app.use(morgan("combined"));

app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
