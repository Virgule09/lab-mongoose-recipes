const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    //console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // iteration 2
    // Recipe.create(data[0]);

    return Recipe.insertMany(data);
  })
  .then( result => {
    return Recipe.find({duration :{$gte:0}} ,"title" );
  })
  .then(titles => {
    console.log(titles)
  } )
  .then(() => {
    const filter = { title: "Rigatoni alla Genovese" };
    const update = { duration: 100 };
    return Recipe.findOneAndUpdate(filter, update);
  })
  .then( () => {
    console.log("Succes the recipe has been upadted !")
  }) 
  .then( () => {
    return Recipe.deleteOne({title: 'Carrot Cake' })
  }) 
  .then( () => {
    console.log("Succes the recipe was deleted")
  }) 
  .then( () => {
    mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

