import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

@Component({
   selector: 'app-sidenav',
   standalone: true,
   imports: [RouterLink, MatIconModule, MatListModule, MatIconModule],
   templateUrl: './sidenav.component.html',
   styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
   @Output() sidenavClose = new EventEmitter();

   public onSidenavClose = () => {
      this.sidenavClose.emit();
   };
}
