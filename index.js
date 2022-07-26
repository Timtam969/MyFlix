const express = require('express');
morgan = require('morgan');

const app = express();

app.use(express.static('public'));
app.use(morgan('common'));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

  let movies = [
    {
      title: 'Lord of the Rings',
      author: 'J.R.R. Tolkien',
      productionCompany: 'New Line Cinema, WingNut Films',
      director: 'Peter Jackson',
      actors: 'Martin Freeman, Ian McKellen, Richard Armitage, Benedict Cumberbatch, Evangeline Lilly, Lee Pace, Luke Evans, James Nesbitt, Ken Stott, Stephen Fry, Cate Blanchett, Ian Holm, Christopher Lee, Hugo Weaving, Elijah Wood, Orlando Bloom, Andy Serkis'
    },

    {
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      productionCompany: 'New Line Cinema, WingNut Films, Metro-Goldwyn-Mayer',
      director: 'Peter Jackson',
      actors: 'Elijah Wood, Ian McKellen, Liv Tyler, Viggo Mortensen, Sean Astin, Cate Blanchett, John Rhys-Davies, Christopher Lee, Billy Boyd, Dominic Monaghan, Orlando Bloom, Hugo Weaving, Andy Serkis, Sean Bean'
    },

    {
      title: 'War Dogs',
      author: 'Guy Lawson',
      productionCompany: 'Warner Bros. Pictures',
      director: 'Todd Phillips',
      actors: 'Jonah Hill, Miles Teller, Ana de Armas, Bradley Cooper'
    },

    {
      title: 'Blade',
      author: 'Marv Wolfman, Gene Colan',
      productionCompany: 'Marvel Enterprises, Amen Ra Films, Imaginary Forces',
      director: 'Peter Frankfurt, Wesley Snipes, Patrick Palmer',
      actors: 'Wesley Snipes, Kris Kristofferson, Ron Perlman, Leonor Varela, Norman Reedus, Luke Goss'
    },

    {
      title: '12 monkeys',
      author: 'Chris Marker',
      productionCompany: 'Universal Pictures',
      director: 'Charles Roven',
      actors: 'Bruce Willis, Madeleine Stowe, Brad Pitt, Christopher Plummer'
    },

    {
      title: 'Fight Club',
      author: 'Chuck Palahniuk',
      productionCompany: 'Fox 2000 Pictures, Regency Enterprises,New Regency, Linson Films',
      director: 'Art Linson, Ceán Chaffin, Ross Grayson Bell',
      actors: 'Brad Pitt, Edward Norton, Helena Bonham Carter'
    },

    {
      title: 'Seven',
      author: 'Andrew Kevin Walker',
      productionCompany: 'New Line Cinema',
      director: 'Arnold Kopelson, Phyllis Carlyle',
      actors: 'Brad Pitt, Morgan Freeman, Gwyneth Paltrow, John C. McGinley'
    },

    {
      title: 'Good Will Hunting',
      author: 'Ben Affleck, Matt Damon',
      productionCompany: 'Miramax Films',
      director: 'Lawrence Bender',
      actors: 'Robin Williams, Matt Damon, Ben Affleck, Stellan Skarsgård, Minnie Driver'
    },

    {
      title: 'Harry Potter',
      author: 'J. K. Rowling',
      productionCompany: 'Warner Bros. Pictures, Heyday Films, 1492 Pictures (1–3)',
      director: 'Chris Columbus (1–2), Alfonso Cuarón (3), Mike Newell (4), David Yates (5–8)',
      actors: 'Daniel Radcliffe, Rupert Grint, Emma Watson'
    },

    {
      title: 'Avatar',
      author: 'James Cameron',
      productionCompany: '20th Century Fox',
      director: 'James Cameron. Jon Landau',
      actors: 'Sam Worthington, Zoe Saldana, Stephen Lang, Michelle Rodriguez, Sigourney Weaver'
    }
  ];

  // GET requests
  app.get('/', (req, res) => {
    res.send('Welcome to our Movie Search Site');
  });

  app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
  });

  app.get('/movies', (req, res) => {
    res.json(movies);
  });




  // listen for requests
  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });
