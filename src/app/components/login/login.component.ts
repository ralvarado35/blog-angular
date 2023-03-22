import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent {

  public page_title: string;
  public user: User;
  public status: string | undefined;
  public token: any;
  public identity: any;

  constructor(
    private _userService: UserService

  ) {
    this.page_title = 'Identificate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '')

  }

  onSubmit(form: any) {
    this._userService.signup(this.user).subscribe(
      response => {
        //TOKEN
        if (response.status != Error) {
          this.status = 'success';
          this.token = response;

          // objeto de usurio identificado
          this._userService.signup(this.user, true).subscribe(
            response => {
               this.identity = response;      

              // PERSISTIR DATOS USUARIO IDENTIFICADO
              console.log(this.token);
              console.log(this.identity);

               localStorage.setItem('token', JSON.stringify(this.token));
               localStorage.setItem('identity', JSON.stringify(this.identity));

               
            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
          );

        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );

  }

}