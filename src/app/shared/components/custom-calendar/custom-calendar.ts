import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // Importa tipos para evitar errores
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // Necesario para clics
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-calendar',
  imports: [CommonModule, FormsModule, FullCalendarModule],
  templateUrl: './custom-calendar.html',
  styleUrl: './custom-calendar.scss',
})

export class CustomCalendar {
  showModal = false;
  newEventTitle = '';
  selectedDateStr = '';
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    /*selectable: true, // Permite seleccionar fechas
    dateClick: (info) => this.handleDateClick(info), // Captura el clic
    events: [
      { title: 'Evento Demo', start: new Date() }
    ]*/
    dateClick: (arg) => this.openModal(arg.dateStr),
    events: []
  };
  openModal(date: string) {
    this.selectedDateStr = date;
    this.showModal = true;
  }

  saveEvent() {
    if (this.newEventTitle) {
      const newEvent = { title: this.newEventTitle, start: this.selectedDateStr };
      // Actualizamos los eventos de forma reactiva
      this.calendarOptions.events = [...(this.calendarOptions.events as any[]), newEvent];
      this.closeModal();
    }
  }

  closeModal() {
    this.showModal = false;
    this.newEventTitle = '';
  }

  handleDateClick(arg: any) {
    const title = prompt('Introduce el nombre del evento:');
    if (title) {
      // Lógica para registrar el evento (local o vía API)
      this.calendarOptions.events = [
        ...(this.calendarOptions.events as any[]),
        { title, start: arg.dateStr, allDay: arg.allDay }
      ];
    }
  }
}