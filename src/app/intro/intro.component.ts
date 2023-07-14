import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  passwordLogin:FormGroup;
  Submit:boolean  =false;
  form:FormGroup;
  otpLogin:FormGroup;
  forgotPassword:boolean = false;
  emailSubmit:boolean = false;
  invalidOtp:boolean = false;
  otpSubmit:boolean = false;
  constructor(private router:Router,
    private fb:FormBuilder,
    private authService:SocialAuthService,
    private _api:ApiService
    ) { }


    googleLogin(){
      this.authService.authState.subscribe((user) => {
        // this.user = user;
        // this.loggedIn = (user != null);
        // console.log("Checking data of the user",user);
        localStorage.setItem('logged_in','true')
       this.forgotPassword ? this.otpLogin.get('email').setValue(user.email) : this.passwordLogin.get('email').setValue(user.email);
        // this.router.navigate(['/dashboard'])
      });
    }

  ngOnInit(): void {
    this.googleLogin();
    this.new();
    localStorage.setItem('selected','login');
    this.validation()
  }

// Function for testing  purpose only 
  Log(e:any){
    console.log("Welcome to Login " + e);

  }

// Function to set validation of the password login form 
  validation(){
    this.passwordLogin = this.fb.group({
      email: new FormControl('',Validators.compose([Validators.required,Validators.email])),
      password: new FormControl('',Validators.required)
    })
  }


// Function to set validation of the otp login form 
  validation2(){
    this.otpLogin = this.fb.group({
      email: new FormControl('',Validators.compose([Validators.required,Validators.email])),
      otp: new FormControl('',Validators.required)
    })
  }


  // Function hits when user submits his/her details 
  submit(){
    
    localStorage.setItem('submit','true');
    this.Submit = true;
    setTimeout(()=>{
      this.Submit = false;
    },2000)
    if(this.passwordLogin.valid){
      if(this.passwordLogin.value.email !== 'pankaj.phour70@gmail.com' || this.passwordLogin.value.password !== 'Pankaj@123'){
        console.log("Invalid user");
        
      }else{
        localStorage.setItem('logged_in','true')
        this.router.navigate(['/dashboard'])
      }
    }
  }


  // This function was just for testing purpose of the concept setValue and patchValue 
  new(){
    this.form= new FormGroup({
      age : new FormControl ('',Validators.required),
      gender:new FormControl('',Validators.required),
      name:new FormControl('',Validators.required),
      email:new FormControl('',Validators.compose([Validators.required,Validators.email])),
    })
    let obj = {
      age:12,
      gender:'Male',
      name: 'Pankaj',
      // email: 'pankaj@pankaj.com'
    }
    let obj2 = {
      age:22,
      gender:'Female',
      zipCode:'231232'
    }
    // this.form.setValue(obj);
    
    this.form.patchValue(obj2)
    console.log(this.form);
  }

  loginChange(){
    this.forgotPassword = !this.forgotPassword;
  }


  onOtpChange(e: any) {
    if (e.length > 3) {
      const params = {
        otp: +e,
        email : localStorage.getItem('user-email')
      }
      this._api.otpChecker('/otpChecker', params).subscribe((next: any) => {
        if(next && !next.error){

          this.invalidOtp = false;
          setTimeout(() => {
            this.emailSubmit = false;
            // this._api.obNotify({
            //   start: true,
            //   code: 200,
            //   status: 'success',
            //   message: next.message
            // })
            localStorage.setItem('user',JSON.stringify(next.response))
            this.router.navigate(['/dashboard']);
          }, 2000);
        }
        else{
          this.otpSubmit = true;
          this.invalidOtp = true;
          setTimeout(() => {
            this.otpSubmit = false;
            // this._api.obNotify({
            //   start: true,
            //   code: 200,
            //   status: 'error',
            //   message: next.message
            // })
          }, 2000);
          console.log("Invalid OTP");
          
        }
      })
    }
    else {
      this.invalidOtp = true;
    }
  }

  keyValue(e: any) {
    if (((e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 8)) {
      // DO NOTHING 
    }
    else {
      e.preventDefault();
    }
  }

}
