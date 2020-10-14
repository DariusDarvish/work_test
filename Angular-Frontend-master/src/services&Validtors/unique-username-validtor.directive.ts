import { Directive } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserinfoService } from 'src/services&Validtors/userinfo.service';




export function UniqueUsernameValidtor(userinfoService:UserinfoService): AsyncValidatorFn{
  return(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>=> {
    return userinfoService.getUserByUserName(c.value).pipe(
      map(users => {
        return users && users.length > 0 ? { 'UniqueUsername': true } : null;
        
      })


    );
  }
}




@Directive({
  selector: '[UniqueUsername]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UniqueUsernameValidtorDirective, multi: true }]
})
export class UniqueUsernameValidtorDirective implements AsyncValidator {

  constructor(private userinfoService: UserinfoService) { }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return UniqueUsernameValidtor(this.userinfoService)(c);
  }

}
