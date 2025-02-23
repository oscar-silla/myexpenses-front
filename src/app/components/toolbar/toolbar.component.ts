import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { LITERALS } from '../../constants/literals';
import { Location } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CapitalizePipe],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent implements OnInit {
  literals = LITERALS;
  currentRoute: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(
        () =>
          (this.currentRoute =
            this.activatedRoute.snapshot.firstChild?.routeConfig?.path ||
            this.literals.routes.home)
      );
  }

  protected goBack() {
    this.location.back();
  }
}
