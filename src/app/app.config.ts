import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    // 🔥 معالجة الأخطاء العالمية
    provideBrowserGlobalErrorListeners(),

    // 🔥 Zoneless للتحسينات
    provideZonelessChangeDetection(),

    // 🔥 Router مع تحسينات إضافية
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top', // 🔥 استعادة موضع التمرير
        anchorScrolling: 'enabled' // 🔥 تمكين التمرير للعناصر
      }),
      withViewTransitions() // 🔥 إضافة تأثيرات الانتقال (اختياري)
    ),

    // 🔥 SSR و Client Hydration
    provideClientHydration(withEventReplay()),

    // 🔥 HTTP Client مع fetch
    provideHttpClient(
      withFetch(),
      // 🔥 يمكن إضافة interceptors هنا لاحقاً
      // withInterceptors([authInterceptor])
    )

    // ✅ صحيح - لا حاجة لـ APP_INITIALIZER لأن AuthService يبدأ تلقائياً
  ]
};