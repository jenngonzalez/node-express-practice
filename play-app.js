const express = require('express');
const morgan = require('morgan');
const playstore = require('./playstore');

const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) => {
    const { search ="", sort, genres } = req.query;

    if(sort) {
        if(!['rating', 'app'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be one of rating or app');
        }
    }

    if(genres) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res
                .status(400)
                .send('Genre must be one of: Action, Puzzle, Strategy, Casual, Arcade or Card');
        }
    }

    let results = playstore.filter(app =>
                            app
                                .App
                                .toLowerCase()
                                .includes(search.toLowerCase()));

    // if(genres) {
    //     // str.includes(searchString) ?
    //     const filterFunction = searchString => {
    //         results.Genres.includes(genres)
    //     }
    // }
    
    if(sort) {
        results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        })
    }

    res
        .json(results);
 })

 app.listen(8000, () => {
     console.log('Server started on PORT 8000');
 });


 // sort parameter with rating or app as value
 // any other value returns an error
 // if no value provided then don't sort

 // genres parameter, with one of: action, puzzle, strategy, casual, arcade, card
 // If present the value must be one of the list otherwise an error is returned. Filter the list by the given value.
