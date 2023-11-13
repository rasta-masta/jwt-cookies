const db = require ('../models');
const User = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
 
module.exports = {
  register : async(req, res) => {
    const { userName, email, password} = req.body;
    
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await User.create({
            userName,
            email,
            password: hashPassword
        });
        res.json({msg: "REGISTERED..!!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Registration failed. Please try again." });
    }
  },
  login : async(req, res) => {
    
    const { userName, password } = req.body
    try {
        const user = await User.findOne({
            where:{
                userName
            }
        });
        if (!user) {
          res.setHeader('Content-Type', 'application/json')
          return res.status(401).json( "USER NOT FOUND..!!" );  
          
        } 
        const match = await bcrypt.compare(password, user.password);
        if(!match) {
          res.setHeader('Content-Type', 'application/json')
          return res.status(403).json({msg: "Wrong Password"});
        }
        const userId = user.id;
        const name = user.userName;
        const email = user.email;
        const payload = {id: userId, name, email}
        const accessToken = jwt.sign(payload, 'process.env.JWT_SECRET', {expiresIn: '20s'});  
        const refreshToken = jwt.sign(payload, 'process.env.REFRESH_TOKEN_SECRET', {expiresIn: '1d'})
        
        console.log("Generated Access Token:", accessToken);
        console.log("Generated Refresh Token:", refreshToken);
                
        await user.update({refresh_token: refreshToken},{
          where:{
              id: userId
          }
      });
      console.log(userId)
      res.cookie('refreshToken', refreshToken,{
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000
      });
       res.setHeader('Content-Type', 'application/json')
       return res.status(200).json({ accessToken, userName, msg: "LOGIN SUCCESFULLY..!" });
    } catch (error) {
        res.status(500).json("INTERNAL SERVER ERROR..!");
        console.error('Error in this Controller: ', error);
    }
  }, 
  getUsers : async(req, res) => {
    
    try {
        const user = await User.findAll({
            attributes:["id", "userName", "email"]
        });
        console.log(user)
        return res.json(user);
    } catch (error) {
      console.error('Error in get Users:', error);
      res.status(500).send({msg: "Error Fetching the users..!" })
    }
  },
  keepLogin: async(req, res) => {
    try {
      const result = await User.findOne({
        where: {
          id: req.user.id
        }
      })
      res.status(200).send({ result })
    } catch (error) {
      res.status(400).send({ msg: error.message })
    }
  },
  logout : async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await User.findOne({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user) return res.sendStatus(204);
    // const userId = user.id;
    await User.update({refresh_token: null},{
        where:{
            id: user.id
        }
    });
    res.clearCookie('refreshToken');
    return res.status(200).send({ msg : "LOGGED OUT...!"});
  } 
}  