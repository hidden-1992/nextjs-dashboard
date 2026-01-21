import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({auth, request: { nextUrl, method }}) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      
      // 不拦截 POST 请求（Server Actions）
      if (method === 'POST') {
        return true;
      }
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; 
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    }
  },
  providers: [],
} satisfies NextAuthConfig;