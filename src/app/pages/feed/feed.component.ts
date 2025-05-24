import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonButtons,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonAvatar,
  IonItem,
  IonLabel,
  IonSkeletonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, logOut, person, refresh } from 'ionicons/icons';
import { SupabaseService, Post } from '../../services/supabase.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonFab,
    IonFabButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonButtons,
    IonRefresher,
    IonRefresherContent,
    IonSpinner,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonAvatar,
    IonItem,
    IonLabel,
    IonSkeletonText,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})

export class FeedComponent implements OnInit {
  posts: Post[] = [];
  isLoading = true;
  hasMore = true;
  private page = 0;
  private pageSize = 10;

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {
    addIcons({ add, logOut, person, refresh });
  }

  ngOnInit() {
    this.loadPosts();
  }

  async loadPosts(reset = false) {
    if (reset) {
      this.page = 0;
      this.posts = [];
      this.hasMore = true;
    }

    this.isLoading = true;

    try {
      const { data, error } = await this.supabase.getPosts();
      
      if (error) {
        console.error('Erro ao carregar posts:', error);
        this.posts = [];
        return;
      }

      if (data) {
        if (reset) {
          this.posts = data;
        } else {
          this.posts = [...this.posts, ...data];
        }
        
        // Verifica se há mais posts para carregar
        this.hasMore = data.length === this.pageSize;
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async doRefresh(event: any) {
    await this.loadPosts(true);
    event.target.complete();
  }

  async loadMore(event: any) {
    this.page++;
    await this.loadPosts();
    event.target.complete();
  }

  async logout() {
    try {
      await this.supabase.signOut();
      this.router.navigate(['/auth']);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  goToCreatePost() {
    this.router.navigate(['/create-post']);
  }

  trackByPostId(index: number, post: Post): string {
    return post.id;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'Agora mesmo';
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else if (diffInHours < 168) { // 7 dias
      return `${Math.floor(diffInHours / 24)}d`;
    } else {
      return date.toLocaleDateString('pt-BR');
    }
  }

  onImageError(event: any) {
    event.target.src = 'assets/image-placeholder.png';
  }
}
