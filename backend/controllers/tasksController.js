const con = require('../dbConnection');
const path = require('path')

module.exports.setTask_Done_Undone_post = (req, res)=>{
    console.log('in update done undone post')
    // let val = [req.body.update.item.task_id];
    // let sql = "select * from task WHERE task_id =? ";

    let done;
    if(req.body.update.checked == false){
        // console.log('false == yes')
        done = 'yes'
    }else{
        // console.log('true == no')
        done = 'no'
    }


    let val = [done , req.body.update.item.task_id];
    let sql = "UPDATE task set done = ? where task_id = ?";
    con.query(sql, val,function(err, result, fields){
        if(err){
            console.log("error getting the tasks" + err)
        }else{
            // console.log(result)
            res.sendStatus(200)
        }
    })
    

}

module.exports.tasks_get = (req, res)=>{
    // console.log(req.body)
    console.log('in tasks get')
    //////////////////////////////////////////////////////////////////
    const arr = [
        {task_id:'1', title:'task-1', date:'2023-05-13', due_date:'',           category:'homework', priority:'5', user_id:'0', done:'yes'},
        {task_id:'2', title:'task-2', date:'2023-05-13', due_date:'05-06-2023', category:'quiz',     priority:'4', user_id:'0', done:'no' },
        {task_id:'3', title:'task-2', date:'2023-05-13', due_date:'05-06-2023', category:'project',  priority:'5', user_id:'0', done:'no' },
        {task_id:'4', title:'task',   date:'2023-05-13', due_date:'',           category:'exam',     priority:'1', user_id:'1', done:'yes'},
        {task_id:'5', title:'task',   date:'2023-05-13', due_date:'',           category:'exam',     priority:'1', user_id:'0', done:'no' },
        {task_id:'6', title:'whatev', date:'2023-05-13', due_date:'',           category:'homework', priority:'2', user_id:'0', done:'no' },
        {task_id:'7', title:'no nam', date:'2023-05-13', due_date:'',           category:'project',  priority:'3', user_id:'0', done:'no' },
        {task_id:'8', title:'hi',     date:'2023-05-13', due_date:'',           category:'none',     priority:'3', user_id:'0', done:'no' },
        {task_id:'9', title:'task',   date:'2023-05-13', due_date:'',           category:'none',     priority:'3', user_id:'0', done:'yes'},
        {task_id:'10', title:'task',  date:'2023-05-13', due_date:'',           category:'Homework', priority:'5', user_id:'0', done:'yes'},
        {task_id:'11', title:'task',  date:'2023-05-13', due_date:'05-06-2023', category:'Exam',     priority:'4', user_id:'0', done:'yes'},
        {task_id:'12', title:'task',  date:'2023-05-13', due_date:'',           category:'Project',  priority:'5', user_id:'0', done:'no' },
        {task_id:'13', title:'task',  date:'2023-05-13', due_date:'',           category:'Exam',     priority:'1', user_id:'1', done:'yes'},
        {task_id:'14', title:'anoth', date:'2023-05-13', due_date:'',           category:'Exam',     priority:'1', user_id:'0', done:'no' },
        {task_id:'15', title:'whate', date:'2023-05-13', due_date:'05-06-2023', category:'lecture',  priority:'2', user_id:'0', done:'no' },
        {task_id:'16', title:'nonam', date:'2023-05-13', due_date:'',           category:'Project',  priority:'3', user_id:'0', done:'no' },
        {task_id:'17', title:'hi',    date:'2023-05-13', due_date:'',           category:'none',     priority:'3', user_id:'0', done:'no' },
        {task_id:'18', title:'task',  date:'2023-05-13', due_date:'',           category:'none',     priority:'3', user_id:'0', done:'yes'},
    ]



    //////////////////////////////////////////////////////////////////
    let sql = "select * from task ORDER BY task_id DESC";
    
    con.query(sql, function(err, result, fields){
        if(err){
            console.log("error getting the tasks" + err)
        }else{
            // console.log(result)
            res.send(result)
        }
    })
    // console.log("///////////////")

}

module.exports.AddNewTask_post = (req, res)=>{
    console.log('in ADD new task post function')
    var priority = '';
    if(req.body.taskpriority == 'Very Important'){
        priority = '5'
    }
    if(req.body.taskpriority == 'Important'){
        priority = '4'
    }

    if(req.body.taskpriority == 'Average'){
        priority = '3'
    }

    if(req.body.taskpriority == 'Slightly Important'){
        priority = '2'
    }

    if(req.body.taskpriority == 'Not Important'){
        priority = '1'
    }

    let val = [
        req.body.title, 
        req.body.taskSubject,  
        req.body.Description,
        priority, 
        // req.body.taskpriority, 
        req.body.due,
        req.body.category,
        req.body.remind,
        req.body.user_id,
        req.body.date,
        'no'
    ];

    console.log(val)
    
    // insert statment
    let sql = "INSERT INTO task (title, subject, task_body, priority, due_date, category, alarm, user_id, date, done) VALUES(?,?,?,?,?,?,?,?,?,?)";

    con.query(sql,val)
}


module.exports.UpdateTask_post = (req, res)=>{
    console.log('in update task')

    
    var priority = '';
    if(req.body.taskpriority == 'Very Important'){
        priority = '5'
    }
    if(req.body.taskpriority == 'Important'){
        priority = '4'
    }

    if(req.body.taskpriority == 'Average'){
        priority = '3'
    }

    if(req.body.taskpriority == 'Slightly Important'){
        priority = '2'
    }

    if(req.body.taskpriority == 'Not Important'){
        priority = '1'
    }

    let val = [
        req.body.title, 
        req.body.taskSubject,  
        req.body.Description,
        priority, 
        req.body.due,
        req.body.remind,
        req.body.task_id,
    ];

    console.log(val)

    // let sql = "UPDATE task set done = ? where task_id = ?";
    // con.query(sql, val)

    
    // insert statment
    let sql = "UPDATE task set title=?, subject=?, task_body=?, priority=?, due_date=?, alarm=? where task_id = ?";
    con.query(sql, val)
    

}



