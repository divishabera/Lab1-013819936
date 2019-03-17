//load app server with express
const express = require('express')
const app = express()
const mysql = require('mysql')
var cors = require('cors');
var bodyParser = require('body-parser'); //if u dont put this res.body shall be empty
app.set('view engine', 'ejs');
var session = require('express-session');
var cookieParser = require('cookie-parser');
app.use(cookieParser())
var fs = require('fs');
module.exports = app //for mocha

const fileUpload = require('express-fileupload') //needed for file upload
app.use(fileUpload()) //needed for file upload

// Nodejs encryption done with CTR
const crypto = require('crypto');
const crypto_key = crypto.randomBytes(32);
const crypto_iv = crypto.randomBytes(16);
const algorithm = 'aes-256-cbc';


//use cors for allowing cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3002', credentials: true }));

//Allows Access Control
app.use(function (req, res, next) { //if u dont put this res.body shall be empty
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3002');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


app.use(session({
    secret: 'ccmpe273_kafka_passport_mongo',
    resave: false,
    saveUninitialized: false,
    duration: 61 * 60 * 1002,// session duration
    activeDuration: 6 * 60 * 1002 //click duration
})); //if you dont put cookie expires fast


app.use(bodyParser.json());//if u dont put this res.body shall be empty



app.get("/", (req, res) => { //this is the root
    res.send("hellofrom root")
})

app.get('/download', function (req, res) {
    var file_ = __dirname + '/file-folder/test.txt';
    res.download(file_); // Set disposition and send it.
});

app.post('/upload', (req, res) => {
    let upload_File = req.files.file
    const file_Name = req.files.file.name
    upload_File.mv(
        `${__dirname}/file-folder/${file_Name}`,
        function (error) {
            if (error) {
                return res.status(500).send(error)
            }
            res.json({
                file: `file-folder/${req.files.file.name}`,
            })
        },
    )
})

app.post('/registerCourses', function (req, res) {

    let courseId = req.body.ID;
    let createdName = req.body.Name;
    let userID = req.body.userID;
    let userEmail = req.body.userEmail;
    let statusC = "Normal";
    let capacity = 0;

    const connection = mysql.createConnection({
        user: 'root',
        password: 'password',
        host: 'localhost',
        database: 'new_schema',
        insecureAuth: true
    })

    //check if you want to WL or simply add
    connection.query("select * from courses where courseId = ?", [courseId], (err, rows) => {
        if (err) {
            return res.status(500).send(err);//500 is the internal server error
        }
        capacity = rows[0].capacity;
        if (capacity == 0) {
            statusC = "WL"
        }
        connection.query("insert into RegisteredCourses (courseId,createdName,userID,userEmail,status) values (?,?,?,?,?)", [courseId, createdName, userID, userEmail, statusC], (error) => {
            if (error) {
                return res.status(500).send(error);//500 is the internal server error
            }

            capacity = capacity - 1; //decrease capacity for the course as 1 person just registered

            connection.query("UPDATE courses SET capacity = ? where courseId = ?", [capacity, courseId], (er) => {
                if (er) {
                    return res.status(500).send(er);//500 is the internal server error
                }

                res.writeHead(200, {
                    'Content-Type': 'text/plain' //giving status code of 200
                })
                res.end("Successful Course registration"); //if you dont put end, the res will never return

            })

        })
    })






});


//SELECT courses.courseId, courses.name, registeredcourses.Status, registeredcourses.userEmail
//FROM courses
//LEFT JOIN registeredcourses ON registeredcourses.courseId=courses.courseId
//and registeredcourses.userEmail = 'divistar72@gmail.com'


app.get('/getCourses', function (req, res) {

    let id = req.query.id;
    const connection = mysql.createConnection({
        user: 'root',
        password: 'password',
        host: 'localhost',
        database: 'new_schema',
        insecureAuth: true
    })

    connection.query("SELECT courses.courseId, courses.name, registeredcourses.Status, registeredcourses.userEmail FROM courses left JOIN registeredcourses ON courses.courseId = registeredcourses.courseId and registeredcourses.userEmail = ?",[req.query.id], (err, rows, fields) => {
        if (err) {
            return res.status(500).send(err);//500 is the internal server error
        }

        const courses = rows.map(row => {
            return { ID: row.courseId, Name: row.name, Status: row.Status }//creating a custom json
        })

        res.json(courses)
    })

});

var pool = mysql.createPool({
    connectionLimit: 1000, //important
    user: 'root',
    password: 'password',
    host: 'localhost',
    database: 'new_schema',
    insecureAuth: true
});

app.get('/getAllCourses', function (req, res) {

    console.log('GetAllCourses called');
    pool.getConnection(function (err, connection) {
        if (err) {
            res.json({ "code": 100, "status": "Error in connection database" });
            return;
        }//if end
    connection.query("select * from courses", (err, rows, fields) => {
        connection.release()
        if (err) {
            console.log(err);
            return res.status(500).send(err);//500 is the internal server error
        }

        const courses = rows.map(row => {
            console.log("connected");
            return { ID: row.courseId, Name: row.name }//creating a custom json
        })

        res.json(courses)
    })
})

});



app.get('/getAnnouncements', function (req, res) {
    console.log('get announcements hit!');
    //let id = req.query.id;
    const connection = mysql.createConnection({
        user: 'root',
        password: 'password',
        host: 'localhost',
        database: 'new_schema',
        insecureAuth: true
    })

    connection.query("select * from announcements where courseid ", (err, rows, fields) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err);//500 is the internal server error
           
        }
        console.log('connected')

        const announcements = rows.map(row => {
            return {heading: row.heading, body: row.body }//creating a custom json
        })

        res.json(announcements)
    })

});



app.post('/addAnnouncement', function (req, res) {
    let heading = req.body.heading;
    let the_body = req.body.the_body;
    let courseId = req.body.courseId;
    const connection = mysql.createConnection({
        user: 'root',
        password: 'password',
        host: 'localhost',
        database: 'new_schema',
        insecureAuth: true
    })

    connection.query("insert into Announcements (heading,body,courseid) values (?,?,?)", [heading, the_body, courseId], (err, rows, fields) => {
        if (err) {
            return res.status(500).send(err);//500 is the internal server error
        }


        res.writeHead(200, {
            'Content-Type': 'text/plain' //giving status code of 200
        })
        res.end("Successful Course addition"); //if you dont put end, the res will never return

    });



})


app.post('/addCourse', function (req, res) {

    let cid = req.body.cid;
    let cname = req.body.cname;
    let ccap = req.body.ccap;
    let cdept = req.body.cdept;
    let croom = req.body.croom;
    let cdesc = req.body.cdesc;
    let cwl = req.body.cwl;
    let cterm = req.body.cterm;



    const connection = mysql.createConnection({
        user: 'root',
        password: 'password',
        host: 'localhost',
        database: 'new_schema',
        insecureAuth: true
    })

    connection.query("insert into courses (courseId,createdBy,name,dept, description,room,capacity,waitlistCapacity,courseTerm) values (?,?,?,?,?,?,?,?,?)", [cid, 1, cname, cdept, cdesc, croom, ccap, cwl, cterm], (err, rows, fields) => {
        if (err) {
            return res.status(500).send(err);//500 is the internal server error
        }


        res.writeHead(200, {
            'Content-Type': 'text/plain' //giving status code of 200
        })
        res.end("Successful Course addition"); //if you dont put end, the res will never return

    });



})




app.post('/login', function (req, res) {


    console.log('Login attempted')

    let email = req.body.email;
    let password = req.body.password;


    const connection = mysql.createConnection({
        user: 'root',
        password: 'password',
        host: 'localhost',
        database: 'new_schema',
        insecureAuth: true
    })

    connection.query("select * from Users where email = ?", [email], (err, rows, fields) => {
        if (err) {
            return res.status(500).send(err);//500 is the internal server error
        }


        if (rows[0].email === email && rows[0].password === password) {
            if (rows[0].role == 1) { //1 is for faculty
                res.cookie('cookie', "1", { maxAge: 900000, httpOnly: false, path: '/' });
            }
            else {
                res.cookie('cookie', "0", { maxAge: 900000, httpOnly: false, path: '/' }); //0 is for student
            }
            res.cookie('emailID', email, { maxAge: 900000, httpOnly: false, path: '/' });



            res.writeHead(200, {
                'Content-Type': 'text/plain' //giving status code of 200
            })
            res.end("Successful Login"); //if you dont put end, the res will never return
        }



    });
})

app.post('/register', function (req, res) {



    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.namee;
    let role = req.body.role;


    const connection = mysql.createConnection({
        user: 'root',
        password: 'password',
        host: 'localhost',
        database: 'new_schema',
        insecureAuth: true
    })

    connection.query("insert into users (email,name,password,role) values (?,?,?,?)", [email, name, password, role], (err, rows, fields) => {
        if (err) {
            return res.status(500).send(err);//500 is the internal server error
        }

        res.cookie('cookie', role, { maxAge: 900000, httpOnly: false, path: '/' });
        res.cookie('emailID', email, { maxAge: 900000, httpOnly: false, path: '/' });

        res.writeHead(200, {
            'Content-Type': 'text/plain' //giving status code of 200
        })
        res.end("Successful Login"); //if you dont put end, the res will never return




    });
})



app.get('/pdf', function (req, res) {
    var filePath = "/files/Resume.pdf";

    fs.readFile(__dirname + filePath, function (err, data) {
        res.contentType("application/pdf");
        res.send(data);
    });
});

app.get("/users/:id", (req, res) => { //how to map result
    //http://localhost:3003/users/4 to test if the backend is fine
    let id = req.params.id

    const connection = mysql.createConnection({
        user: 'root',
        password: 'password',
        host: 'localhost',
        database: 'new_schema',
        insecureAuth: true
    })

    connection.query("select * from new_table where id = ?", [1], (err, rows, fields) => {
        if (err) {
            return res.status(500).send(err);//500 is the internal server error
        }

        const users = rows.map(row => {
            return { ID: row.id, Name: row.name }//creating a custom json
        })

        res.json(users)
    })


})

app.get("/customJSON", (req, res) => {


    var user1 = { firstname: "Divisha", lastname: "Bera" }
    var user2 = { firstname: "Ferry", lastname: "po" }
    res.json([user1, user2])

})

//localhost:3003!!
app.listen(3003, () => {
    console.log("server is up and listening at 3003!")
})