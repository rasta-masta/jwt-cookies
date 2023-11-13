const jwt = require("jsonwebtoken")

module.exports = {
  verifyToken: async (req, res, next) => {
    try {
      let authHeader = req.headers.authorization
      let token = authHeader.split(" ")[1];
      console.log("Receive Token:", authHeader)
      if (!token) {
        return res.status(401).send({
          message: "FORBIDDEN, TOKEN IS EMPTY..!!",
        });
      }
      
      jwt.sign(token, 'process.env.JWT_SECRET', async (err, decoded) => {
        if(err && err?.message === 'TokenExpiredError') return res.status(401).send('TOKEN EXPIRED..!!')
        if(err) return res.status(403).send({ msg: 'FORBIDDEN..'}); 
          
          console.log("Token verification: successfull");
          console.log('Receive Token:', authHeader);
          console.log("Decoded Token:", decoded);
          req.decoded = decoded.email; 
          next();
      });
      
    } catch (err) {
      console.log(err);
      res.status(400).send({ msg: "AUTHENTICATION FAILED", error: err.message });
    }
  
  }
}  
       
    