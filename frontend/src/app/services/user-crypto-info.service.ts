import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCryptoInfoService {

  constructor(
    private apiService: ApiService
  ) { }

  public userCoinAddress(): Observable<any> {
    return this.apiService.externalrequest('get', 'cryptoAddress');
  }
}
