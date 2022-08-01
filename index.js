const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();

app.use(bodyParser.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

let users = [
  {
    id: 1,
    name: "Timothy Losper",
    favoriteMovies: []
  },
  {
    id: 2,
    name: "Doris Salvatore",
    favoriteMovies: ["Avatar"]
  },
  {
    id: 3,
    name: "Richard Garret",
    favoriteMovies: ["War Dogs"]
  }
];

let movies = [
  {
    title: "Lord of the Rings",
    Description:
      "An ancient Ring thought lost for centuries has been found, and through a strange twist of fate has been given to a small Hobbit named Frodo. When Gandalf discovers the Ring is in fact the One Ring of the Dark Lord Sauron, Frodo must make an epic quest to the Cracks of Doom in order to destroy it. However, he does not go alone. He is joined by Gandalf, Legolas the elf, Gimli the Dwarf, Aragorn, Boromir, and his three Hobbit friends Merry, Pippin, and Samwise. Through mountains, snow, darkness, forests, rivers and plains, facing evil and danger at every corner the Fellowship of the Ring must go. Their quest to destroy the One Ring is the only hope for the end of the Dark Lords reign.",
    genre: {
      name: "High Fantasy",
      Description:
        "High fantasy (or epic fantasy) is a fantasy subgenre in which the story takes place in a setting very unlike Earth and deals with world-threatening forces. The story might feature fantastic creatures, historic or unusual technologies, magical elements, and other unearthly elements. High fantasy does not need to incorporate Western fantasy tropes like swords or dragons, though these are common characteristics of the genre."
    },
    director: {
      name: "Peter Jackson",
      bio:
        "Born on October 31, 1961, in New Zeland, Peter Jackson started his prolific career as a child, creating short films with a 8-mm movie camera. Without any formal training, Jackson has directed a number of successful films ranging across all genres. He is most well-known for his film adaptation of J.R.R. Tolkien's Lord of the Rings trilogy, which has won numerous awards. He stayed with the Tolkien fantasy brand when The Hobbit film series was released.",
      birth: 1961
    },
    image:
      "https://www.themoviedb.org/t/p/w440_and_h660_face/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    featured: false
  },

  {
    title: "The Hobbit: An Unexpected Journey",
    Description:
      "The Hobbit is set within Tolkien's fictional universe and follows the quest of home-loving Bilbo Baggins, the titular hobbit, to win a share of the treasure guarded by a dragon named Smaug. Bilbo's journey takes him from his light-hearted, rural surroundings into more sinister territory.",
    genre: {
      name: "High Fantasy",
      Description:
        "High fantasy (or epic fantasy) is a fantasy subgenre in which the story takes place in a setting very unlike Earth and deals with world-threatening forces. The story might feature fantastic creatures, historic or unusual technologies, magical elements, and other unearthly elements. High fantasy does not need to incorporate Western fantasy tropes like swords or dragons, though these are common characteristics of the genre."
    },
    director: {
      name: "Peter Jackson",
      bio:
        "Born on October 31, 1961, in New Zeland, Peter Jackson started his prolific career as a child, creating short films with a 8-mm movie camera. Without any formal training, Jackson has directed a number of successful films ranging across all genres. He is most well-known for his film adaptation of J.R.R. Tolkien's Lord of the Rings trilogy, which has won numerous awards. He stayed with the Tolkien fantasy brand when The Hobbit film series was released.",
      birth: 1961
    },
    image:
      "https://www.themoviedb.org/t/p/original/uNtsO3uFjz7ZUr74LMAQf3GvxgZ.jpg",
    featured: false
  },

  {
    title: "War Dogs",
    Description: "",
    genre: {
      name: "comedy",
      Description:
        "A comedy film is a category of film which emphasizes humor. These films are designed to make the audience laugh through amusement.[1] Films in this style traditionally have a happy ending (black comedy being an exception). One of the oldest genres in film—and derived from the classical comedy in theatre—some of the earliest silent films were comedies, as slapstick comedy often relies on visual depictions, without requiring sound. When sound films became more prevalent during the 1920s, comedy films took another swing, as laughter could result from burlesque situations but also dialogue."
    },
    director: {
      name: "Todd Phillips",
      bio:
        "American screenwriter and film director Todd Phillips made his first while a junior at NYU and it went on to become one of the biggest grossing student films at the time, even getting a limited theatrical release.; the feature-length documentary “Hated: GG Allin and the Murder Junkies” He is best known for directing the comedy films Road Trip, Old School, The Hangover, and Due Date.",
      birth: 1970
    },
    image:
      "https://www.themoviedb.org/t/p/original/g6pAdG5mHcBKz9SWQfQrlDqa7XI.jpg",
    featured: false
  },

  {
    title: "Blade",
    Description:
      "The Daywalker known as 'Blade' - a half-vampire, half-mortal man - becomes the protector of humanity against an underground army of vampires.",
    genre: {
      name: "action",
      Description:
        "Action films are a film genre where action sequences, such as fighting, stunts, car chases or explosions, take precedence over elements like characterization or complex plotting. The action typically involves individual efforts on the part of the hero, in contrast with most war films. The genre is closely linked with the thriller and adventure film genres."
    },
    director: {
      name: "Stephen Norrington",
      bio:
        "Stephen Norrington (born 1964) is a British film director whose credits include Death Machine and the comic book adaptations Blade and The League of Extraordinary Gentlemen.",
      birth: 1964
    },
    image:
      "https://www.themoviedb.org/t/p/original/apA0Zj09ETKxXXCLH2VEsaCH0LV.jpg",
    featured: false
  },

  {
    title: "12 Monkeys",
    Description:
      "In the year 2035, convict James Cole reluctantly volunteers to be sent back in time to discover the origin of a deadly virus that wiped out nearly all of the earth's population and forced the survivors into underground communities. But when Cole is mistakenly sent to 1990 instead of 1996, he's arrested and locked up in a mental hospital. There he meets psychiatrist Dr. Kathryn Railly, and patient Jeffrey Goines, the son of a famous virus expert, who may hold the key to the mysterious rogue group, the Army of the 12 Monkeys, thought to be responsible for unleashing the killer disease.",
    genre: {
      name: "Science Fiction",
      Description:
        "Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, interstellar travel or other technologies. Science fiction films have often been used to focus on political or social issues, and to explore philosophical issues like the human condition."
    },
    director: {
      name: "Terry Gilliam",
      bio:
        "Terrence Vance 'Terry' Gilliam (born November 22, 1940) is an American-British screenwriter, film director, animator, actor and member of the Monty Python comedy troupe. Subsequent to his early work with the Pythons, Gilliam became known for directing fantasy and sci-fi films, including 'Time Bandits' (1981), 'Brazil' (1985), 'The Adventures of Baron Munchausen' (1988), 'The Fisher King' (1991), '12 Monkeys# (1995), 'Fear and Loathing in Las Vegas' (1998) and 'The Imaginarium of Doctor Parnassus' (2009). He is the only Python not born in Britain; he took British citizenship in 1968.",
      birth: 1940
    },
    image:
      "https://www.themoviedb.org/t/p/original/fCZnJSARoTbLefr9ThwWBSkJ7oR.jpg",
    featured: false
  },

  {
    title: "Fight Club",
    Description:
      "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground 'fight clubs' forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
    genre: {
      name: "Drama",
      Description:
        "Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature. A dramatic film shows us human beings at their best, their worst, and everything in-between. Each of the types of subject-matter themes have various kinds of dramatic plots. Dramatic films are probably the largest film genre because they include a broad spectrum of films."
    },
    director: {
      name: "David Fincher",
      bio:
        "David Andrew Leo Fincher (born August 28, 1962) is an American film director. His films, mostly psychological thrillers and biographical dramas, have received 40 nominations at the Academy Awards, including three for him as Best Director.",
      birth: 1962
    },
    image:
      "https://www.themoviedb.org/t/p/original/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg",
    featured: false
  },

  {
    title: "Seven",
    Description:
      "Two homicide detectives are on a desperate hunt for a serial killer whose crimes are based on the 'seven deadly sins' in this dark and haunting film that takes viewers from the tortured remains of one victim to the next. The seasoned Det. Sommerset researches each sin in an effort to get inside the killer's mind, while his novice partner, Mills, scoffs at his efforts to unravel the case.",
    genre: {
      name: "Crime",
      Description:
        "Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection. Stylistically, the genre may overlap and combine with many other genres, such as drama or gangster film,[1] but also include comedy, and, in turn, is divided into many sub-genres, such as mystery, suspense or noir."
    },
    director: {
      name: "David Fincher",
      bio:
        "David Andrew Leo Fincher (born August 28, 1962) is an American film director. His films, mostly psychological thrillers and biographical dramas, have received 40 nominations at the Academy Awards, including three for him as Best Director.",
      birth: 1962
    },
    image:
      "https://www.themoviedb.org/t/p/original/c6cPPttk4Pirbd0ywCVawW8Z6vc.jpg",
    featured: false
  },

  {
    title: "Good Will Hunting",
    Description:
      "Will Hunting has a genius-level IQ but chooses to work as a janitor at MIT. When he solves a difficult graduate-level math problem, his talents are discovered by Professor Gerald Lambeau, who decides to help the misguided youth reach his potential. When Will is arrested for attacking a police officer, Professor Lambeau makes a deal to get leniency for him if he will get treatment from therapist Sean Maguire.",
    genre: {
      name: "Drama",
      Description:
        "Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature. A dramatic film shows us human beings at their best, their worst, and everything in-between. Each of the types of subject-matter themes have various kinds of dramatic plots. Dramatic films are probably the largest film genre because they include a broad spectrum of films."
    },
    director: {
      name: "Gus Van Sant",
      bio:
        "Gus Green Van Sant, Jr. (born July 24, 1952) is an American director, screenwriter, painter, photographer, musician, and author. He was nominated for an Academy Award for Achievement in Directing for his 1997 film Good Will Hunting and his 2008 film Milk, and won the Palme d'Or at the 2003 Cannes Film Festival for his film Elephant. He lives in Portland, Oregon.",
      birth: 1952
    },
    image:
      "https://www.themoviedb.org/t/p/original/bABCBKYBK7A5G1x0FzoeoNfuj2.jpg",
    featured: false
  },

  {
    title: "Harry Potter and the Chamber of Secrets",
    Description:
      "Cars fly, trees fight back, and a mysterious house-elf comes to warn Harry Potter at the start of his second year at Hogwarts. Adventure and danger await when bloody writing on a wall announces: The Chamber Of Secrets Has Been Opened. To save Hogwarts will require all of Harry, Ron and Hermione’s magical abilities and courage.",
    genre: {
      name: "Adventure",
      Description:
        "An adventure film is a form of adventure fiction, and is a genre of film. Subgenres of adventure films include swashbuckler films, pirate films, and survival films. Adventure films may also be combined with other film genres such as action, animation, comedy, drama, fantasy, science fiction, family, horror, or war."
    },
    director: {
      name: "Chris Columbus",
      bio:
        "Chris Joseph Columbus (born September 10, 1958) is an American filmmaker. Born in Spangler, Pennsylvania, Columbus studied film at Tisch School of the Arts where he developed an interest in filmmaking. After writing screenplays for several teen comedies in the mid-1980s, he made his directorial debut with a teen adventure, Adventures in Babysitting (1987). Columbus gained recognition soon after with the highly successful Christmas comedy Home Alone (1990) and its sequel Home Alone 2: Lost in New York (1992).",
      birth: 1958
    },
    image:
      "https://www.themoviedb.org/t/p/original/sdEOH0992YZ0QSxgXNIGLq1ToUi.jpg",
    featured: false
  },

  {
    title: "Avatar",
    Description:
      "In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.",
    genre: {
      name: "Action",
      Description:
        "Action films are a film genre where action sequences, such as fighting, stunts, car chases or explosions, take precedence over elements like characterization or complex plotting. The action typically involves individual efforts on the part of the hero, in contrast with most war films. The genre is closely linked with the thriller and adventure film genres."
    },
    director: {
      name: "James Cameron",
      bio:
        "James Cameron was born in Kapuskasing, Ontario, Canada, on August 16, 1954. He moved to the USA in 1971. The son of an engineer, he majored in physics at California State University but, after graduating, drove a truck to support his screen-writing ambition. He landed his first professional film job as art director, miniature-set builder, and process-projection supervisor on Roger Corman's Battle Beyond the Stars (1980) and debuted as a director with Piranha Part Two: The Spawning (1981) the following year. In 1984, he wrote and directed The Terminator (1984), a futuristic action-thriller starring Arnold Schwarzenegger, Michael Biehn, and Linda Hamilton. It was a huge success. After this came a string of successful science-fiction action films such as Aliens (1986) and Terminator 2: Judgment Day (1991). Cameron is now one of the most sought-after directors in Hollywood. He was formerly married to producer Gale Anne Hurd, who produced several of his films. He married Kathryn Bigelow in 1989.",
      birth: 1954
    },
    image:
      "https://www.themoviedb.org/t/p/original/pgjs6VwqKa9COml98tqMGjIkoJG.jpg",
    featured: false
  }
];

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
  res.status(200).json(movies);
});

//Create Endpoint: Adds data for a new user to our list of users.
app.post("/users", (req, res) => {
  let newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  } else {
    res.status(400).send("User Name is required");
  }
});

//Update Endpoint: Allows the user to change his name.
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const newUserName = req.body;

  let user = users.find(user => user.id == id);

  if (user) {
    user.name = newUserName.name;
    res.status(200).send(user);
  } else {
    res.status(400).send("User not found");
  }
});

//Update Endpoint: Adds a favorite movie to a user.
app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
  } else {
    res.status(400).send("User not found");
  }
});

//Delete Endpoint: Deletes a favorite movie from a user.
app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    user.favoriteMovies.filter(title => title !== movieTitle);
    res
      .status(200)
      .send(`${movieTitle} has been removed from user ${id}'s array`);
  } else {
    res.status(400).send("User not found");
  }
});

//Delete Endpoint: Deletes user account.
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    users = users.filter(user => user.id != id);
    res.status(200).send(`User ${id}'s account has been closed`);
  } else {
    res.status(400).send("User not found");
  }
});
// Read endpoint: Returns all movie to the user by title search.
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find(movie => movie.title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("Movie not found");
  }
});

// Read endpoint: Returns Genre to the user by genre search.
app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find(movie => movie.genre.name === genreName).genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("Genre not found");
  }
});

// Read endpoint: Returns the directors information to the user by director name search.
app.get("/movies/director/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(movie => movie.director.name === directorName)
    .director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("Director not found");
  }
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
