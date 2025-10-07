import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmailForm } from './components/email-form/email-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EmailForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ai-email-replier');
}
