import { AbstractControl, ValidationErrors } from '@angular/forms';

export class FormValidators {
   static integer = (control: AbstractControl<string>): ValidationErrors | null => {
      const numbers = new RegExp('^[0-9]+$');

      if (!numbers.test(control.value)) {
         return { integerInvalid: true };
      }

      return null;
   };

   static decimal = (control: AbstractControl<string>): ValidationErrors | null => {
      const numbers = new RegExp('^[0-9]{1,11}(?:.[0-9]{1,3})?$');

      if (!numbers.test(control.value)) {
         return { decimalInvalid: true };
      }

      return null;
   };
}
