const app = require("./app/server")
app.listen(process.env.PORT, ()=> console.log(`http://localhost:${process.env.PORT}`))