import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { LITERALS } from '../../constants/literals';
import { Location } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatNavList, MatListItem } from '@angular/material/list';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatNavList,
    MatListItem,
    CapitalizePipe,
    RouterOutlet,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent implements OnInit {
  literals = LITERALS;
  currentRoute: string = '';
  showMenu: boolean = false;

  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private location: Location = inject(Location);
  private authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => (this.currentRoute = this.getRouteName()));
  }

  private getRouteName(): string {
    const path = this.activatedRoute.snapshot.firstChild?.routeConfig?.path;
    if (path?.includes(this.literals.routes.slash)) {
      return path.split(this.literals.routes.slash)[0];
    } else if (path) {
      console.log(path);
      return path;
    } else {
      return this.literals.routes.home;
    }
  }

  protected goBack() {
    this.location.back();
  }

  protected openMenu(): boolean {
    this.showMenu = !this.showMenu;
    return this.showMenu;
  }

  protected showArrowBack(): boolean {
    return (
      this.currentRoute !== this.literals.routes.registration &&
      this.currentRoute !== this.literals.routes.login
    );
  }

  protected logout(sidenav: MatSidenav): void {
    sidenav.close();
    this.authService.logout();
  }
}
