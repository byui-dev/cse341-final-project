const validateUser = (req, res, next) => {
    const { firstName, lastName, email, age, phone, address } = req.body;
    
    // Required fields validation
    if (!firstName || !lastName || !email ) {
        return res.status(400).json({ message: 'firstName, lastName, and email are required' });
    }

    // Data type checks
    if (typeof firstName !== 'string' || typeof lastName !== 'string') { 
        return res.status(400).json({ message: 'firstName and lastName must be strings' });
    }

    // Email format check
    
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: 'Invalid email format'
        });
    }

    // Age validation
    if (age && (typeof age !== 'number' || age < 0)) {
        return res.status(400).json({ message: 'Age must be a positive number' });
    }

    // Address validation
    if (address && typeof address !== 'string')
    {
        return res.status(400).json({ message: 'Address must be a string' });
    }

    // Phone number validation (simple regex for demonstration)
    if (phone) {
        if (typeof phone !== 'string') {
            return res.status(400).json({ message: 'Phone number must be a string' });
        }

        const phoneRegex = /^[0-9]+$/;

        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: 'Invalid phone number format' });
        }
    }

    next();
};

module.exports = validateUser;