import jwt from 'jsonwebtoken'
import errorHandler from './errorHandler.js'

const verifyRoutes = (req, res, next) => {

    console.log(req.cookies.access_token)
    const token = req.cookies.access_token
   console.log(token)
    if (!token) {
        return next(errorHandler(401, "Unauthorized"))
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return next(errorHandler(403, 'Token is not valid'))
        }

        console.log("user", user)
        req.user = user

        next()
    })
}

export default verifyRoutes