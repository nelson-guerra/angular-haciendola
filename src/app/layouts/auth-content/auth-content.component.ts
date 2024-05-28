import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
   selector: 'app-auth-content',
   standalone: true,
   imports: [RouterOutlet],
   templateUrl: './auth-content.component.html',
   styleUrl: './auth-content.component.scss',
})
export class AuthContentComponent {}
