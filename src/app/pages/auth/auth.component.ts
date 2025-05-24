import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonToast,
  IonSpinner,
} from '@ionic/angular/standalone';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonSegment,
    IonSegmentButton,
    IonToast,
    IonSpinner,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})

export class AuthComponent {
  authMode: 'login' | 'register' = 'login';
  email = '';
  password = '';
  username = '';
  fullName = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {
    // Redireciona se já estiver logado
    this.supabase.currentUser.subscribe(user => {
      if (user) {
        this.router.navigate(['/feed']);
      }
    });
  }

  get isLogin(): boolean {
    return this.authMode === 'login';
  }

  onSegmentChange() {
    this.clearForm();
  }

  clearForm() {
    this.email = '';
    this.password = '';
    this.username = '';
    this.fullName = '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  async onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      if (this.isLogin) {
        const { error } = await this.supabase.signIn(this.email, this.password);
        
        if (error) {
          this.errorMessage = 'Email ou senha incorretos';
        } else {
          this.successMessage = 'Login realizado com sucesso!';
          this.router.navigate(['/feed']);
        }
      } else {
        const { error } = await this.supabase.signUp(
          this.email, 
          this.password, 
          this.username, 
          this.fullName
        );
        
        if (error) {
          this.errorMessage = error.message;
        } else {
          this.successMessage = 'Cadastro realizado! Verifique seu email.';
          this.authMode = 'login';
          this.clearForm();
        }
      }
    } catch (error: any) {
      this.errorMessage = error.message || 'Erro inesperado';
    } finally {
      this.isLoading = false;
    }
  }

}
