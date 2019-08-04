import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { RippleService } from 'src/app/services/ripple.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StellarService } from 'src/app/services/stellar.service';
import { MoneroService } from 'src/app/services/monero.service';
import { BitCoinCashService } from 'src/app/services/bit-coin-cash.service';
import { EthereumService } from 'src/app/services/ethereum.service';
import { LiteCoinService } from 'src/app/services/lite-coin.service';
import { BitcoinService } from 'src/app/services/bitcoin.service';
import { TetherService } from 'src/app/services/tether.service';

@Component({
  selector: 'app-send-crypto',
  templateUrl: './send-crypto.component.html',
  styleUrls: ['./send-crypto.component.css']
})
export class SendCryptoComponent implements OnInit {


  // for how much cost with fee
  btcWithFee = 0;
  ethWithFee = 0;
  usdtWithFee = 0;
  ltcWithFee = 0;
  xmrWithFee = 0;
  bchWithFee = 0;
  rippleWithFee = 0;
  stellarWithFee = 0;



  // crypto transaction fee
  btcFee = 0;
  ethFee = 0;
  usdtFee = 0;
  ltcFee = 0;
  xmrFee = 0.00001;
  bchFee = 0;
  rippleFee = 0;
  stellarFee = 0.00001;


  // for displaying user crypto balance
  btcBalance = 0;
  ethBalance = 0;
  usdtBalance = 0;
  ltcBalance = 0;
  xmrBalance = 0;
  bchBalance = 0;
  rippleBalance = 0;
  stellarBalance = 0;


  // for user balance in eurro
  userBTCInEuro = 0;
  userETHInEuro = 0;
  userTetherInEuro = 0;
  userLiteCoinInEuro = 0;
  userMoneroInEuro = 0;
  userBCHInEuro = 0;
  userRipleInEuro = 0;
  userStellarInEuro = 0;


  // for displaying user currenices input to convert them into the euro
  btcToEuro = 0.0;
  ethToEuro = 0.0;
  usdtToEuro = 0.0;
  ltcToEuro = 0.0;
  xmrToEuro = 0.0;
  bchToEuro = 0.0;
  rippleToEuro = 0.0;
  stellarToEuro = 0.0;


  // for opening dialog for specefic currency when send button click from e-wallets-crypto component
  sendBitcoin = false;
  sendEthereum = false;
  sendTether = false;
  sendLitecoin = false;
  sendMonero = false;
  sendBitCash = false;
  sendRipple = false;
  sendStellar = false;


  // currencies current rate in euro
  bitCoinCurrentRate = 0;
  ethCurrentRate = 0;
  tetherCurrentRate = 0;
  ltcCurrentRate = 0;
  moneroCurrentRate = 0;
  bchCurrentRate = 0;
  rippleCurrentRate = 0;
  stallerCurrentRate = 0;





  hiddenField = true;
  disableButton = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private btcService: BitcoinService,
    private ethService: EthereumService,
    private ltcService: LiteCoinService,
    private bchService: BitCoinCashService,
    private xmrService: MoneroService,
    private xrpService: RippleService,
    private xlmService: StellarService,
    private usdtService: TetherService,
    private snackBar: MatSnackBar,
    private sendDailogRef: MatDialogRef<SendCryptoComponent>,
  ) {
    if (data) {



      // checking which currencies user want to send
      this.sendBitcoin = data.sendBitcoin;
      this.sendEthereum = data.sendEthereum;
      this.sendTether = data.sendTether;
      this.sendLitecoin = data.sendLiteCoin;
      this.sendMonero = data.sendMonero;
      this.sendBitCash = data.sendBitcoinCash;
      this.sendRipple = data.sendRipple;
      this.sendStellar = data.sendStellar;


      // getting the user balance of every currencies
      this.btcBalance = data.balance;
      this.ethBalance = data.balance;
      this.usdtBalance = data.balance;
      this.ltcBalance = data.balance;
      this.xmrBalance = data.balance;
      this.bchBalance = data.balance;
      this.rippleBalance = data.balance;
      this.stellarBalance = data.balance;

      // converting user balance into euro
      this.userBTCInEuro = data.balanceInEuro;
      this.userETHInEuro = data.balanceInEuro;
      this.userTetherInEuro = data.balanceInEuro;
      this.userLiteCoinInEuro = data.balanceInEuro;
      this.userMoneroInEuro = data.balanceInEuro;
      this.userBCHInEuro = data.balanceInEuro;
      this.userRipleInEuro = data.balanceInEuro;
      this.userStellarInEuro = data.balanceInEuro;


      // getting current value of currencies in euro
      this.bitCoinCurrentRate = data.currentRate;
      this.ethCurrentRate = data.currentRate;
      this.tetherCurrentRate = data.currentRate;
      this.ltcCurrentRate = data.currentRate;
      this.moneroCurrentRate = data.currentRate;
      this.bchCurrentRate = data.currentRate;
      this.rippleCurrentRate = data.currentRate;
      this.stallerCurrentRate = data.currentRate;
    }
  }

  // send bitcoin form
  sendBTCForm = new FormGroup({
    receiverAddress: new FormControl('', [Validators.required]),
    bitcoin: new FormControl('', [Validators.required, Validators.pattern('^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$')]),
    btcToEuro: new FormControl(''),
    btcWithFee: new FormControl('', [Validators.required])
  });




  // send ethereum form
  sendETHForm = new FormGroup({
    receiverAddress: new FormControl('', [Validators.required]),
    ethereum: new FormControl('', [Validators.required, Validators.pattern('^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$')]),
    ethToEuro: new FormControl(''),
    ethWithFee: new FormControl('', [Validators.required])
  });




  // send tether form
  sendUSDTForm = new FormGroup({
    receiverAddress: new FormControl('', [Validators.required]),
    tether: new FormControl('', [Validators.required, Validators.pattern('^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$')]),
    usdtToEuro: new FormControl(''),
    usdtWithFee: new FormControl('', [Validators.required])
  });




  // send litecoin form
  sendLTCForm = new FormGroup({
    receiverAddress: new FormControl('', [Validators.required]),
    litecoin: new FormControl('', [Validators.required, Validators.pattern('^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$')]),
    ltcToEuro: new FormControl(''),
    ltcWithFee: new FormControl('', [Validators.required])
  });




  // send monero form
  sendXMRForm = new FormGroup({
    receiverAddress: new FormControl('', [Validators.required]),
    monero: new FormControl('', [Validators.required, Validators.pattern('^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$')]),
    xmrToEuro: new FormControl(''),
    xmrWithFee: new FormControl('', [Validators.required])
  });




  // send BCH Form
  sendBCHForm = new FormGroup({
    receiverAddress: new FormControl('', [Validators.required]),
    bitCoinCash: new FormControl('', [Validators.required, Validators.pattern('^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$')]),
    bchToEuro: new FormControl(''),
    bchWithFee: new FormControl('', [Validators.required])
  });





  // send XRP form
  sendXRPForm = new FormGroup({
    receiverAddress: new FormControl('', [Validators.required]),
    ripples: new FormControl('', [Validators.required, Validators.pattern('^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$')]),
    xrpToEuro: new FormControl(''),
    rippleWithFee: new FormControl('', [Validators.required])
  });





  // send XLM Form
  sendStellarForm = new FormGroup({
    receiverAddress: new FormControl('', [Validators.required]),
    stellar: new FormControl('', [Validators.required]),
    xlmToEuro: new FormControl(''),
    stellarWithFee: new FormControl('', [Validators.required])
  });




  ngOnInit() {

    // bit coin transaction fee
    if (this.sendBitcoin) {
      this.btcService.btcTnxFee().subscribe((fee) => {
        if (fee) {
          this.btcFee = fee[0].bitCoinFee.feerate;
        }
      }, error => {
        this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      });
    }

    // bit ethereum transaction fee
    if (this.sendEthereum) {
    }

    // tether transaction fee
    if (this.sendTether) {
      this.usdtService.tetherFee().subscribe((fee) => {
        if (fee) {
          this.usdtFee = fee[0].tetherFee;
        }
      }, error => {
        this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      });
    }


    // litecoin transaction fee
    if (this.sendLitecoin) {
      this.ltcService.liteCoinNetworkFee().subscribe((fee) => {
        if (fee) {
          this.ltcFee = fee[0].liteCoinFee.feerate;
        }
      }, error => {
        this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      });
    }


    // monero transaction fee
    if (this.sendMonero) {
    }


    // bit coin cash transaction fee
    if (this.sendBitCash) {
      this.bchService.bchTnxFees().subscribe((fee) => {
        if (fee) {
          this.bchFee = fee[0].bitCoinCashFee;
        }
      }, error => {
        this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      });
    }


    // ripple transaction fee
    if (this.sendRipple) {
      this.xrpService.rippleFee().subscribe(fee => {
        if (fee) {
          this.rippleFee = fee[0].rippleFee;
        }
      }, error => {
        this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      });
    }

    // stellar transaction fee
    if (this.sendStellar) {
      this.xlmService.stellarTransFee().subscribe((fee) => {
        if (fee) {
          this.stellarFee = fee[0].stellarFee;
        }
      }, error => {
        this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      });
    }
  }


  // converting value of bitcoin in to euro
  convertBTC(value: number) {
    if (value[0] === '.') {
      const newValue = `0${value}`;
      this.sendBTCForm.patchValue({ bitcoin: newValue });
    }
    this.btcToEuro = value * this.bitCoinCurrentRate;
    this.btcWithFee = Number(value) + (Number(value) * Number(this.btcFee));
  }

  // converting value of ethereum in to euro
  convertETH(value: number) {
    if (value[0] === '.') {
      const newValue = `0${value}`;
      this.sendETHForm.patchValue({ ethereum: newValue });
    }
    this.ethToEuro = value * this.ethCurrentRate;
    this.ethWithFee = Number(value) + (Number(value) * Number(this.ethFee));
  }

  // converting value of tether in to euro
  convertUSDT(value: number) {
    if (value[0] === '.') {
      const newValue = `0${value}`;
      this.sendUSDTForm.patchValue({ tether: newValue });
    }
    this.usdtToEuro = value * this.tetherCurrentRate;
    this.usdtWithFee = Number(value) + (Number(value) * Number(this.usdtFee));
  }

  // converting value of litecoin in to euro
  convertLTC(value: number) {
    if (value[0] === '.') {
      const newValue = `0${value}`;
      this.sendLTCForm.patchValue({ litecoin: newValue });
    }
    this.ltcToEuro = value * this.ltcCurrentRate;
    this.ltcWithFee = Number(value) + (Number(value) * Number(this.ltcFee));
  }

  // converting value of monero in to euro
  convertXMR(value: number) {
    if (value[0] === '.') {
      const newValue = `0${value}`;
      this.sendXMRForm.patchValue({ monero: newValue });
    }
    this.xmrToEuro = value * this.moneroCurrentRate;
    this.xmrWithFee = Number(value) + (Number(value) * Number(this.xmrFee));
  }

  // converting value of monero in to euro
  convertBCH(value: number) {
    if (value[0] === '.') {
      const newValue = `0${value}`;
      this.sendBCHForm.patchValue({ bitCoinCash: newValue });
    }
    this.bchToEuro = value * this.bchCurrentRate;
    this.bchWithFee = Number(value) + (Number(value) * Number(this.bchFee));
  }

  // converting value of ripples in to euro
  convertXRP(value: number) {
    if (value[0] === '.') {
      const newValue = `0${value}`;
      this.sendXRPForm.patchValue({ ripples: newValue });
    }
    this.rippleToEuro = value * this.rippleCurrentRate;
    this.rippleWithFee = Number(value) + (Number(value) * Number(this.rippleFee));
  }

  // converting value of stellar in to euro
  convertXLM(value: number) {
    if (value[0] === '.') {
      const newValue = `0${value}`;
      this.sendStellarForm.patchValue({ stellar: newValue });
    }
    this.stellarToEuro = value * this.stallerCurrentRate;
    this.stellarWithFee = Number(value) + (Number(value) * Number(this.stellarFee));
  }


  // getting controls of send bitcoin form validation
  get bitCoinControl() { return this.sendBTCForm.controls; }



  // getting controls of send ethereum form validation
  get ethereumControl() { return this.sendETHForm.controls; }



  // getting controls of send tether form validation
  get tetherControl() { return this.sendUSDTForm.controls; }



  // getting controls of send litecoin form validation
  get litecoinControl() { return this.sendLTCForm.controls; }



  // getting controls of send monero form validation
  get moneroControl() { return this.sendXMRForm.controls; }



  // getting controls of send bit coin cash form validation
  get bitCashControl() { return this.sendBCHForm.controls; }




  // getting controls of send ripples form validation
  get ripplesControl() { return this.sendXRPForm.controls; }



  // getting controls of send stellar form validation
  get stellarsControl() { return this.sendStellarForm.controls; }



  // sending bit coin to antoher user
  sendBTC() {
    this.disableButton = true;
    if (this.sendBTCForm.invalid) {
      return false;
    } else {
      this.btcService.sendBitCoin(this.sendBTCForm.value).subscribe((result) => {
        if (result.success === false) {
          this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
          this.disableButton = false;
        }
        if (result.success === true) {
          this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
          this.sendBTCForm.controls.bitcoin.reset();
          this.sendBTCForm.controls.btcToEuro.reset();
          this.disableButton = false;
        }
      }, error => {
        this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
        this.disableButton = false;
      });
    }
  }




  // sending ETH to another user
  sendETH() {
    this.disableButton = true;
    if (this.sendETHForm.invalid) {
      return false;
    } else {
      this.ethService.sendETHToOther(this.sendETHForm.value).subscribe((result) => {
        if (result.success === false) {
          this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
          this.disableButton = false;
        }
        if (result.success === true) {
          this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
          this.sendETHForm.controls.ethereum.reset();
          this.sendETHForm.controls.ethToEuro.reset();
          this.disableButton = false;
        }
      }, error => {
        this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
        this.disableButton = false;
      });
    }
  }




  // sending tether to anotther user
  sendUSDT() {
    this.disableButton = true;
    if (this.sendUSDTForm.invalid) {
      return false;
    } else {
      this.usdtService.sendTetherToOther(this.sendUSDTForm.value).subscribe((result) => {
        if (result.success === false) {
          this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
          this.disableButton = false;
        }
        if (result.success === true) {
          this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
          this.sendUSDTForm.controls.tether.reset();
          this.sendUSDTForm.controls.usdtToEuro.reset();
          this.disableButton = false;
        }
      }, error => {
        this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
        this.disableButton = false;
      });
    }
  }



  // sending lite coin to another user
  sendLTC() {
    this.disableButton = true;
    if (this.sendLTCForm.invalid) {
      return false;
    } else {
      this.ltcService.sendLiteCoin(this.sendLTCForm.value).subscribe((result) => {
        if (result.success === false) {
          this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
          this.disableButton = false;
        }
        if (result.success === true) {
          this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
          this.sendLTCForm.controls.litecoin.reset();
          this.sendLTCForm.controls.ltcToEuro.reset();
          this.disableButton = false;
        }
      }, error => {
        this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
        this.disableButton = false;
      });
    }
  }



  // sending monero to another user
  sendXMR() {
    this.disableButton = true;
    if (this.sendXMRForm.invalid) {
      return false;
    } else {
      this.xmrService.sendMonero(this.sendXMRForm.value).subscribe((result) => {
        if (result.success === false) {
          this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
          this.disableButton = false;
        }
        if (result.success === true) {
          this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
          this.sendXMRForm.controls.monero.reset();
          this.sendXMRForm.controls.xmrToEuro.reset();
          this.disableButton = false;
        }
      }, error => {
        this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
        this.disableButton = false;
      });
    }
  }



  // sending bit coin cash to another user
  sendBCH() {
    this.disableButton = true;
    if (this.sendBCHForm.invalid) {
      return false;
    } else {
      this.bchService.sendBitcoincash(this.sendBCHForm.value).subscribe((result) => {
        if (result.success === false) {
          this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
          this.disableButton = false;
        }
        if (result.success === true) {
          this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
          this.sendBCHForm.controls.bitCoinCash.reset();
          this.sendBCHForm.controls.bchToEuro.reset();
          this.disableButton = false;
        }
      }, error => {
        this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
        this.disableButton = false;
      });
    }
  }




  // sending ripples to another user
  sendXRP() {
    this.disableButton = true;
    if (this.sendXRPForm.invalid) {
      return false;
    } else {
      this.xrpService.sendRipple(this.sendXRPForm.value).subscribe((result) => {
        if (result.success === false) {
          this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
          this.disableButton = false;
        }
        if (result.success === true) {
          this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
          this.sendXRPForm.controls.ripples.reset();
          this.sendXRPForm.controls.xrpToEuro.reset();
          this.disableButton = false;
        }
      }, error => {
        this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
        this.disableButton = false;
      });
    }
  }



  // sending stellar to anpother user
  sendStellarToOther() {
    this.disableButton = true;
    if (this.sendStellarForm.invalid) {
      return false;
    } else {
      this.xlmService.sendStellar(this.sendStellarForm.value).subscribe((result) => {
        if (result.success === false) {
          this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
          this.disableButton = false;
        }
        if (result.success === true) {
          this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
          this.sendStellarForm.controls.stellar.reset();
          this.sendStellarForm.controls.xlmToEuro.reset();
          this.disableButton = false;
        }
      }, error => {
        this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
        this.disableButton = false;
      });
    }
  }


  // closing the sending crypto dialog
  closeDilaog() {
    this.sendDailogRef.close();
  }
}
