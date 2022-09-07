const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true
});

// const personSchema=new mongoose.Schema({
// name:String,
// age:Number
// });
const fruitSchema = new mongoose.Schema({
  name: {
    type:String,
  required: true,"Why not name?"},
  rating: {
    type:Number, //valida que sea tipo numerico
    min:1,      //valida que el valor minimo sea 1
    max:10     //valida que el valor maximo sea 10
  },
  review: String
})

const Fruit = mongoose.model("Fruit", fruitSchema);
//const Person=mongoose.model("Person",personSchema);

const Ciruela = new Fruit({
  //name: "Ciruela",
  rating: 10,
  review: "Acida pero muy rica"
});

// const Pera = new Fruit({
//   name: "Pera",
//   rating: 8,
//   review: "Algo seca"
// });
//
// const Orange = new Fruit({
//   name: "Orange",
//   rating: 10,
//   review: "The best fruit in the word"
// });

// Fruit.insertMany([Banana,Pera,Orange], function(err){
//     if (err){
//       console.log("Se presento un error");
//     }
//     else{
//       console.log("Registro Actulizado");
//     }
// });

Ciruela.save();

// Fruit.find(function(err, fruits) {
//   if (err) {
//     console.log("Ups something happens!");
//   } else {
//     //Al ejecutarse callback el arreglo fruits ya tiene todos los elementos, no se debe cerrar despues Del
//     //foreach porque te imaginas si tendria que iterar 1 millon de veces? se cerraria despues de la iteracion
//     mongoose.connection.close();
//     fruits.forEach((item, i, x) => {
//       console.log(item.name);
//     });
//   }
// });


// const person = new Person({
//   name:"John",
//   age:37
// });

// person.save();

const findDocuments = function(db, callback) {
  //Get the documents collection
  const collection = db.collection('fruits');
  // Find some Documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  })
}
