
declare const Pusher: any;
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PusherService {

  pusher: any;
  channel: any;
  channelprice: any;
  testchannel: any;

  constructor() {
    this.pusher = new Pusher('f588fdb1405ed9563e5c', {
      cluster: 'ap2',
      encrypted: true
    });
    this.channel = this.pusher.subscribe('my-channel');
  }
}
