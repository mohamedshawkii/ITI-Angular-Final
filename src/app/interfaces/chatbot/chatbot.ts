import { ChatService } from './../../Services/chat';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.scss']
})
export class ChatbotComponent {
  public isChatOpen = false;
  
  messages: Message[] = [];
  newMessage: string = '';
  isLoading: boolean = false;

  // Quick questions array
  quickQuestions: string[] = [
    'كيف يمكنني طلب منتج؟',
    'ما هي سياسة الإرجاع؟',
    'كيف يمكنني تتبع طلبي؟',
    'ما هي طرق الدفع المتاحة؟',
    'كيف يمكنني التواصل مع خدمة العملاء؟',
    'ما هي مدة التوصيل؟'
  ];

  constructor(private ChatService: ChatService) {}
  
  public toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
    // When the chat opens for the first time, add a greeting.
    if (this.isChatOpen && this.messages.length === 0) {
      this.messages.push({
        sender: 'bot',
        text: 'مرحباً! كيف يمكنني مساعدتك في منصة التسوق الإلكتروني اليوم؟ يمكنك سؤالي عن المنتجات، الطلبات، التوصيل، أو أي استفسار عام.',
        timestamp: new Date()
      });
    }
  }

  public sendQuickQuestion(question: string): void {
    this.newMessage = question;
    this.sendMessage();
  }

  public sendMessage(): void {
    if (!this.newMessage.trim() || this.isLoading) {
      return;
    }

    // Add user message
    this.messages.push({ 
      sender: 'user', 
      text: this.newMessage,
      timestamp: new Date()
    });
    
    const userQuestion = this.newMessage;
    this.newMessage = '';
    this.isLoading = true;

    // Scroll to bottom after adding user message
    setTimeout(() => this.scrollToBottom(), 100);

    this.ChatService.getAnswer(userQuestion).subscribe({
      next: (response) => {
        this.messages.push({ 
          sender: 'bot', 
          text: this.formatResponse(response.answer),
          timestamp: new Date()
        });
        this.isLoading = false;
        // Scroll to bottom after bot response
        setTimeout(() => this.scrollToBottom(), 100);
      },
      error: (err) => {
        console.error("API Error:", err);
        this.messages.push({ 
          sender: 'bot', 
          text: 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.',
          timestamp: new Date()
        });
        this.isLoading = false;
        setTimeout(() => this.scrollToBottom(), 100);
      }
    });
  }
  
  private formatResponse(text: string): string {
    // Convert markdown-style formatting to HTML
    return text
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>');
  }

  private scrollToBottom(): void {
    const chatHistory = document.querySelector('.chat-history');
    if (chatHistory) {
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }
  }

  // Handle Enter key press
  public onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}