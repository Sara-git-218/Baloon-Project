const adminMiddleware = (req, res, next) => {
   
    console.log(req.user);
    if (req.user && req.user.roles === 'Admin') { 
       
        return next(); 
    }

    return res.status(403).json({ error: 'אין לך הרשאות מנהל' });
};

module.exports = adminMiddleware;
