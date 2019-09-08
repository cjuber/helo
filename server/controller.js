const bcrypt = require('bcryptjs')



const register = async (req, res) =>{
   
    const {username, password} = req.body
    const db = req.app.get('db')
    const foundUser = await db.find_user([username])
    if(foundUser[0]){
        return res.status(409).send('Try another username')
    }
    const passSalt = bcrypt.genSaltSync(15)
    const passHash = bcrypt.hashSync(password, passSalt)
    const newUser = await db.register_user([username,passHash])
    delete newUser[0].password
    res.status(200).send(newUser[0])
}

const login = async (req, res) =>{
    const {username, password} = req.body
    const db = req.app.get('db')
    const findUser = await db.find_user([username])
        if(!findUser[0]){
            return res.status(403).send('Invalid Username or Password')
        }
    const authedPass = bcrypt.compareSync(password, findUser[0].password)
        if(authedPass){
            delete findUser[0].password
            console.log(findUser[0])
            res.status(200).send(findUser[0])
        }else {res.status(401).send('Invalid Username or Password')}
}

const getPosts = (req, res) => {
    const db =req.app.get('db')
    db.get_posts().then((posts) => {
    res.status(200).send(posts)
    }) 
    .catch((err) => {
        console.log(err)
    })
}
const logout = () =>{}

module.exports ={
    register,
    login,
    logout,
    getPosts
}