import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
}

function generateToken(user) {
  const token = jwt.sign(
    { user_id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
  return token;
}

function refreshJWT(token) {
  const decoded = verifyToken(token);
  if (!decoded) {
    return null;
  }
  const now = Date.now() / 1000;
  const expiresAt = decoded.exp;
  const timeToExpiration = expiresAt - now;
  if (timeToExpiration > 300) { // JWT expires in more than 5 minutes
    return null;
  }
  const user = { id: decoded.user_id, email: decoded.email };
  const newToken = generateToken(user);
  return newToken;
}

export default {
  verifyToken,
  generateToken,
  refreshJWT,
};