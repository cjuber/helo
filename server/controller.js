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
    req.session.user = newUser[0]
    res.status(200).send(req.session.user)
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
            
            req.session.user = findUser[0]
            
            res.status(200).send(req.session.user)
        }else {res.status(401).send('Invalid Username or Password')}
}
// looks like I'm switching to the .then form now.  
const getPosts = (req, res) => {
    const db =req.app.get('db')
    db.get_posts().then((posts) => {
    res.status(200).send(posts)
    }) 
    .catch((err) => {
        console.log(err)
    })
}
const logout = (req,res) =>{
    req.session.destroy
}

const getPostTrueSearch = (req,res) => {
const {search} = req.params
console.log('hit1')
const db = req.app.get('db')
db.get_posts_search(search).then((posts) => {
    res.status(200).send(posts)
})
.catch((err) => {
    console.log(err)
})
}
const getPostFalseSearch = (req,res) => {
    const {search} = req.params
    console.log('hit2')
    const db = req.app.get('db')
    db.get_posts_id_search(search).then((posts) => {
        res.status(200).send(posts)
    })
    .catch((err) => {
        console.log(err)
    })
}
const getPostTrueNoSearch = (req, res) => {
    const {id} = req.session.user
    console.log('hit3')
    console.log(req.session)
    const db = req.app.get('db')
    db.get_posts_id(id).then((posts) => {
        res.status(200).send(posts)
    })
    .catch((err) => {
        console.log(err)
    })
}

const makePost = (req,res) => {
    const {title,img, content, id} = req.body
    const db = req.app.get('db')
    
    db.make_post(title,img,content,id).then(()=>{
        res.status(200).send('made post')
    })
}

module.exports ={
    register,
    login,
    logout,
    getPosts,
    getPostTrueSearch,
    getPostFalseSearch,
    getPostTrueNoSearch,
    makePost
}