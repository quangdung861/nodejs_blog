const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');

const route = require('./routes');
const db = require('./config/db');
const SortMiddleware = require('./app/middleware/SortMiddleware');

db.connect();

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());
app.use(methodOverride('_method'));

// app.use(bacBaoVe)
app.use(SortMiddleware);

app.get(
  '/middleware',
  function (req, res, next) {
    if (['vethuong', 'vevip'].includes(req.query.ve)) {
      req.face = 'Gach gach gach!!!';
      return next();
    }
    res.status(403).json({ message: 'Access denied' });
  },
  function (req, res, next) {
    res.json({
      message: 'Successfully!',
      face: req.face,
      ve: req.query.ve,
    });
  },
);

// app.use(morgan("combined"));

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
      sortable: (filed, sort) => {
        const sortType = filed === sort.column ? sort.type : 'default';

        const icons = {
          default: 'oi oi-elevator',
          asc: 'oi oi-sort-ascending',
          desc: 'oi oi-sort-descending',
        };

        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
        };

        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href="?_sort&column=${filed}&type=${type}">
        <span class="${icon}"></span>
      </a>`;
      },
    },
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// function bacBaoVe(req, res, next) {
//   if (["vethuong", "vevip"].includes(req.query.ve)) {
//     req.face = "Gach gach gach!!!";
//     return next();
//   }
//   res.status(403).json({ message: "Access denied" });
// }
