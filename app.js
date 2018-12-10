var mongo = require("mongoose");
mongo.connect(process.env.MONGO_URI);


const Schema = mongo.Schema;

const personschema = new Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: {type: [String], default: 'Pizza'}
});

var Person = new mongo.model('Person',personschema);


var createAndSavePerson = function(done) {
  var person = new Person({name:'Bene',age:20,favoriteFoods:'Burger'});
  person.save(function(err,data){
    if(err) return err;
    return done(null,data);
  });
};

var createManyPeople = function(arrayOfPeople, done) {
    Person.create(arrayOfPeople,function(err,data){
      if(err) return done(err);
      return done(null,data);
    });    
};


var findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function(err,data){
    if(err)return done(err);
    return done(null, data);
  });
};


var findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: food},function(err,data){
    if(err)return done(err);
    return done(null,data);
  });
};


var findPersonById = function(personId, done) {
  Person.findById(personId,function(err,data){
    if(err)return done(err);
    return done(err,data);
  })
};


var findEditThenSave = function(personId, done) {
  var foodToAdd = 'hamburger';
  Person.findById(personId,function(err,data){
    if(err)return done(err);
    console.log(data);
    data.favoriteFoods.push(foodToAdd);
    data.save(function(err,data){
      if(err) return done(err);
      return done(null,data);
      });
    });
};


var findAndUpdate = function(personName, done) {
  var ageToSet = 20;
  Person.findOneAndUpdate({name: personName},{$set: {age:ageToSet}},{new :true},function(err,data){
    if(err) return done(err);
    return done(null,data)
  });
};


var removeById = function(personId, done) {
  Person.findByIdAndRemove(personId,function(err,data){
    if(err)return done(err);
    return done(null,data);
  });
};


var removeManyPeople = function(done) {
  var nameToRemove = "Mary";
  Person.remove({name:nameToRemove},function(err,data){
    if(err) return done(err);
    return done(null, data);
  });
};


var queryChain = function(done) {
  var foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch}).sort({name:'asc'}).limit(2).select("-age").exec(function(err,data){
    if(err)return done(err);
    return done(err,data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

/** # Further Readings... #
/*  ======================= */
// If you are eager to learn and want to go deeper, You may look at :
// * Indexes ( very important for query efficiency ),
// * Pre/Post hooks,
// * Validation,
// * Schema Virtuals and  Model, Static, and Instance methods,
// * and much more in the [mongoose docs](http://mongoosejs.com/docs/)


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