import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  type = 'password';
  submitAttemptLogin = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private toastController: ToastController) {

   }
  ngOnInit() {
    this.setLoginForm();
  }
  setLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.maxLength(45)]],
      password: ['', [Validators.required, Validators.maxLength(45)]]
    });
  }
  onSubmit(): void {
    this.submitAttemptLogin = true;
    if (this.loginForm.valid) {
      if(this.loginForm.value.userName == 'aravind' && this.loginForm.value.password ==  '123456'){
        this.router.navigateByUrl('/home');
      } else {
          this.presentToast();
      }
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Please Enter valid details to login',
      color: "danger",
      duration: 2000
    });
    toast.present();
  }

}
