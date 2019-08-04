import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { routerTransitionRight, shakeAnimate } from 'src/app/app.animation';

@Component({
  selector: 'app-receiver-crypto',
  templateUrl: './receiver-crypto.component.html',
  styleUrls: ['./receiver-crypto.component.css'],
  animations: [
    routerTransitionRight,
    shakeAnimate
  ]
})
export class ReceiverCryptoComponent implements OnInit {


  receiveBTC = false;
  receiveETH = false;
  receiveTether = false;
  receiveLTC = false;
  receiveMonero = false;
  receiveBCH = false;
  receiveRipple = false;
  receiveStellar = false;

  receiverAddress: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private receiveDailogRef: MatDialogRef<ReceiverCryptoComponent>,
    private snackBar: MatSnackBar
  ) {
    if (data) {
      // receive crypto
      this.receiveBTC = data.recevieBitcoin;
      this.receiveETH = data.recevieEthereum;
      this.receiveTether = data.receiveTether;
      this.receiveLTC = data.receiveLiteCoin;
      this.receiveMonero = data.receiveMonero;
      this.receiveBCH = data.receiveBitcoinCash;
      this.receiveRipple = data.receiveRipple;
      this.receiveStellar = data.recevieStellar;
    }
    if (this.receiveBTC) {
      this.receiverAddress = data.receiverAddress;
    }
    if (this.receiveETH) {
      this.receiverAddress = data.receiverAddress;
    }
    if (this.receiveTether) {
      this.receiverAddress = data.receiverAddress;
    }
    if (this.receiveLTC) {
      this.receiverAddress = data.receiverAddress;
    }
    if (this.receiveMonero) {
      this.receiverAddress = data.receiverAddress;
    }
    if (this.receiveBCH) {
      this.receiverAddress = data.receiverAddress;
    }
    if (this.receiveRipple) {
      this.receiverAddress = data.receiverAddress;
    }
    if (this.receiveStellar) {
      this.receiverAddress = data.receiverAddress;
    }
  }

  ngOnInit() {
  }

  copyAddress(address: any) {
    const el = document.createElement('textarea');
    el.value = address;
    el.setAttribute('readonly', '');
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.snackBar.open
      ('Your address copied successfully!', 'X', { duration: 3000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
  }

  printAddress() {
    window.print();
  }

  shareOnGmail() {
    let mailSubject = '';
    let url = '';
    if (this.receiveBTC) {
      mailSubject = 'My Bitcoin Address';
    }
    if (this.receiveETH) {
      mailSubject = 'My Ethereum Address';
    }
    if (this.receiveTether) {
      mailSubject = 'My Tether Address';
    }
    if (this.receiveLTC) {
      mailSubject = 'My Litecoin Address';
    }
    if (this.receiveMonero) {
      mailSubject = 'My Monero Address';
    }
    if (this.receiveBCH) {
      mailSubject = 'My Bitcoin Cash Address';
    }
    if (this.receiveRipple) {
      mailSubject = 'My Ripple Address';
    }
    if (this.receiveStellar) {
      mailSubject = 'My Stellar Address';
    }
    url = `https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&su=${mailSubject}&body=${this.receiverAddress}`;
    window.open(url, '_blank');
  }

  connectToExplorer(address: any) {
    let url = '';
    if (this.receiveBTC) {
      url = `https://www.blockchain.com/btc/address/${address}`;
    }
    if (this.receiveETH) {
      url = `https://etherscan.io/address/${address}`;
    }
    if (this.receiveTether) {
      url = `https://omniexplorer.info/address/${address}`;
    }
    if (this.receiveLTC) {
      url = `https://chain.so/address/LTC/${address}`;
    }
    if (this.receiveMonero) {
      url = `https://monerohash.com/explorer/search?value=${address}`;
    }
    if (this.receiveBCH) {
      url = `https://explorer.bitcoin.com/bch/address/${address}`;
    }
    if (this.receiveRipple) {
      url = `https://bithomp.com/explorer/${address}`;
    }
    if (this.receiveStellar) {
      url = `${address}`;
    }
    window.open(url, '_blank');
  }
  closeDilaog() {
    this.receiveDailogRef.close();
  }

}
