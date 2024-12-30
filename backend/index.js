const express= require("express")
const app=express();
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const helmet=require("helmet")
const morgan=require("morgan")
dotenv.config();
const path=require("path")
const cors = require('cors');



app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const multer=require("multer");

const authRoute = require("./routes/auth");
const userRoute=require("./routes/users");
const postRoute=require("./routes/posts");


app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));



// mongodB Connection
async function connectToDatabase() {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Connection error', error);
    }
  }
  
  connectToDatabase();
  //MIDDLEWARE
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(morgan("common"));
  app.use("/images", express.static(path.join(__dirname,"public/images")));


  const storage= multer.diskStorage({
    destination :(req,file,cb)=>{
      cb(null,"public/images");
    },
    filename:(req,file,cb)=>{
      cb(null,req.body.name)
    }
  })

  const upload=multer({storage});
  app.post("/api/upload",upload.single("file"),(req,res)=>{
    try{
      return res.status(200).json("File uploaded successfully")

    }catch(err){
     console.log(err);
    }
  })

  app.use("/api/auth",authRoute);
  app.use("/api/users",userRoute);
  app.use("/api/posts",postRoute);

 

  app.listen(8800,()=>{
    console.log("backend is running")
})



