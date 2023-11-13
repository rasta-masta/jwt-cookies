const express = require('express');
const PORT = 2000;
const dotenv = require('dotenv');
const db = require('./models');
const { userRouter, tokenRouter } = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();
// console.log('Loaded JWT_SECRET:', process.env.JWT_SECRET);
// console.log('Loaded REFRESH_TOKEN_SECRET:', process.env.REFRESH_TOKEN_SECRET);
const app = express();

app.use(cors({ origin:'http://localhost:5173', credentials:true }));
app.options("", cors());
app.use(function (req, res, next) 
{
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, X-CallbackType, Content-Type, Accept");
      res.header("Cache-Control", "no-cache");
      if ("OPTIONS" == req.method) 
      {
          res.send(200);
      }
      else 
     {
       next();
     }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/users", userRouter);
app.use("/", tokenRouter)

app.get('/api', (req, res) => {
  res.send('THIS IS API')
})

app.listen(PORT, ()=> {
  // db.sequelize.sync({ alter: true });
  console.log(`SERVER READY ON PORT: ${PORT}`);
})

