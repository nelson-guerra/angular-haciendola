import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
   selector: 'app-main-content',
   standalone: true,
   imports: [RouterOutlet, HeaderComponent, SidenavComponent, MatSidenavModule],
   templateUrl: './main-content.component.html',
   styleUrl: './main-content.component.scss',
})
export class MainContentComponent implements OnInit {
   @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

   opened = true;
   isBiggerScreen = true;

   ngOnInit() {
      this.fixSideNavParams(window.innerWidth);
   }

   @HostListener('window:resize', ['$event'])
   onResize(event: any) {
      this.fixSideNavParams(event.target.innerWidth);
   }

   fixSideNavParams(innerWidth: number) {
      if (innerWidth < 600) {
         this.sidenav.fixedTopGap = 55;
      } else {
         this.sidenav.fixedTopGap = 65;
      }

      if (innerWidth < 800) {
         this.isBiggerScreen = false;
         this.opened = false;
      } else {
         this.isBiggerScreen = true;
         this.opened = true;
      }
   }

   logout() {
      console.log('logout');
   }
}
