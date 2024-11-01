import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static passwordValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const hasNumber = /[0-9]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasUpper = /[A-Z]/.test(value);
      const hasValidLength = value.length >= 8;
      const hasSpecialChar = /[@&$]/.test(value);
      const validPassword = hasSpecialChar && hasValidLength && hasNumber && hasLower && hasUpper;
      return !validPassword ? { passwordStrength: true } : null;
    };
  }
  static passwordMatches(form: AbstractControl): ValidationErrors | null {
    const reTypePassword = form.get('retypePassword')?.value;
    const password = form.get('password')?.value;
    if (password !== reTypePassword) {
      return { passwordsMismatch: true };
    }
    return null;
  }
}
