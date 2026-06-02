import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-citas',
  imports: [FullCalendarModule],
  templateUrl: './citas.html',
  styleUrl: './citas.css'
})
export class Citas {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: 'es',
    headerToolbar: {
      left: 'prev',
      center: 'title',
      right: 'next'
    },
    events: [
      { title: 'Jessica Martínez', date: '2026-06-01', color: '#2e7d32' },
      { title: 'Francisco López', date: '2026-06-03', color: '#c62828' },
      { title: 'Mauricio Castañeda', date: '2026-06-05', color: '#e65100' },
    ],
    dateClick: (info) => {
      alert('Fecha seleccionada: ' + info.dateStr);
    }
  };
}