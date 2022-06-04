// const bcrypt = require("bcryptjs")
// let pass = "123456"

// const x = async() => {
//     try{
//         let a =  await bcrypt.hash(pass, 10)
//         console.log(a)
//         let b = await bcrypt.compare(pass, a)
//         console.log(b);
//     }
//     catch(e){
//         console.log(e)
//     }
// }

// x()

// bearer token => jsonwebtoken

const jwt = require("jsonwebtoken")

const id = "123abv"
const encoded = jwt.sign({_id:id}, "s11")
console.log(encoded)
const decoded = jwt.verify(encoded, "s11")
console.log(decoded);





