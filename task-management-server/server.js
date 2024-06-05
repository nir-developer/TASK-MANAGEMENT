const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})


const mongoose = require('mongoose');
const app = require('./app')


const PORT = process.env.PORT || 3000

let DB;
const NODE_ENV= process.env.NODE_ENV; 
if(NODE_ENV === 'development') DB = process.env.DB_COMPASS
if(NODE_ENV === 'production') DB = process.env.DB_ATLAS 


if(!DB) throw new Error('NO VALID ENVIRONMENT WAS DEFINED!')


console.log(NODE_ENV)
mongoose.connect(DB, {
   
}).then(() => {
    console.log('Connected to MongoDB on URL: ', DB);
    app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
    
})
// .then(document => {
//   console.log('SUCCESS SAVING DOCUMENT!')
//   console.log(document)
// })
.catch(err => {
    console.error('Connection error', err);
});