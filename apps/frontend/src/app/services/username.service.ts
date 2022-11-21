import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsernameService {
  prefixUserName(type) {
    const prefixName = 'SK_' + type + '_' + this.makeid(3);
    return prefixName;
  }

  makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
