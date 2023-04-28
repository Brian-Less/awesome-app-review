import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {

  showAlert: boolean;
  LoginForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.LoginForm = this._formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  signIn() {

    if (this.LoginForm.invalid) {
      return;
    }

    if (this.LoginForm.value.username == "admin" && this.LoginForm.value.password == "admin") {
      this._router.navigate(["/admin/dashboard"]);
    } else {
      this.showAlert = true;
    }
  }
}
