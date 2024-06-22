const mongoose = require('mongoose');
require('dotenv').config();



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

//   create and save record
const Person = require('./models/person');

const createAndSavePerson = () => {
  const person = new Person({
    name: 'John Doe',
    age: 30,
    favoriteFoods: ['Pizza', 'Burger']
  });

  person.save((err, data) => {
    if (err) return console.error(err);
    console.log('Person saved:', data);
  });
};

createAndSavePerson();



// create many records using model.create

const arrayOfPeople = [
    { name: 'Jane Doe', age: 25, favoriteFoods: ['Salad', 'Pasta'] },
    { name: 'Mike Smith', age: 35, favoriteFoods: ['Steak', 'Fries'] },
    { name: 'Mary Johnson', age: 28, favoriteFoods: ['Sushi', 'Ramen'] }
  ];
  
  const createManyPeople = (arrayOfPeople) => {
    Person.create(arrayOfPeople, (err, people) => {
      if (err) return console.error(err);
      console.log('People created:', people);
    });
  };
  
  createManyPeople(arrayOfPeople);
  

//   model.find to search database
const findPeopleByName = (name) => {
    Person.find({ name }, (err, people) => {
      if (err) return console.error(err);
      console.log('People found:', people);
    });
  };
  
  findPeopleByName('John Doe');
  

//   use model.findOne() to return a single matching document
const findOneByFood = (food) => {
    Person.findOne({ favoriteFoods: food }, (err, person) => {
      if (err) return console.error(err);
      console.log('Person found:', person);
    });
  };
  
  findOneByFood('Pizza');
  

//   use model.findById() to search database by id
const findPersonById = (personId) => {
    Person.findById(personId, (err, person) => {
      if (err) return console.error(err);
      console.log('Person found by ID:', person);
    });
  };
  
  // Example: replace 'personId' with an actual ID
  findPersonById('personId');


//   perform update by find, edit and save

const findEditThenSave = (personId) => {
    Person.findById(personId, (err, person) => {
      if (err) return console.error(err);
  
      person.favoriteFoods.push('hamburger');
  
      person.save((err, updatedPerson) => {
        if (err) return console.error(err);
        console.log('Person updated:', updatedPerson);
      });
    });
  };
  
  // Example: replace 'personId' with an actual ID
  findEditThenSave('personId');

//   perform new updates on a document by using model.findOneAndUpdate
const findAndUpdate = (personName) => {
    Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true },
      (err, updatedPerson) => {
        if (err) return console.error(err);
        console.log('Person updated:', updatedPerson);
      }
    );
  };
  
  findAndUpdate('John Doe');
//   delete one document by using model.findByIdAndRemove
const removeById = (personId) => {
    Person.findByIdAndRemove(personId, (err, removedPerson) => {
      if (err) return console.error(err);
      console.log('Person removed:', removedPerson);
    });
  };
  
  // Example: replace 'personId' with an actual ID
  removeById('personId');
  

//   delete many documents with model.remove

const removeManyPeople = (name) => {
    Person.remove({ name }, (err, result) => {
      if (err) return console.error(err);
      console.log('People removed:', result);
    });
  };
  
  removeManyPeople('Mary Johnson');

//   chain search query helpers to narrow search results
const queryChain = () => {
    Person.find({ favoriteFoods: 'burritos' })
      .sort('name')
      .limit(2)
      .select('-age')
      .exec((err, people) => {
        if (err) return console.error(err);
        console.log('People found:', people);
      });
  };
  
  queryChain();
  
  

  
  
  