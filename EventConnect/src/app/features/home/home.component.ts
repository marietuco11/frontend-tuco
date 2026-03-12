import { Component } from '@angular/core';
import { HeaderComponent } from '../../layout/components/header/header';
import { EventCardComponent } from '../../shared/components/event-card/event-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, EventCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}