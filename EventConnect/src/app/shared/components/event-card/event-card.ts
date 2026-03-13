import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripHtmlPipe } from '../../pipes/strip-html.pipe';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, StripHtmlPipe],
  templateUrl: './event-card.html',
})
export class EventCardComponent {
  @Input() event: any;
}