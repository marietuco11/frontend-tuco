import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import { FriendsService } from '../../../core/services/friends.service';
import { ChatService } from '../../../core/services/chat.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private friendsService = inject(FriendsService);
  private chatService = inject(ChatService);
  private cdr = inject(ChangeDetectorRef);

  isLoggedIn$ = this.authService.isLoggedIn$();
  menuOpen: boolean = false;

  hasFriendsNotifications = false;

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser?.();

    if (!currentUser) return;

    this.loadFriendsNotifications();
  }

  loadFriendsNotifications(): void {
    forkJoin({
      pending: this.friendsService.getPendingRequests(),
      unread: this.chatService.getUnreadCountsByFriend()
    }).subscribe({
      next: ({ pending, unread }: any) => {
        const pendingCount = pending?.pendingRequests?.length || 0;

        const unreadMap = unread?.unreadMessagesByFriend || {};
        const unreadTotal = Object.values(unreadMap).reduce(
          (sum: number, count: any) => sum + Number(count || 0),
          0
        );

        this.hasFriendsNotifications = pendingCount > 0 || unreadTotal > 0;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar notificaciones del header:', err);
        this.hasFriendsNotifications = false;
        this.cdr.detectChanges();
      }
    });
  }
}