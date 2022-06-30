import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public global :GlobalService) { }
  docs:any=[]
  model:any={}
  // days2=[]
  ngOnInit(): void {
    this.global.allu().subscribe(data=>{
       console.log(data) 
       this.docs=data.data
       console.log(this.docs[0].name) 
      return this.docs })
     
  }
getDdays(){ }
  handleSubmit1(reg:NgForm){
      console.log(reg)
      console.log(this.model) 
      this.global.book(this.model).subscribe(res=>{
        console.log(res)
      })
    
  }

}




