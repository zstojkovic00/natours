const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./app');



const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);


 mongoose.connect(DB, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useFindAndModify: false,
   useUnifiedTopology: true
 }).then( () =>
   console.log('DB connection successful!')
 ).catch(err=>{
   console.log('ERROR');
 })


// Ovako se povezuje na localhost bazu
// mongoose.connect(process.env.DATABASE_LOCAL, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// }).then( () =>
//   console.log('DB connection successful!')
// )


const port = process.env.PORT || 3000;
const server = app.listen(port, ()=>{
  console.log(`App running on port ${port}...`);
})


process.on('unhandledRejection', err=>{
  console.log(err.name,err.message);
  console.log('UNHANDLER REJECTION!');
  server.close(() => {
    process.exit(1);
  })
})

process.on('uncaughtException', err=>{
  console.log('UNCAUGHT EXCEPTION!');
  console.log(err.name,err.message);
  server.close(() => {
    process.exit(1);
  })
})




