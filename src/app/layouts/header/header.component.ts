import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';

@Component({
   selector: 'app-header',
   standalone: true,
   imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
   templateUrl: './header.component.html',
   styleUrl: './header.component.scss',
})
export class HeaderComponent {
   private readonly _authService = inject(AuthService);

   @Output() public sidenavEmit = new EventEmitter();
   @Output() public logoutEmit = new EventEmitter();

   username = '';

   ngOnInit(): void {
      const data = this._authService.getInfoUser();
      this.username = data.email;
   }

   public onSidenav = () => {
      this.sidenavEmit.emit();
   };

   public onLogout = () => {
      this.logoutEmit.emit();
      this._authService.logout();
   };
}
