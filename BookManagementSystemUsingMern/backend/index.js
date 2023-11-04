import express, { response }  from "express"; 
import { PORT,mongoDBURL } from "./config.js"; // importing port number config file 
import mongoose from "mongoose";
const app = express(); // assigning express fuction to app variable

//Middleware for parsing request body
app.use(express.json());
app.get('/',(resquest , response) =>{
    console.log(resquest);
    return response.status(234).send('welcome to mern stack tutorial , i am kaifi ahmed')
});

//Route for save a book 
app.post('/books' ,async (request , response) => {
  try {
    if(
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear 

    ){
        return response.status(400).send({
            message:'send all required feild : title,author,publishYear',
        });
    }
    const newBook = {
        title:request.body.title ,
        author:request.body.author,
        publishYear:request.body.publishYear
    };

    const book = await Book.create(newBook);
    return response.status(201).send(book); //send book to client //to test post method we will use post man 

  }catch(error){
}

});



//conectting to database 
mongoose
    .connect(mongoDBURL)
    .then(() => {
       console.log("App connected to database");
       //creating a server at given port //and runnig the server only when it is connceted Database
       app.listen(PORT , () => {
       console.log(`App is listenig to port : ${PORT}`);
})
    })
    .catch((error) => {
        console.log(error)
    })