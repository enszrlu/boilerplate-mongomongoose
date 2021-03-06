require('dotenv').config();

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);


const createAndSavePerson = (done) => {
  console.log('inside func')
  let document = new Person({ name: "Enes", age: 28, favoriteFoods: ["Manti", "Lahmacun", "Pide", "Koy Dolmasi"] })
  document.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, person) => {
    if (err) return console.error(err);
    done(null, person);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    done(null, person);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId, (_, person) => {
    person.favoriteFoods.push(foodToAdd);
    person.save((err, person) => {
      if (err) return console.error(err);
      done(null, person);
    });
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, person) => {
    if (err) return console.error(err);
    done(null, person);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, person) => {
    if (err) return console.error(err);
    done(null, person);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch }).sort({ name: 1 }).limit(2).select('-age').exec((err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
