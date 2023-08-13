const express=require('express')
const path=require('path')
const hbs=require('hbs')
const app=express()
const port=5000
const static_path=path.join(__dirname,'../public')
const view_path=path.join(__dirname,'../templates/views')
const partials_path=path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs');
app.set("views",view_path)
hbs.registerPartials(partials_path)
app.use(express.static(static_path))

app.get("",(req,res)=>{
    res.render('index')
})
app.get("/forecast",(req,res)=>{
    res.render('forecast')
})
app.get("/aqi",(req,res)=>{
    res.render('aqi')
})

app.listen(port,()=>{
    console.log(`listing to the port ${port} `)
})
