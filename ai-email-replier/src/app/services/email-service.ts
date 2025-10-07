import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface EmailRequest{
  emailContent : string;
  tone : string;
}

interface EmailResponse{
  reply: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'http://localhost:8080/api/email/generate';

  constructor(private http : HttpClient){}
  
  generateReply(request : EmailRequest): Observable<string>{
    return this.http.post(this.apiUrl, request, {
      responseType: 'text'
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse){
    console.error('API Error', err);
    return throwError(() => new Error("Something went wrong: " + err.message));
  }


}
