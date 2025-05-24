import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
}

export interface Post {
  id: string;
  user_id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  profiles?: Profile;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private _currentUser = new BehaviorSubject<User | null>(null);

  constructor() {
    // Configuração com storage customizado para evitar o erro de LockManager
    this.supabase = createClient(
      environment.supabase.url, 
      environment.supabase.key,
      {
        auth: {
          storage: {
            getItem: (key: string) => {
              return localStorage.getItem(key);
            },
            setItem: (key: string, value: string) => {
              localStorage.setItem(key, value);
            },
            removeItem: (key: string) => {
              localStorage.removeItem(key);
            }
          },
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false
        }
      }
    );
    
    // Inicializar usuário atual
    this.initializeAuth();
  }

  private async initializeAuth() {
    try {
      const { data } = await this.supabase.auth.getSession();
      this._currentUser.next(data.session?.user ?? null);

      // Escutar mudanças de autenticação
      this.supabase.auth.onAuthStateChange((event, session) => {
        this._currentUser.next(session?.user ?? null);
      });
    } catch (error) {
      console.error('Erro ao inicializar autenticação:', error);
      this._currentUser.next(null);
    }
  }

  get currentUser() {
    return this._currentUser.asObservable();
  }

  // Resto dos métodos permanecem iguais...
  async signUp(email: string, password: string, username: string, fullName: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          full_name: fullName
        }
      }
    });
    return { data, error };
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    return { error };
  }

  async getPosts() {
    const { data, error } = await this.supabase
      .from('posts')
      .select(`
        *,
        profiles (
          username,
          full_name,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false });
    
    return { data, error };
  }

  async createPost(title: string, description: string, imageFile: File) {
    const user = this._currentUser.value;
    if (!user) throw new Error('Usuário não autenticado');

    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await this.supabase.storage
      .from('post-images')
      .upload(fileName, imageFile);

    if (uploadError) throw uploadError;

    const { data: urlData } = this.supabase.storage
      .from('post-images')
      .getPublicUrl(fileName);

    const { data, error } = await this.supabase
      .from('posts')
      .insert({
        user_id: user.id,
        title,
        description,
        image_url: urlData.publicUrl
      })
      .select()
      .single();

    return { data, error };
  }

  async getProfile(userId: string) {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    return { data, error };
  }
}