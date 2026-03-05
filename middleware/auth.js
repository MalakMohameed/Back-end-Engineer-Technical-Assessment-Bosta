const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  const user = auth[0];
  const pass = auth[1];

  if (user === 'admin' && pass === 'password123') {
    next();
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = auth;
