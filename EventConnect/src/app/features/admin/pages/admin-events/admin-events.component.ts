import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { AdminTopbarComponent } from '../../components/admin-topbar/admin-topbar.component';
import { AdminService } from '../../../../core/services/admin.service';

interface AdminEvent {
  id: string;
  name: string;
  date: string;
  enrolled: string;
  category: string;
  status: 'Activo' | 'Pendiente';
}

interface AdminEventsData {
  events: AdminEvent[];
  isLoading: boolean;
  errorMessage: string;
}

@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminTopbarComponent],
  templateUrl: './admin-events.component.html',
  styleUrl: './admin-events.component.scss'
})
export class AdminEventsComponent {
  private adminService = inject(AdminService);

  search = '';
  selectedStatus = 'Todos';

  events$: Observable<AdminEventsData> = this.adminService.getEvents().pipe(
    map((response) => ({
      events: response.events.map((event) => ({
        id: event.id,
        name: event.name,
        date: new Date(event.date).toLocaleDateString('es-ES'),
        enrolled: String(event.enrolled).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        category: event.category,
        status: event.status === 'active' ? ('Activo' as const) : ('Pendiente' as const)
      })),
      isLoading: false,
      errorMessage: ''
    })),
    startWith({
      events: [],
      isLoading: true,
      errorMessage: ''
    }),
    catchError((error) => of({
      events: [],
      isLoading: false,
      errorMessage: error?.error?.message || 'No se pudo cargar la lista de eventos'
    }))
  );

  getFilteredEvents(events: AdminEvent[]): AdminEvent[] {
    return events.filter((event) => {
      const matchesSearch =
        event.name.toLowerCase().includes(this.search.toLowerCase()) ||
        event.category.toLowerCase().includes(this.search.toLowerCase());

      const matchesStatus =
        this.selectedStatus === 'Todos' || event.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  createEvent(): void {
    console.log('Crear evento');
  }

  editEvent(event: AdminEvent): void {
    console.log('Editar evento', event);
  }

  viewEvent(event: AdminEvent): void {
    console.log('Ver evento', event);
  }

  deleteEvent(event: AdminEvent): void {
    console.log('Eliminar evento', event);
  }
}