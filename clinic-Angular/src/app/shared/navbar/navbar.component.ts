import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public global : GlobalService) {
    let token = localStorage.getItem("token")
    if(token) this.global.isLogIn = true
   }

  ngOnInit(): void {
  }
  handleLogOut(){
    localStorage.removeItem("token")
    this.global.isLogIn = false
  }

}
