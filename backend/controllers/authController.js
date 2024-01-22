//functions to handle routes
//module.exports.route name

const con = require('../dbConnection');
const path = require('path')

module.exports.signin_post = (req, res)=>{
    console.log('checking if user is signed in')

    let val = [req.body.email, req.body.password];
    let sql = "select * from user WHERE email =? ";
    
    console.log(req.body.email, req.body.password);
    con.query(sql,val, function(err, result, fields){
        if(err){
            console.log("error in login user" + err)
        }else{
            // console.log("result[0].password", result[0].password)
            const user = result.find((user)=> user.email === req.body.email);
            const pass = result.find((pass)=> pass.password === req.body.password);
            

            if (user){
                 if(pass){

                    console.log("user found ")
                    res.sendStatus(200);

                }else{
                    console.log("user not found ")
                    res.sendStatus(401);
                 }
                
            } else{
                console.log("user not found")
                // res.send('not found');
            }
        }
    })
}

module.exports.signin_get = (req, res)=>{
    //send to front user info where userinfo are as what i got from firebase
    console.log("params" , req.params.email)
    let val = [req.params.email];
    let sql = "select * from user WHERE email =? ";
    
    con.query(sql,val, function(err, result, fields){
        if(err){
            console.log(err)
        }else{
            console.log("sending user info");
            res.send(result)
        }
    })
}

module.exports.registor_get = (req, res)=>{
    console.log("im lost")
}


//registor
module.exports.registor_post = (req, res)=>{
    let val = [req.body.username, req.body.password,  req.body.name, req.body.phonenumber, req.body.email];
    // let sql = "select * from user WHERE username =? ";
    // insert statment
    let sql = "INSERT INTO user (username, password, name, phonenumber, email) VALUES(?,?,?,?,?)";

    console.log(req.body.username, req.body.password ,req.body.email, req.body.phonenumber, req.body.name);

    //i have to see if the user already registered or we have a username of this name
    //this must be done when user type sth and finish
    con.query(sql,val, function(err, result, fields){
        if(err){
            console.log("error in register user" + err)
        }else{
            // console.log("result[0].password", result[0].password)
    //         const user = result.find((user)=> user.username === req.body.username);
    //         const pass = result.find((pass)=> pass.password === req.body.password);
            

    //         if (user){
    //              if(pass){
    //                 console.log("user found ")
    //                 // const found = 'found';
                    
    //                 res.sendFile(path.join(__dirname, '../../screens/SchedulePage.js'))
    //                 console.log(req.url);
    //                 // res.send(found);
    //                 // res.redirect()
    //             }else{
    //                 console.log("user not found ")
    //                 res.sendStatus(401);
    //              }
                
    //         } else{
    //             console.log("user not found")
    //             // res.send('not found');
    //         }
        }
    })
}