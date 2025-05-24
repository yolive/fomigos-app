import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonToast,
  IonSpinner,
  IonBackButton,
  IonProgressBar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { camera, image, checkmark, arrowBack } from 'ionicons/icons';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons,
    IonIcon,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonToast,
    IonSpinner,
    IonBackButton,
    IonProgressBar,
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})

export class CreatePostComponent {
  title = '';
  description = '';
  selectedImage: File | null = null;
  imagePreview = '';
  isLoading = false;
  uploadProgress = 0;
  errorMessage = '';
  successMessage = '';

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {
    addIcons({ camera, image, checkmark, arrowBack });
  }

  selectImage() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput?.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validações
      if (file.size > 5 * 1024 * 1024) { // 5MB
        this.errorMessage = 'A imagem deve ter no máximo 5MB';
        return;
      }

      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Por favor, selecione apenas arquivos de imagem';
        return;
      }

      this.selectedImage = file;
      
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  isFormValid(): boolean {
    return !!(
      this.title.trim() && 
      this.description.trim() && 
      this.selectedImage
    );
  }

  async createPost() {
    if (!this.isFormValid()) {
      this.errorMessage = 'Por favor, preencha todos os campos e selecione uma imagem';
      return;
    }

    this.isLoading = true;
    this.uploadProgress = 10;

    try {
      // Simular progresso de upload
      const progressInterval = setInterval(() => {
        if (this.uploadProgress < 90) {
          this.uploadProgress += 10;
        }
      }, 200);

      const { data, error } = await this.supabase.createPost(
        this.title.trim(),
        this.description.trim(),
        this.selectedImage!
      );

      clearInterval(progressInterval);
      this.uploadProgress = 100;

      if (error) {
        this.errorMessage = 'Erro ao criar post: ' + error.message;
      } else {
        this.successMessage = 'Post criado com sucesso!';
        
        // Aguardar um pouco para mostrar o sucesso
        setTimeout(() => {
          this.router.navigate(['/feed']);
        }, 1500);
      }
    } catch (error: any) {
      this.errorMessage = 'Erro inesperado: ' + (error.message || 'Tente novamente');
    } finally {
      this.isLoading = false;
      setTimeout(() => {
        this.uploadProgress = 0;
      }, 1000);
    }
  }
}
