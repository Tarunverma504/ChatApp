import jwt from 'jsonwebtoken';

export const createTokenAndSaveCookie = (userId, res)=>{

    const token = jwt.sign({ id: userId }, process.env.JWT_TOKEN, { expiresIn: '5d' });
    res.cookie('jwt', token, {
  httpOnly: true,
  secure: false,       // ⛔️ Use false in dev or local HTTP
  sameSite: 'Lax',
  maxAge: 5 * 24 * 60 * 60 * 1000,
});

    // res.cookie('jwt', token, { httpOnly: true, secure: true });
}
