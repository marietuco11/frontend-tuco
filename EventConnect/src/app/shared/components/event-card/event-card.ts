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

  defaultImage = 'assets/images/placeholder.svg';

  getImage(event: any): string {
    const img = event?.imageUrl;

    if (!img || typeof img !== 'string' || img.trim() === '') {
      return this.defaultImage;
    }

    return img;
  }

  onImageError(event: any) {
    event.target.src = this.defaultImage;
  }
}

