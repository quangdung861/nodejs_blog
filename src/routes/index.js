const newsRouter = require('./news');
const meRouter = require('./me');
const siteRouter = require('./site');
const coursesRouter = require('./courses');

function route(app) {
  app.use('/news', newsRouter);
  app.use('/courses', coursesRouter);
  app.use('/me', meRouter);

  app.use('/', siteRouter);

  // app.get("/", (req, res) => {
  //   res.render("home");
  // });

  // app.get("/search", (req, res) => {
  //   res.render("search");
  // });

  // app.post("/search", (req, res) => {
  //   console.log(req.body);
  //   res.send("");
  // });
}

module.exports = route;
