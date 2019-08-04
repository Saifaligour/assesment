import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-trade-crypto',
  templateUrl: './trade-crypto.component.html',
  styleUrls: ['./trade-crypto.component.css']
})
export class TradeCryptoComponent implements OnInit {


  tradeBTC = false;
  tradeETH = false;
  tradeTether = false;
  tradeLTC = false;
  tradeMonero = false;
  tradeBCH = false;
  tradeRipple = false;
  tradeStellar = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sendDailogRef: MatDialogRef<TradeCryptoComponent>,
  ) {
    if (data) {
      this.tradeBTC = data.tradeBitcoin;
    }
    if (data) {
      this.tradeETH = data.tradeEthereum;
    }
    if (data) {
      this.tradeTether = data.tradeTether;
    }
    if (data) {
      this.tradeLTC = data.tradeLitecoin;
    }
    if (data) {
      this.tradeMonero = data.tradeMonero;
    }
    if (data) {
      this.tradeBCH = data.tradeBitcoinCash;
    }
    if (data) {
      this.tradeRipple = data.tradeRipple;
    }
    if (data) {
      this.tradeStellar = data.tradeStellar;
    }
  }

  ngOnInit() {
  }

   // closing the sending crypto dialog
   closeDilaog() {
    this.sendDailogRef.close();
  }
}
