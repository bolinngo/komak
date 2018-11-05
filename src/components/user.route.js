const express = require('express');
const User = require('./user.models');

const router = express.Router();;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// get All Data
router.get('/user', async(req, res, next) => {
    const user = await User.find({}).catch((err)=>{  
        console.log(err);
        res.json({ text: 'internal error' })
    })
    if(user){ 
        res.json( user )
    }
    next();
})
// auth ID
router.get('/user/:name', async( req, res, next ) => {
    let name = req.params.name
    let user =  await User.findOne({ name : name }).catch(err => {
        console.log(err)
        res.json({ text : 'internal error' })
    })
    if (user) {
        const token = jwt.sign({ user }, '1234s')
        res.json({ token : token, user})
    }
    next()
})                                                                                                                                                                                                                        
       
// insert into database
router.post('/user', async(req, res) => {
	let body = req.body
    
    let name = await User.findOne({name : body.name}).catch((err) => {
        console.log(err)
        res.json({ text : ' internal error'})
    })
    if (name) {
        return res.json({ text : ' name is available '})
    }
    let founds = await User.create({
        name : body.name,
        address : body.address
    }).catch((err) => { 
        res.json({ text: 'internal error'})
    })
    res.json(founds)
})
// auth users
// router.post('/auth/user', async (req, res) => {
//     const body = req.body;
//     let user = await User.findOne({ nohp: body.nohp  }).catch(err => {
//         //res.status(500);
//         res.json('error database');
//     });
//         //is bycript undefined
    
//         //  result data user
//         if (! user) return res.json({status: false, message: 'user tidak ditemukan'});
//         const token = jwt.sign({user}, '1234s');
//         res.json({ status: true, token, user});
//     });
 
// put /edit data 
router.put('/user/:id', function(req, res, next) {
    let body = req.body
    let id = req.params._id
    let user = {
        name : body.name,
        address : body.address
    }
    User.updateOne({ _id: id }, user, function(err, User) {
        if (err) {
            console.log(err) 
            res.send({text : 'internal error'})  
        }else {
            console.log(User)
            res.send({text : 'success user Update', User})
        }
    })
})
// delete
router.delete('/user/:_id', function(req, res) {
    console.log(req.params._id);
    let id = req.params._id;
    console.log(id)
    User.deleteOne({ _id : id }, function(err) {
        if (err)
            res.send(err);
        else
            res.send('Successfully! Sales has been Deleted.');   
    });
});
module.exports = router;
