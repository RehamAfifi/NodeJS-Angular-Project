import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile-img',
  templateUrl: './edit-profile-img.component.html',
  styleUrls: ['./edit-profile-img.component.css']
})
export class EditProfileImgComponent implements OnInit {
  file:any = null
  modal:any={}
  constructor(private global:GlobalService , private toastr: ToastrService) { }

  ngOnInit(): void {
  }
 
  handleImg(ev : any){
    console.log(ev)
    this.file = ev.target.files
  }
  handleSubmit(){
    if(this.file != null){
      let formData = new FormData()
      formData.append("image" , this.file[0])
      // formData.append("userName" , this.modal.name)
      // formData.append("category" , "")
       this.global.uploadImg(formData).subscribe(data=>{
        console.log(data)
        this.toastr.warning('Hello world!', 'Toastr fun!');

       })
      
    }
  }

}
