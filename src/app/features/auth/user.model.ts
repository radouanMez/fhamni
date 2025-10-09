export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date,
    public userName?: string,
    public fullName?: string,
    public phone?: string | null  // 🔥 تغيير من phone_number إلى phone لتكون متسقة
  ) { }

  get tokenExpirationDate(): Date {
    return this._tokenExpirationDate;
  }

  get token(): string | null {
    // 🔥 تحسين التحقق من التاريخ
    if (!this._tokenExpirationDate) {
      return null;
    }

    const now = new Date();
    if (now > this._tokenExpirationDate) {
      return null;
    }

    return this._token;
  }

  isTokenValid(): boolean {
    return !!this.token;
  }

  getTimeUntilExpiration(): number {
    if (!this._tokenExpirationDate) {
      return 0;
    }
    return Math.max(0, this._tokenExpirationDate.getTime() - new Date().getTime());
  }

  // 🔥 إضافة دالة للتجديد (إذا احتجتها لاحقاً)
  updateToken(newToken: string, newExpirationDate: Date): void {
    this._token = newToken;
    this._tokenExpirationDate = newExpirationDate;
  }

  // 🔥 إضافة دالة لتحويل الكائن إلى JSON (اختياري)
  toJSON(): any {
    return {
      email: this.email,
      id: this.id,
      _token: this._token,
      _tokenExpirationDate: this._tokenExpirationDate.toISOString(),
      userName: this.userName,
      fullName: this.fullName,
      phone: this.phone
    };
  }
}