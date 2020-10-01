'use-strict';

const express = require("express");
const cors = require('cors');

// Server Config
const PORT = 8080;
const app = express();
app.use(express.static("dist"));
app.use(cors());

// Server Routes
const itemsRoute = require('./routes/items.route');
app.use('/api/items', itemsRoute)
// app.get('/api/items/:id', itemsRoute)
const filtersRoute = require('./routes/filters.route');
app.get('/api/filters', filtersRoute)

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

// Server run
app.listen(process.env.PORT || PORT, () =>
  console.log(`Listening on port ${process.env.PORT || PORT}!`)
);
