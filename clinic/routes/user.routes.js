const router = require("express").Router() 
const auth = require("../app/middleware/auth.middleware")
const upload = require("../app/middleware/uploadFile.middleware")
const doctors = require("../app/controller/doctors.controller")

router.post("/register", doctors.register) //doctors registeration
router.post('/login', doctors.login)
router.get("/me", auth, doctors.me)
router.patch("/availability",auth, doctors.availability)
router.post('/logout', auth, doctors.logOut)
router.post('/logoutAll', auth, doctors.logOutAll)
router.patch('/editPassword', auth, doctors.editPassword)

router.patch('/editdoctors', auth, doctors.editdoctors)
router.patch('/activate', auth, doctors.activate)
router.patch('/activateWithoutLogin', doctors.activateWithoutLogin)
 router.patch('/changeImage', auth, upload.single('doctorsImg'), doctors.changeImage)

router.get("/all/:pageNum/:limit", doctors.alldoctorss)
router.get("/all/:id", doctors.singledoctors)
module.exports = router