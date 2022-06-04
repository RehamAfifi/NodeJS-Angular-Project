
const router = require("express").Router()
const auth = require("../app/middleware/auth.middleware")
// const upload = require("../app/middleware/uploadFile.middleware")
const patient = require("../app/controller/patient.controller")
router.post("/register", patient.register) //patient registeration
router.post('/login', patient.login)
router.get("/me", auth, patient.me)
router.post('/logout', auth, patient.logOut)
router.post('/logoutAll', auth, patient.logOutAll)
router.patch('/editPassword', auth, patient.editPassword)

router.patch('/editpatient', auth, patient.editpatient)
router.patch('/activate', auth, patient.activate)
router.patch('/activateWithoutLogin', patient.activateWithoutLogin)
// router.patch('/changeImage', auth, upload.single('patientImg'), patient.changeImage)

router.get("/all/:pageNum/:limit", auth, patient.allpatients)
router.get("/all/:id", patient.singlepatient)
module.exports = router
