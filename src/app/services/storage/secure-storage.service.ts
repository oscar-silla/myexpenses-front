import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class SecureStorageService {
  constructor() {}

  async setItem(key: string, value: string) {
    await Preferences.set({ key, value });
  }

  async getItem(key: string) {
    const { value } = await Preferences.get({ key });
    return value;
  }

  async removeItem(key: string) {
    await Preferences.remove({ key });
  }

  async clear() {
    await Preferences.clear();
  }
}
