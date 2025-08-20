import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface GeminiRequest {
  contents: {
    parts: {
      text: string;
    }[];
  }[];
}

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly apiKey = 'AIzaSyA1RwlQ6L8rLs_linOnJAQQhvLC5vEfFoQ';
private readonly apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`;

  constructor(private http: HttpClient) { }

  /**
   * Sends a question to Gemini AI and returns the AI's answer.
   * @param question The user's question.
   * @returns An Observable containing the response object { answer: string }.
   */
  getAnswer(question: string): Observable<{ answer: string }> {
    const request: GeminiRequest = {
      contents: [
        {
          parts: [
            {
              text: `You are a helpful AI assistant for an e-commerce platform. Please provide helpful and accurate responses to user questions about products, orders, delivery, and general inquiries. Be concise but informative. User question: ${question}`
            }
          ]
        }
      ]
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    console.log('Sending request to Gemini API:', request);

    return this.http.post<GeminiResponse>(this.apiUrl, request, { headers }).pipe(
      map(response => {
        console.log('Gemini API Response:', response);
        if (response.candidates && response.candidates.length > 0) {
          return { answer: response.candidates[0].content.parts[0].text };
        } else {
          throw new Error('No response from Gemini AI');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Gemini API Error:', error);
        console.error('Error details:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          error: error.error
        });
        
        let errorMessage = 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.';
        
        if (error.status === 403) {
          errorMessage = 'خطأ في مفتاح API. يرجى التحقق من صحة المفتاح.';
        } else if (error.status === 429) {
          errorMessage = 'تم تجاوز حد الاستخدام. يرجى المحاولة لاحقاً.';
        } else if (error.status === 400) {
          errorMessage = 'خطأ في طلب API. يرجى المحاولة مرة أخرى.';
        }
        
        return from([{ answer: errorMessage }]);
      })
    );
  }
}