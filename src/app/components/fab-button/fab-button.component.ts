import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-fab-button',
    imports: [MatButtonModule, MatDividerModule, MatIconModule, RouterModule],
    templateUrl: './fab-button.component.html',
    styleUrl: './fab-button.component.css'
})
export class FabButtonComponent {
  @Input() type: string = '';
}
