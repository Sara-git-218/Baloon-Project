const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') { 
        return next(); 
    }

    return res.status(403).json({ error: 'אין לך הרשאות מנהל' });
};

module.exports = adminMiddleware;
