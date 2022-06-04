import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), // Validators.pattern()
    password: new FormControl('', [Validators.required ]) //  Validators.minLength(8), Validators.maxLength(15)
  })

  isSubmitted = false
  errorMsg:any=null
  constructor(private global : GlobalService , private router : Router) {
    let token = localStorage.getItem("token")
    if(token) this.router.navigateByUrl("")
   }

  get email(){return this.loginForm.get("email")}

  get userInfo(){return this.loginForm.controls}

  ngOnInit(): void {
  }

  handleLogin() {
    this.isSubmitted = true
    console.log(this.loginForm)
    if(this.loginForm.valid){
      this.global.login(this.loginForm.value).subscribe(res=>{
         console.log(res)
        // if(res.userRole == 5){
          // this.router.navigateByUrl("successLogin")
          this.router.navigate(['successLogin'])
          this.global.navFlag = true
          localStorage.setItem("token" , res.access_token)
          this.global.isLogIn = true
        // }
        if(res.error){
          this.errorMsg = res.error
        }
      } , ()=>{

      },()=>{

      })
    }
  }



}