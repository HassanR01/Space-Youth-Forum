const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Schema = mongoose.Schema ;
const multer  = require('multer')
app.set('view engine' , 'ejs')
const { redirect, render } = require('express/lib/response');
const { allowedNodeEnvironmentFlags } = require('process');
const Port = process.env.PORT || 1000 ;
const exp = require('constants');
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
mongoose.connect('mongodb+srv://HassanR01:Hassan236@syf.htpum.mongodb.net/userweb?retryWrites=true&w=majority').then(() => console.log('Connected')).catch((err) => console.log(err))

let usersSchema = Schema({
    challengePassed : [] ,
    articalReaded : [] ,
    eventCame : [] ,
    userName : String ,
    email : String ,
    pass : String ,
    points : Number ,
    Ustatus : String ,
    gender : String ,
})

const questionsSchema = Schema({
    title : {
        Qname : String ,
        Qpoints : Number ,
    }
    , 
    question : {
        Qhead : String ,
        Qchoose1 : String ,
        Qstatus1 : String ,
        Qchoose2 : String ,
        Qstatus2 : String ,
        Qchoose3 : String ,
        Qstatus3 : String ,
        Qreason : String ,
    }
})

const articales = Schema({
    title : {
        Atitle : String ,
        Adate : String ,
        Awriter : String ,
        Afile : String , 
    },
    articale : {
        Ahead : String , 
        Atext : String ,
        Alink : String ,
        Awords : String ,
        Adescription : String ,
    }
})

let User = mongoose.model('User' , usersSchema)

const Question = mongoose.model('Question' , questionsSchema)

const Articales = mongoose.model('Articales' , articales)

app.post('/' , (req , res) => {
    let newUser = new User({
        challengePassed : [] ,
        articalReaded : [] ,
        eventCame : [] ,
        userName : req.body.userName ,
        email : req.body.email ,
        pass : req.body.pass ,
        points : 0 ,
        Ustatus : 'login' ,
        id : this.id ,
        gender : req.body.gender ,
    })

    newUser.save().then(() => console.log('Send')).catch((err) => console.log(err))
    setTimeout(() => {
        res.redirect(`/profile/${newUser.id}`)
    }, 500);
})

app.post('/challenges' , (req , res) => {
    let newQuestion = new Question({
        title : {
            Qname : req.body.Qname ,
            Qpoints : req.body.Qpoints ,
        }
        , 
        question : {
            Qhead : req.body.Qhead ,
            Qchoose1 : req.body.Qchoose1 ,
            Qstatus1 : req.body.Qstatus1 ,
            Qchoose2 : req.body.Qchoose2 ,
            Qstatus2 : req.body.Qstatus2 ,
            Qchoose3 : req.body.Qchoose3 ,
            Qstatus3 : req.body.Qstatus3 ,
            Qreason : req.body.Qreason ,
        }
    })

    newQuestion.save().then(() => console.log('send')).catch(err => res.redirect('/Home'))
    res.redirect('/challenges')
})

app.post('/Topics' , (req , res) => {
    let newArticale = new Articales({
        title : {
            Atitle : req.body.Atitle ,
            Adate : req.body.Adate ,
            Awriter : req.body.Awriter ,
            Afile : req.body.Afile ,
        },
        
        articale : {
            Ahead : req.body.Ahead, 
            Atext : req.body.Atext ,
            Alink : req.body.Alink ,
            Awords : req.body.Awords ,
            Adescription : req.body.Adescription ,
        }
    })

    newArticale.save().then(() => console.log('sended')).catch(err => console.log(err))
    res.redirect('/Topics')
})

app.post('/Home' , (req , res) => {
    let checkUserName = req.body.checkUserName
    User.findOne({ userName: checkUserName  }, function (err, result) {
        res.redirect(`/profile/${result.id}`)  
    })
})

function UserNames(arr) {
    let userNames = []
    arr.forEach(item => {
        userNames.push(item.userName)
    });

    return userNames
}

function Password(arr) {
    let Password = []
    arr.forEach(item => {
        Password.push(item.pass)
    });

    return Password
}
// Inner Home !!!

app.get('/' , (req , res) => {
    res.redirect('/Home')
})

app.get('/Home' , (req , res) => {
    User.find().then((result) => res.render('index' , { arrUsers : UserNames(result) , Password : Password(result) }))    
})

app.get('/challenges' , (req , res) => {
    Question.find().then((result) => {
        res.render('challenges' , { challenges : result})
    })
})

app.get('/Topics' , (req , res) => {
    Articales.find().then(result => res.render('Topics' , {dataA : result}))
})

app.get('/Events' , (req , res) => {
    res.render('Events')
})

app.get('/profile/:id' , (req , res) => {
    User.findById(req.params.id).then(result => res.render('profile' , { UserData : result })).catch(err => res.render('index'))
})


// Inner Topics Page !!!


app.get('/Topics/Solar-system' , (req , res) => {
    res.render('Solar-system')
})

app.get('/Topics/A-I' , (req , res) => {
    res.render('A-I')
})

app.get('/Topics/Astrophysics' , (req , res) => {
    res.render('Astrophysics')
})

app.get('/Topics/Celestial-Object' , (req , res) => {
    res.render('Celestial-Object')
})

app.get('/Topics/Crew' , (req , res) => {
    res.render('Crew')
})

app.get('/Topics/ISS' , (req , res) => {
    res.render('ISS')
})

app.get('/Topics/Satalites' , (req , res) => {
    res.render('Satalites')
})

app.get('/Topics/Sphysics' , (req , res) => {
    res.render('Sphysics')
})

app.post('/read' , (req , res) => {
    User.findByIdAndUpdate(req.body.userID , {$push : { articalReaded : req.body.articalName}}).then(result => res.redirect('/Topics'))
})

app.post('/Topics/:id' , (req , res) => {
    User.findByIdAndUpdate(req.body.userID , {$push : { articalReaded : req.body.articalName}}).then(result => res.redirect(`/Topics`))
})

app.get('/Topics/:id' , (req , res) => {
    Articales.findById(req.params.id).then(result => res.render('articale' , {dataA : result}))
})
// Inner Challenge 

app.get('/challenges/:id' , (req , res) => {
    Question.findById(req.params.id).then(result => res.render('challenge' , {challengeInfo : result}))
})

app.get('/Top' , (req , res) => {
    User.find().then((result) => res.render('top' , {Users : result.sort((a , b) => {return b.points - a.points  }) }))
})

app.post('/challenge' , (req , res) => {
    
    console.log(req.body.points)
    User.findByIdAndUpdate(req.body.userID , { points : +req.body.oldPoints + +req.body.points , $push : {challengePassed : req.body.challengeName}} , function (err , result) {
        if(err) {
            console.log(err)
        } else {
            console.log(result)
        }
    })
    setTimeout(() => {
        res.redirect(`/profile/${req.body.userID}`)
    }, 13000);
})

// Any 404 Error Link

app.get('/*' , (req , res) => {
    res.render('404')
})

app.get('/*/*' , (req , res) => {
    res.render('404')
})

// Deleting Users 

app.delete('/profile/:id' , (req , res) => {
    User.findByIdAndDelete(req.params.id).then(() => console.log('Deleted')).catch((err) => console.log(err))
})

// This is Port 

app.listen(Port , (req , res) => {
    console.log(`your link server is http://localhost:${Port}`)
})
