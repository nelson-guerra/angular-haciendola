import { Injectable } from '@angular/core';
import { IStotage } from './models/storage.interface';

@Injectable({
   providedIn: 'root',
})
export class StorageAdapter implements IStotage {
   save(key: string, value: string) {
      sessionStorage.setItem(key, value);
   }

   get(key: string): string | null {
      return sessionStorage.getItem(key);
   }

   remove(key: string) {
      sessionStorage.removeItem(key);
   }

   clear() {
      sessionStorage.clear();
   }
}
