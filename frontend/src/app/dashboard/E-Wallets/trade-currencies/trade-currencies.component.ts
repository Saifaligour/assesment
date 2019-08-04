import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';
import { TradeCryptoComponent } from '../trade-crypto/trade-crypto.component';

@Component({
  selector: 'app-trade-currencies',
  templateUrl: './trade-currencies.component.html',
  styleUrls: ['./trade-currencies.component.css']
})
export class TradeCurrenciesComponent implements OnInit {


  tradeCryptoDialog: MatDialogRef<TradeCryptoComponent>;

  dialogConfig = new MatDialogConfig();

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }


    // opening model for trade BTC
    tradeBitcoin() {
      this.tradeCryptoDialog = this.dialog.open(TradeCryptoComponent, {
        height: 'auto',
        width: '450px',
        data: this.dialogConfig.data = {
          tradeBitcoin: true
        }
      });
    }




      // opening model for trade ETC
  tradeEthereum() {
    this.tradeCryptoDialog = this.dialog.open(TradeCryptoComponent, {
      height: 'auto',
      width: '450px',
      data: this.dialogConfig.data = {
        tradeEthereum: true
      }
    });
  }




  // opening model for trade Tether
  tradeTether() {
    this.tradeCryptoDialog = this.dialog.open(TradeCryptoComponent, {
      height: 'auto',
      width: '450px',
      data: this.dialogConfig.data = {
        tradeTether: true
      }
    });
  }


    // opening model for trade Litecoin
    tradeLitecoin() {
      this.tradeCryptoDialog = this.dialog.open(TradeCryptoComponent, {
        height: 'auto',
        width: '450px',
        data: this.dialogConfig.data = {
          tradeLitecoin: true
        }
      });
    }
}
