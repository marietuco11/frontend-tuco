import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripHtmlPipe } from '../../pipes/strip-html.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, StripHtmlPipe, RouterLink],
  templateUrl: './event-card.html',
  styleUrl: './event-card.scss'
})
export class EventCardComponent {
  @Input() event: any;
}