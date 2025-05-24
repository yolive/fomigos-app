# 🍽️ Fomigos - Compartilhando Comida, Evitando Desperdício

## 📋 Sobre o Projeto

O **Fomigos** é uma aplicação móvel desenvolvida para conectar pessoas com o objetivo de compartilhar comida e combater o desperdício alimentar. Nossa plataforma permite que usuários publiquem ofertas de alimentos que não conseguirão consumir, criando uma rede solidária de compartilhamento de comida em suas comunidades.

### 🎯 Objetivos
- **Reduzir o desperdício alimentar** através do compartilhamento entre vizinhos
- **Fortalecer laços comunitários** conectando pessoas com interesses em comum
- **Promover sustentabilidade** dando nova vida aos alimentos que seriam descartados
- **Facilitar o acesso à comida** para quem precisa

## 🚀 Aplicação Completa

### **1. Backend (Supabase):**
- ✅ Configuração completa do projeto
- ✅ Tabelas `profiles` e `posts` com RLS (Row Level Security)
- ✅ Storage para imagens com políticas de segurança
- ✅ Autenticação automática e triggers

### **2. Frontend (Angular 17):**
- ✅ **Componente de Autenticação**: Login/Cadastro com validação
- ✅ **Feed de Posts**: Lista responsiva com pull-to-refresh e infinite scroll
- ✅ **Criação de Posts**: Upload de imagens com preview e validação
- ✅ **Serviços**: SupabaseService e AuthGuard
- ✅ **Design Mobile-First**: Usando Ionic Angular para UI nativa

### **3. Recursos Implementados:**
- ✅ Autenticação completa (login/cadastro/logout)
- ✅ CRUD de posts (criar/listar)
- ✅ Upload e display de imagens
- ✅ Design responsivo mobile-first
- ✅ Loading states e error handling
- ✅ Segurança com Row Level Security
- ✅ PWA ready com manifest

### **4. Funcionalidades Mobile:**
- 📱 Pull-to-refresh no feed
- 📱 Infinite scroll para mais posts
- 📱 FAB button para criar posts
- 📱 Upload de imagens com preview
- 📱 Navegação otimizada para mobile
- 📱 Toast notifications
- 📱 Progress indicators

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Angular 17 + Ionic
- **Backend**: Supabase (PostgreSQL)
- **Autenticação**: Supabase Auth
- **Storage**: Supabase Storage
- **UI/UX**: Ionic Components
- **PWA**: Angular Service Worker

## 📦 Instalação e Configuração

### **5. Próximos Passos:**

1. **Instale as dependências**
   ```bash
   npm install
   ```

2. **Execute a aplicação**
   ```bash
   npm start
   ```

3. **Teste em dispositivos móveis**
   ```bash
   npm run serve:mobile
   ```

## 🌟 Como Funciona

1. **Cadastro/Login**: Usuários criam contas seguras
2. **Publicar Ofertas**: Compartilhe fotos e descrições dos alimentos disponíveis
3. **Descobrir Comida**: Navegue pelo feed e encontre ofertas próximas
4. **Conectar**: Entre em contato com outros usuários para coordenar a coleta
5. **Compartilhar**: Contribua para uma comunidade mais sustentável

## 🤝 Contribuindo

Sua contribuição é bem-vinda! Este projeto visa criar um impacto positivo na sociedade através da tecnologia.


**Juntos podemos reduzir o desperdício alimentar e fortalecer nossas comunidades! 🌱**