const mongoose = require("mongoose");





const connectDatabase = ( ) =>{

  const DB_URI = process.env.db;


  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    //useUnifiedTopology: true,
   
  }).then((d) => {

  console.log('db connection successfull');
  })

}


module.exports = connectDatabase