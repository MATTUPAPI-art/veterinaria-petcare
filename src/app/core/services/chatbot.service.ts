import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

export interface ChatQuickReply {
  id: number;
  label: string;
  message: string;
  route?: string;
}

interface MockResponse {
  match: string[];
  response: string;
  route?: string;
}

const QUICK_REPLIES: ChatQuickReply[] = [
  { id: 1, label: 'Servicios', message: 'Quiero conocer los servicios', route: '/servicios' },
  { id: 2, label: 'Horarios', message: '¿Cuáles son sus horarios?', route: '/ubicaciones' },
  { id: 3, label: 'Ubicaciones', message: '¿Dónde están ubicados?', route: '/ubicaciones' },
  { id: 4, label: 'Precios', message: 'Quiero consultar los precios', route: '/precios' },
  { id: 5, label: 'Agendar cita', message: 'Quiero agendar una cita', route: '/contacto' }
];

const MOCK_RESPONSES: MockResponse[] = [
  {
    match: ['servicio', 'servicios'],
    response: 'Puedes conocer nuestros servicios veterinarios en la sección Servicios.',
    route: '/servicios'
  },
  {
    match: ['horario', 'horarios', 'abren', 'abierto'],
    response: 'Puedes consultar los horarios de cada sede en la sección Ubicaciones.',
    route: '/ubicaciones'
  },
  {
    match: ['ubicacion', 'ubicaciones', 'sede', 'sedes', 'direccion', 'direcciones', 'donde'],
    response: 'Puedes consultar nuestras sedes y horarios en la sección Ubicaciones.',
    route: '/ubicaciones'
  },
  {
    match: ['precio', 'precios', 'tarifa', 'tarifas', 'cuesta', 'costo', 'costos'],
    response: 'Los precios referenciales están disponibles en nuestra sección Precios.',
    route: '/precios'
  },
  {
    match: ['cita', 'agendar', 'agenda', 'contacto', 'contactar'],
    response: 'Puedes enviarnos tu solicitud desde la sección Contacto.',
    route: '/contacto'
  }
];

const FALLBACK_RESPONSE = 'Por ahora puedo ayudarte con servicios, precios, ubicaciones, horarios y citas.';

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  getQuickReplies(): ChatQuickReply[] {
    return QUICK_REPLIES;
  }

  sendMessage(message: string): Observable<string> {
    const normalizedMessage = this.normalize(message);
    const match = MOCK_RESPONSES.find((item) => item.match.some((keyword) => normalizedMessage.includes(keyword)));
    return of(match?.response ?? FALLBACK_RESPONSE).pipe(delay(550));
  }

  getRouteForMessage(message: string): string | undefined {
    const normalizedMessage = this.normalize(message);
    return MOCK_RESPONSES.find((item) => item.match.some((keyword) => normalizedMessage.includes(keyword)))?.route;
  }

  private normalize(message: string): string {
    return message
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('es')
      .trim();
  }
}
