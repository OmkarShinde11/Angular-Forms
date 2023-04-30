import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  Genders=['Male','Female']
  constructor() { }
  signupForm:FormGroup;
  forbiddenUsername=['Chris','Anna'];
  forbiddenEmails=['omkarshinde11122001@gmail.com','sid64325@gmail.com'];
  projectForm:FormGroup;
  forbiddenProjectName=['Test']
  
  ngOnInit(): void {
    this.signupForm=new FormGroup({
      userdata:new FormGroup({
        username:new FormControl(null,[Validators.required,this.forbiddenNames.bind(this)]),
        email:new FormControl(null,[Validators.required,Validators.email],this.forbiddenemails),
      }),
      gender:new FormControl('Male'),
      hobbies:new FormArray([]),
    })

    this.projectForm=new FormGroup({
      projectName:new FormControl(null,[Validators.required],this.forbidProjects),
      email:new FormControl(null,Validators.required),
      projectStatus:new FormControl(null,Validators.required),
    })

    this.signupForm.setValue({
      userdata:{
        username:'Omkar',
        email:'Omkar.Shinde@Inquizity.com'
      },
      gender:'Male',
      hobbies:[],
    })

    this.signupForm.patchValue({
      userdata:{
        username:'Siddhesh'
      }
    })

    this.signupForm.statusChanges.subscribe((value)=>{
      console.log(value)
    })
    this.signupForm.valueChanges.subscribe((value)=>{
      console.log(value)
    })
  }

  onSubmit(){
    console.log(this.signupForm)
  }
  addHobbies(){
    const control=new FormControl(null,Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control)
  }
  getControls(){
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  forbiddenNames(control:FormControl):{[s:string]:boolean}{
    if(this.forbiddenUsername.indexOf(control.value)!== -1){
      return {'WrongName':true}
    }
    return null;
  }

  forbiddenemails(control:FormControl):Promise<any> | Observable<any>{
    const promise=new Promise<any>((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value==='omkarshinde11122001@gmail.com'){
          resolve({'WrongEmail':true})
        }
        else{
          resolve(null)
        }
      },1500)
    })
    return promise
  }

  projectSubmit(){
    console.log(this.projectForm)
  }

  forbiddenProject(control:FormControl) :{[s:string]:boolean}{
    if(this.forbiddenProjectName.indexOf(control.value)!== -1){
      return({'forbidenProject':true})
    }
    return (null)
  }
  
  forbidProjects(control:FormControl):Promise<any>|Observable<any>{
    const promise=new Promise((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value ==='Test'){
          resolve({'forBidProject':true})
        }
        else{
          resolve(null)
        }
      },1500)
    })
     return promise
  }
}

