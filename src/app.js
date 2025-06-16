const express = require('express');
const indexRoute = require('./routes/indexRoute');
const itemRoute = require('./routes/itemRoute');
const categoryRoute = require('./routes/categoryRoute');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRoute);
app.use('/category', categoryRoute);
app.use('/item', itemRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = 500;
  const errMessage = 'Internal Server Error';
  res.status(statusCode).send(errMessage);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
