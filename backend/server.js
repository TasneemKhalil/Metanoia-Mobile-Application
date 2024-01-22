
const express = require("express");
const app = express();
const PORT = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//start the server
app.listen(PORT, (err)=> {
    if (err){ console.log(err)}
    else {console.log("on port 3000")}
})

app.use(cors({
    origin: '*'
}));
/////////////////////////////////////////////////////
const path = require('path')
var v=0
const getTime=()=>{
    // 'use strict';
    var now = new Date(),
        day = now.getDay(),
        hours = now.getHours(),
        minutes = now.getMinutes();

        console.log(day+ ':::' +hours+':'+minutes);

        if(day == '4' && hours == '21' ){

            fetch("https://exp.host/--/api/v2/push/send", {
        method: "post", 
        headers:{
            "host": "exp.host",
            "accept": "application/json",
            "accept-encoding": "gzip, deflate",
            "content-type": "application/json",
        },
        body: JSON.stringify({
            "to": "ExponentPushToken[XgHhTKAIW7uB7fw0744vvc]",
            "sound": "default",
            "body": "Hello world!"
        })
      })
      .then(res=>res)
      
      .then(data =>{
        console.log(data.status)
           
      } )
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
          // throw error;
      });

            // return day+'::'+hours+':'+minutes
            // schedulePushNotification('You have a lecture " '+ 'subject' +' " now')
            
            // const url = "http://192.168.1.70:3000/notif"
            // fetch(url)
            // .then((resp) => resp.json())
            // .then((json) => { console.log("json", json)})
            // .catch(function(error) {
            // console.log('There has been a problem with your fetch operation: ', error );
            // })
            
        //  
        }
        
        //3 == الاربعاء 
        //4 == الخميس
}
setInterval(getTime, 60000)
// module.exports = getTime()
////////////////////////////////////////////////////

// var cors = require('cors')
// app.use(cors())


app.use(express.json());
app.use(express.urlencoded({extended: false}));


const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);

const schedualRoutes = require('./routes/SceduleRoutes');
app.use(schedualRoutes);

// const notifications = require('./routes/NotificationsRoute');
// app.use(notifications);

const taskRoutes = require('./routes/TasksRoutes');
app.use(taskRoutes);