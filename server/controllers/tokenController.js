const db = require ('../models');
const User = db.User;
const jwt = require("jsonwebtoken");

module.exports = {
    refreshToken: async(req, res) => {
      try {
        console.log('Entering RT middleware')
        const refreshToken = req.cookies.refreshToken;
        console.log('Refresh Token:', refreshToken)
        if(!refreshToken) {
          console.log('No refresh Token')
          res.status(401).send('No Refresh Token')
          const user = await User.findOne({
            where:{
              refresh_token: refreshToken
            }
          })
          if(!user) {
            console.log('Token verification error: ', err);
            return res.status(403).send({ msg: 'Token verified fail..!!'})
          }
        }  
          jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
          console.log('Token verification Error:', err)
          if(err) return res.status(403).send({msg: "Token verification failed"});
          
          const userId = decoded.id;
          const name = decoded.userName;
          const email = decoded.email;
          req.userId = decoded.id

          const payload = {userId, name, email}
          const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'}) 
          return res.json({ accessToken })
        })
      } catch (error) {
         console.error('Error in refreshToken middleware:', error);
         return res.status(500).json({ msg: 'Internal Server Error' });
      }
    }  
}
 