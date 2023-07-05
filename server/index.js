const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const PORT = process.env.PORT || 8000;
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
var session = require("express-session");
const secret = "Jwt-secret";
const { jsonParser } = require("json-parser");

//Upload file to folder
const multer = require('multer'); //This function move the file
const path = require('path');
const iconv = require('iconv-lite');



//Variable for conection to database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "full_crud",
});



//Conection to database
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to My database");
  }
});



app.use(express.json());
app.use(cors());



//Upload file within multer
const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, "../client/public") //specify the folder where files will be saved
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null,Date.now() + '-' + file.originalname); // keep the original filename
  }
})
const upload = multer({ storage: storage })



app.post('/upload_files', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully' });
});




//Get data employee
app.get("/all_employee/", (req, res) => {
  db.query("SELECT * FROM employee_crud", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



app.get("/member_data", (req, res) => {
  db.query("SELECT * FROM member_register", (err, result) => {
    if(err) {
      res.json({status: "ERROR", error: err})
    }else{
      res.send(result)
    }
  })
})



//Get provinces in Thailand
app.get("/provinces", (req, res) => {
  db.query("SELECT * FROM provinces ORDER BY name_th;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



//Country
app.get("/get_country/", (req, res) => {
  db.query("SELECT * FROM country", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



//Employee
app.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM employee_crud WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



//Login user
app.post("/login", (req, res) => {
  //Access to an id_card and a password
  const id_card = req.body.id_card;
  const pwd1 = req.body.pwd1;

  db.query(
    "SELECT * FROM member_register WHERE id_card = ?",
    [id_card],
    (err, users) => {
      if (err) {
        res.send({ remindError: err });
      }

      //If Id_card and password didn't match
      if (users.length > 0) {
        bcrypt.compare(pwd1, users[0].pwd1, function (error, isLogin) {
          if (isLogin) {
            const token = jwt.sign({ pwd: users[0].pwd1 }, secret, {
              expiresIn: "1h",
            }); //ExpiresIn is stop-watch at 1 hour before token miss
            //For sent data of database as json pattern to frontend
            res.json({ status: "OK", MSG: "เข้าสู่ระบบ สำเร็จ", token, name: users[0].name, permission: users[0].permission, id: users[0].id, users_res : users});
          } else {
            res.json({ status: "Error", MSG: "กรุณาใส่ เลขบัตรประชาชนและรหัสผ่าน" });
          }
        });
      }

    }
  );
});



app.post("/authen", (req, res, next) => {

  //For check condition headers of authorization if start with Bearer 
  //then split bearer out
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      const token_eiei =  req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token_eiei, secret);
      res.json({ status: "OK", decoded });
      console.log(decoded);
      res.send(decoded);
      next()
    } catch (err) {
      res.json({ status: "Error", message: err.message });
    }
  }
});




//Insert member
app.post("/create_member", (req, res) => {
  const id_card = req.body.id_card;
  const prefix = req.body.prefix;
  const name = req.body.name;
  const lastname = req.body.lastname;
  const province = req.body.province;
  const pwd1 = req.body.pwd1;
  const pwd2 = req.body.pwd2;

  //For only Hash password before save into the database
  bcrypt.hash(pwd1, saltRounds, function (err, hash) {
    db.query(
      "INSERT INTO member_register (id_card, name, lastname, prefix, pwd1, pwd2, province) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id_card, name, lastname, prefix, hash, pwd2, province],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
});



//Insert employee
app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employee_crud (name, age, country, position, wage)  VALUES (?, ?, ?, ?, ?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Please enter your information" });
      }
    }
  );
});



//Update employee
app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  db.query(
    "UPDATE employee_crud SET wage = ?, name = ?, age = ?, country = ?, position = ? WHERE id = ? ",
    [wage, name, age, country, position, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});



//Delete employee
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employee_crud WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



//Delete member
app.delete("/delete_member/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM member_register WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


//Update member_status
app.put("/update_status", (req, res) => {
  const id = req.body.id;
  const status = req.body.status;
  db.query(
    "UPDATE member_register SET status = ? WHERE id = ? ",
    [status, id ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});



//Output
app.listen(PORT, () => {
  return console.log("Server is running on port " + PORT);
});
