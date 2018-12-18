
// import database connection from db folder
const db = require("../db/connection.js");

// ROUTES
module.exports = function (app) {
  router.get("/", function (req, res) {
    db.query("SELECT * FROM articles", (err, tableData) => {

      if (err) {
        console.log(err);
        return res.status(500).end();
      }
      // send array of notes back
      res.json(tableData);
    });

  });

  // 
  app.get("/api/scrape", function (req, res) {
    db.query("SELECT * FROM notes", (err, tableData) => {

      if (err) {
        console.log(err);
        return res.status(500).end();
      }
      // send array of notes back
      res.json(tableData);
    });

  });

  // NOTE ROUTE
  app.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
      .then(function(dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
      })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // Route for grabbing a specific Article by id, populate it with it's note
  app.get("/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
      .populate("note")
      .then(function (dbArticle) {
        res.json(dbArticle);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });


  // DELETE route
  app.delete("/api/notes/:id", function (req, res) {
    // // get post data from req.body
    const deleteId = req.params.id;
    console.log("look here", deleteId);
    // query database to delete submitted notes
    db.query("SELECT * FROM notes", (err, tableData) => {

      db.query("DELETE FROM notes WHERE id = ?", deleteId, (err, deleteId) => {
        if (err) {
          console.log(err);
          return res.status(500).end();
        }
        res.json(deleteId)
      });
    });
  });


}