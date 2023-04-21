const express = require('express');                     //Pacotes para funcionamento da API
const bodyParser = require ('body-parser');                         
const app = express()                                                          


//Middleware (Utilizar o CORS para consumir em uma pagina)
app.use(bodyParser.json())

const users = require('./users.json')


//Rotas 
// (Geralmente deve se criar um arquivo para estas rotas separado do arquivo principal e executar nele somente as chamadas dos mesmos)


//Buscar usuarios 
app.get('/users', (req, res)=>{
    try {
        res.status(200).json({users})
    } catch (error) {
        res.status(404).json({error: error})
    }
})


//Buscar um usuario pelo ID
app.get('/users/:id', (req, res)=>{
const {id} = req.params
const user = users.find(use => use.id == id)

    try {
        res.status(200).send(user)
    } catch (error) {
        res.status(404).json({message: "usuario não encontrado"})
    }
})


//Criar um novo usuario
app.post('/users', (req,res)=>{
    const user = {
        id : users.length + 1,
        nome: req.body.nome,
        idade: req.body.idade,
        approved: req.body.approved
    }

    try {
        users.push(user)
        res.status(201).send(user)
    } catch (error) {
        res.status(400).json({error: error})        
    }
})


// Editar um Usuario
app.put('/users/:id',(req, res)=>{
    const {id} = req.params
    const user = users.find(use => use.id == id) 
    const {nome, idade, approved} = req.body
    
    user.nome = nome
    user.idade = idade;
    user.approved = approved

    try {
        res.status(200).send(user)
    } catch (error) {
        res.status(400).json({error: error})
    }  

})


//Deletar um Usuario
app.delete('/users/:id', (req, res)=>{
    const {id} = req.params
    const delUser = users.filter(user => user.id != id)

    
    try {
        res.status(410).send(delUser)
    } catch (error) {
        res.status(400).json({error: error})
        
    }
})


//Configurações do servidor
const PORT = 3000

app.listen(PORT,()=>{
    console.log(`Conectado na porta ${PORT}`)
})


