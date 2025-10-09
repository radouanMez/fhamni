import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AppInitService {
    constructor(private authService: AuthService) { }

    init(): Promise<void> {
        return new Promise((resolve) => {
            console.log('🚀 Starting app initialization...');

            if (this.authService.authReadySubject.value) {
                console.log('✅ Auth already ready');
                resolve();
                return;
            }  
            // الانتظار حتى اكتمال التهيئة
            const subscription = this.authService.authReady$.subscribe(ready => {
                if (ready) {
                    console.log('✅ Auth initialization completed');
                    subscription.unsubscribe();
                    resolve();
                }
            });

            // timeout احتياطي بعد 3 ثواني
            setTimeout(() => {
                console.log('⚠️ Auth init timeout, forcing continue');
                subscription.unsubscribe();
                resolve();
            }, 3000);
        });
    }
}