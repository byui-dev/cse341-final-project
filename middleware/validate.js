const validateUser = (req, res, next) => {
    const { firstName, email } = req.body;

    if (!firstName || !email) {
        return res.status(400).json({ message: 'First name and email are required' });
    }   
    next();
};

module.exports = validateUser;