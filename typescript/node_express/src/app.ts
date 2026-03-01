import express from 'express'
const app = express()

app.use(express.json())
app.get('/',(req,res)=>{
    res.send("Server running! 🚀 TypeScript + Express is working!")
})

export default app