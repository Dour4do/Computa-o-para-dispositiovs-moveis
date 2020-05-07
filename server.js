const express = require('express')
const app = express()
const bodyparser = require('body-parser')
var ObjectId = require('mongodb').ObjectID

const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://dbGabriel:tgwbvxrjBZKNzMzc@cluster0-s5qtv.gcp.mongodb.net/test?retryWrites=true&w=majority"
MongoClient.connect(uri,{useUnifiedTopology: true} , (err, client) => {
    if (err) return console.log(err)
    db = client.db('dbTeste')
   
    app.listen(3000, () => {
      console.log('Server running on port 3000')
    })
  })
   
app.use(bodyparser.urlencoded({ extended: true}))
   
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
        console.log('App acessado')
        res.redirect('/home')
})

app.get('/novo', (req, res) => {
      res.render('index.ejs')
  })
   
app.get('/novo', (req, res) => {
    var cursor = db.collection('data').find()
})

app.get('/home', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })

    })
})

app.post('/home', (req, res)=>{
      db.collection('data').insertOne(req.body, (err, result) => {
          if (err) return console.log(err)
       
          console.log('Salvo no Banco de Dados')
          res.redirect('/home')
    })
})

app.route('/edit/:id')
.get((req,res) =>{
    var id = req.params.id
    db.collection('data').find(ObjectId(id)).toArray((err,result) => {
        if (err) return res.send(err)
        res.render('edit.ejs', {data:result})
    })
})
.post((req,res) => {
    var id = req.params.id
    var name = req.body.name
    var surname = req.body.surname
    var age = req.body.age
    var sex = req.body.sex
    var phone = req.body.phone
    var mail = req.body.mail
    var CEP = req.body.CEP
    var country = req.body.country
    var CPF = req.body.CPF
    var rg = req.body.rg

    db.collection('data').updateOne({_id: ObjectId(id)}, {
        $set: {
            name: name,
            surname: surname,
            age: age,
            sex: sex,
            phone: phone,
            mail: mail,
            CEP: CEP,
            country: country,
            CPF: CPF,
            rg: rg

        }
    }, (err, result) => {
        if (err) return res.send(err)
        res.redirect('/home')
        console.log('Atualizado no Banco de Dados')
    })
})

app.route('/delete/:id')
.get((req,res) => {
    var id = req.params.id

    db.collection('data').deleteOne({_id: ObjectId(id)}, (err,result) => {
        if (err) return res.send(err)
        console.log('Deletado do Banco de Dados!')
        res.redirect('/home')
    })
})
/*
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
var ObjectId = require('mongodb').ObjectID

const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://dbGabriel:tgwbvxrjBZKNzMzc@cluster0-s5qtv.gcp.mongodb.net/test?retryWrites=true&w=majority"
MongoClient.connect(uri,{useUnifiedTopology: true} , (err, client) => {
    if (err) return console.log(err)
    db = client.db('dbTeste')
   
    app.listen(3000, () => {
      console.log('Server running on port 3000')
    })
  })
   
app.use(bodyparser.urlencoded({ extended: true}))
   
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
        res.redirect('/show')
})

app.get('/', (req, res) => {
      res.render('index.ejs')
  })
   
app.get('/', (req, res) => {
    var cursor = db.collection('data').find()
})

app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })

    })
})

app.post('/show', (req, res)=>{
      db.collection('data').insertOne(req.body, (err, result) => {
          if (err) return console.log(err)
       
          console.log('Salvo no Banco de Dados')
          res.redirect('/show')
    })
})

app.route('/edit/:id')
.get((req,res) =>{
    var id = req.params.id
    db.collection('data').find(ObjectId(id)).toArray((err,result) => {
        if (err) return res.send(err)
        res.render('edit.ejs', {data:result})
    })
})
.post((req,res) => {
    var id = req.params.id
    var name = req.body.name
    var surname = req.body.surname
    var age = req.body.age
    var sex = req.body.sex
    var phone = req.body.phone
    var mail = req.body.mail
    var CEP = req.body.CEP
    var country = req.body.country
    var CPF = req.body.CPF
    var rg = req.body.rg

    db.collection('data').updateOne({_id: ObjectId(id)}, {
        $set: {
            name: name,
            surname: surname,
            age: age,
            sex: sex,
            phone: phone,
            mail: mail,
            CEP: CEP,
            country: country,
            CPF: CPF,
            rg: rg

        }
    }, (err, result) => {
        if (err) return res.send(err)
        res.redirect('/show')
        console.log('Atualizado no Banco de Dados')
    })
})

app.route('/delete/:id')
.get((req,res) => {
    var id = req.params.id

    db.collection('data').deleteOne({_id: ObjectId(id)}, (err,result) => {
        if (err) return res.send(err)
        console.log('Deletado do Banco de Dados!')
        res.redirect('/show')
    })
})
*/