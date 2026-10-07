import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChatbotService, ChatQuickReply } from '../../../core/services/chatbot.service';

interface ChatMessage {
  id: number;
  sender: 'assistant' | 'user';
  text: string;
  route?: string;
}

@Component({
  selector: 'app-chatbot-widget',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './chatbot-widget.component.html',
  styleUrl: './chatbot-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatbotWidgetComponent {
  private readonly chatbotService = inject(ChatbotService);
  private messageId = 1;

  @ViewChild('messageInput') private messageInput?: ElementRef<HTMLInputElement>;

  readonly isOpen = signal(false);
  readonly isTyping = signal(false);
  readonly draft = signal('');
  readonly quickReplies: ChatQuickReply[] = this.chatbotService.getQuickReplies();
  readonly messages = signal<ChatMessage[]>([
    {
      id: this.messageId++,
      sender: 'assistant',
      text: '¡Hola! Soy el asistente virtual de PetCare. ¿En qué podemos ayudarte?'
    }
  ]);

  openChat(): void {
    this.isOpen.set(true);
    setTimeout(() => this.messageInput?.nativeElement.focus());
  }

  closeChat(): void {
    this.isOpen.set(false);
  }

  updateDraft(value: string): void {
    this.draft.set(value);
  }

  sendDraft(): void {
    this.sendMessage(this.draft());
  }

  handleSubmit(event: SubmitEvent): void {
    event.preventDefault();
    this.sendDraft();
  }

  sendQuickReply(reply: ChatQuickReply): void {
    this.sendMessage(reply.message, reply.route);
  }

  trackByMessageId(_index: number, message: ChatMessage): number {
    return message.id;
  }

  private sendMessage(message: string, route?: string): void {
    const text = message.trim();
    if (!text || this.isTyping()) {
      return;
    }

    this.messages.update((messages) => [
      ...messages,
      { id: this.messageId++, sender: 'user', text }
    ]);
    this.draft.set('');
    this.isTyping.set(true);

    this.chatbotService.sendMessage(text).subscribe({
      next: (response) => {
        this.messages.update((messages) => [
          ...messages,
          {
            id: this.messageId++,
            sender: 'assistant',
            text: response,
            route: route ?? this.chatbotService.getRouteForMessage(text)
          }
        ]);
        this.isTyping.set(false);
      },
      error: () => {
        this.messages.update((messages) => [
          ...messages,
          {
            id: this.messageId++,
            sender: 'assistant',
            text: 'No pude responder en este momento. Puedes volver a intentarlo más tarde.'
          }
        ]);
        this.isTyping.set(false);
      }
    });
  }
}
