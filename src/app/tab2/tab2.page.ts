import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor( private _formBuilder: FormBuilder) {}

  public loginForm: FormGroup;
  public authenticationError = '';
  public validationMessages =
      {
          email:
              [
                  { type: 'required', message: StringResources.EMAIL_MANDATORY },
                  { type: 'pattern', message: StringResources.INVALID_EMAIL_FORMAT }
              ],
          password:
              [
                  { type: 'required', message: StringResources.PASSWORD_MANDATORY },
                  { type: 'minlength', message: StringResources.INVALID_PASSWORD_FORMAT }
              ]
      };

  public ngOnInit(): void
    {
        this.loginForm =
            this._formBuilder.group(
                {
                    email: new FormControl( ''
                        , Validators.compose(
                            [
                                Validators.required,
                                Validators.pattern( StringResources.EMAIL_REGEX )
                            ] ) ),
                    password: new FormControl( ''
                        , Validators.compose(
                            [
                                Validators.minLength( 5 ),
                                Validators.required
                            ] ) )
                } );
    }

    public doLogin() {};

}

class StringResources
{
    public static readonly UNEXPECTED_ERROR = 'Se ha producido un error no esperado. Vuelva a intentar la operación y si el problema persiste, contacte con el adminitrador de la aplicación';
    public static readonly EMAIL_MANDATORY = 'Debe proporcionar una dirección de email.';
    public static readonly INVALID_EMAIL_FORMAT = 'El email no tiene un formato correcto.';
    public static readonly PASSWORD_MANDATORY = 'Debe proporcionar una contraseña.';
    public static readonly INVALID_PASSWORD_FORMAT = 'La contraseña debe tener al menos 5 caracteres.';
    public static readonly PASSWORD_CONFIRMATION_MANDATORY = 'Debe confirmar la contraseña';
    public static readonly PASSWORD_MISMATCH = 'Las contraseñas no coinciden';
    public static readonly EMAIL_REGEX = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
}
