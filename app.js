
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/people", {
  useNewUrlParser: true
});

const fruitSchema = new mongoose.Schema({
  name: String,
  rating: {
    type:Number, //valida que sea tipo numerico
    min:1,      //valida que el valor minimo sea 1
    max:10     //valida que el valor maximo sea 10
  },
  review: String
})

const personSchema=new mongoose.Schema({
name:String,
age:Number,
favoriteFruit:fruitSchema
});

const Fruit = mongoose.model("Fruit", fruitSchema);
const Person=mongoose.model("Person",personSchema);


//aggregate a new fruit
const Orange = new Fruit({
  name: "Orange",
  rating: 10,
  review: "LA mejor fruta ever"
});


//del objecto person o tabla people deleted every register in that table
// Person.deleteMany({},function(err){
//   if (err)
//     console.log("Faild Deleted register");
//   else{
//     console.log("Deleted register sucessful");
//   }

// });


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

//Inserta varios objetos al mismo tiempo
// Fruit.insertMany([Banana,Pera,Orange], function(err){
//     if (err){
//       console.log("Se presento un error");
//     }
//     else{
//       console.log("Registro Actulizado");
//     }
// });

//Orange.save(); //insert Orange fruit
//Fruit.save();

updatePeopleFruit("Hugo","Orange");
//Actualiza la fruta de una persona, por ejemplo a "Hugo" le gusta la fruta "Orange"
function updatePeopleFruit(namePerson,nameFruit){
  Fruit.findOne({name:nameFruit},function(err, fruits) { //busca una fruta llamamda nameFruit
    if (err) {
      console.log("Ups something happens!");
    } else {
          //Update a register whe id =6318c8ed96be98fc4891cc9c
          Person.updateOne({name:namePerson},{favoriteFruit:fruits},function(err){ //update favoriteFruit a Person called namePerson
            if(err){
              console.log("the update fail"+err);
            }
            else{
              // console.log(namePerson,nameFruit);
              console.log("The update sucess");
            }
          });
        }
      });
}


// Fruit.find(function(err, fruits) {
//   if (err) {
//     console.log("Ups something happens!");
//   } else {
//     //Al ejecutarse callback el arreglo fruits ya tiene todos los elementos, no se debe cerrar despues Del
//     //foreach porque te imaginas si tendria que iterar 1 millon de veces? se cerraria despues de la iteracion
//   //  mongoose.connection.close();
//     fruits.forEach((item, i, x) => {
//       console.log(item.name);
//     });
//   }
// });

//  const person = new Person({
//   name:"Hugo",
//   age:39,
//   favoriteFruit:Manzana
// });
//
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
