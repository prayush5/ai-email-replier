import { Component } from '@angular/core';
import { EmailService } from '../../services/email-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './email-form.html',
  styleUrl: './email-form.css'
})
export class EmailForm {

  emailContent = '';
  tone = 'friendly';
  generatedReply = '';
  loading = false;
  errorMessage = '';
  copied = false;
  copyError = '';

  constructor(private emailService: EmailService) {}

  onSubmit(){
    this.generatedReply = '';
    this.errorMessage = '';
    this.loading = true;

    this.emailService.generateReply({
      emailContent: this.emailContent,
      tone: this.tone
    }).subscribe({
      next: (reply) => {
        this.generatedReply = reply;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.loading = false;
      }
    });
  }

  async copyToClipboard() {
    if (!this.generatedReply) return;

    try {
      // Use the modern Clipboard API
      await navigator.clipboard.writeText(this.generatedReply);
      this.copied = true;
      this.copyError = '';
      
      // Reset the copied status after 2 seconds
      setTimeout(() => {
        this.copied = false;
      }, 2000);
      
    } catch (err) {
      // Fallback for older browsers
      this.fallbackCopyToClipboard();
    }
  }

  private fallbackCopyToClipboard() {
    const textArea = document.createElement('textarea');
    textArea.value = this.generatedReply;
    
    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        this.copied = true;
        this.copyError = '';
        setTimeout(() => {
          this.copied = false;
        }, 2000);
      } else {
        this.copyError = 'Failed to copy text';
      }
    } catch (err) {
      this.copyError = 'Browser does not support clipboard copy';
    }
    
    document.body.removeChild(textArea);
  }
}

