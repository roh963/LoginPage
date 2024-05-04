
require('dotenv').config();


const Port = process.env.PORT
const app = require('./app');
 




app.listen(Port,()=>{
    console.log(`server listen at http://localhost:${Port}`);
})