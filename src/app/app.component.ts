import { Component, ViewChild } from '@angular/core';
import { Form, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Forms';
  name='Omkar';
  mail='OmkarShinde@inquizity.com';
  answer='';
  genders=['Male','Female'];
  Submitted=false;
  usersData={
       
        Mail:'',
        username:'',
       
       gender:'',
       questionAnswer:'',
       secret:'',
  }
  SignUpForm:FormGroup;
  @ViewChild('form')signUPForm:NgForm;

  onSubmit(){
    this.Submitted=true
    console.log(this.signUPForm);
    this.usersData.username=this.signUPForm.value.userdata.username;
    this.usersData.Mail=this.signUPForm.value.userdata.Mail;
    this.usersData.secret=this.signUPForm.value.secret;
    this.usersData.questionAnswer=this.signUPForm.value.questionAnswer;
    this.usersData.gender=this.signUPForm.value.gender;
    this.signUPForm.reset();
  }
  SuggestUsername(){
    //  this.name='Shubham'
    this.signUPForm.form.patchValue({
      userdata:{
        username:'shubham'
      }
    })
  }

  onSubmitRandom(formdata){
    console.log(formdata)
  }
}
