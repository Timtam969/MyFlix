const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const uuid = require("uuid");
const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Read endpoint: home site
app.get("/", (req, res) => {
  res.send("Welcome to our Movie Search Site");
});

//Read endpoint: Documentation site and what is required from the user
app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

// Read endpoint: Returns all movies to the user.
app.get("/movies", (req, res) => {
  Movies.find()
    .then(movies => {
      res.status(200).json(movies);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Read endpoint: Returns all movie to the user by title search.
app.get("/movies/:Title", (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then(movie => {
      res.status(200).json(movie);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Read endPoint: Returns info of a specific Genre by Genre Name
app.get("/movies/genre/:Name", (req, res) => {
  Movies.findOne({ "Genre.Name": req.params.Name })
    .then(movies => {
      res.status(200).json(movies);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Read endpoint: Returns the directors information to the user by director name search.
app.get("/movies/director/:Name", (req, res) => {
  Movies.find({ "Director.Name": req.params.Name })
    .then(movies => {
      res.status(200).json(movies);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post("/users", (req, res) => {
  Users.findOne({ Name: req.body.Name })
    .then(user => {
      if (user) {
        return res.status(400).send(req.body.Name + " already exists");
      } else {
        Users.create({
          Name: req.body.Name,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then(user => {
            res.status(201).json(user);
          })
          .catch(error => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//Update user information
app.put("/users/:Name", (req, res) => {
  Users.findOneAndUpdate(
    { Name: req.params.Name },
    {
      $set: {
        Name: req.body.Name,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.status(201).json(updatedUser);
      }
    }
  );
});

// Add a movie to a user's list of favorites
app.post("/users/:Name/movies/:movieID", (req, res) => {
  Users.findOneAndUpdate(
    { Name: req.params.Name },
    {
      $push: { FavoriteMovies: req.params.movieID }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.status(201).json(updatedUser);
      }
    }
  );
});

//Delete Endpoint: Deletes a favorite movie from a user.
app.delete("/users/:Name/movies/:movieID", (req, res) => {
  Users.findOneAndUpdate(
    { Name: req.params.Name },
    {
      $pull: { FavoriteMovies: req.params.movieID }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.status(201).json(updatedUser);
      }
    }
  );
});

// Get a user by username
app.get("/users/:Name", (req, res) => {
  Users.findOne({ Name: req.params.Name })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Delete a user by username
app.delete("/users/:Name", (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Name })
    .then(user => {
      if (!user) {
        res.status(400).send(req.params.Name + " was not found");
      } else {
        res.status(200).send(req.params.Name + " was deleted.");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
