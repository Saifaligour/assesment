import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatTableDataSource,
  MatSort,
  MatSnackBar,
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
  PageEvent
} from '@angular/material';
import { ReferralSystem } from 'src/app/_interface/referralUser.interface.';
import { SendCryptoComponent } from '../send-crypto/send-crypto.component';
import { BitcoinService } from 'src/app/services/bitcoin.service';
import { EthereumService } from 'src/app/services/ethereum.service';
import { TetherService } from 'src/app/services/tether.service';
import { LiteCoinService } from 'src/app/services/lite-coin.service';
import { MoneroService } from 'src/app/services/monero.service';
import { BitCoinCashService } from 'src/app/services/bit-coin-cash.service';
import { RippleService } from 'src/app/services/ripple.service';
import { StellarService } from 'src/app/services/stellar.service';
import { ApiService } from 'src/app/services/api.service';
import { ReceiverCryptoComponent } from '../receiver-crypto/receiver-crypto.component';
import { UserCryptoInfoService } from 'src/app/services/user-crypto-info.service';
import { routerTransitionRight, slideToLeft, shakeAnimate } from 'src/app/app.animation';
import { UserTransaction } from 'src/app/_interface/transaction.interface';
import { HttpClient } from '@angular/common/http';
import { TradeCryptoComponent } from '../trade-crypto/trade-crypto.component';


const ELEMENT_DATA: ReferralSystem[] = [
  { dateTime: '01/10/2019', name: 'Shubham Tyagi', email: 'shtyagi@lapits.com', status: 'Pending', statusPaidOut: 'Send' }

];

@Component({
  selector: 'app-e-wallet-crypto',
  templateUrl: './e-wallet-crypto.component.html',
  styleUrls: ['./e-wallet-crypto.component.css'],
  animations: [
    routerTransitionRight,
    slideToLeft,
    shakeAnimate
  ]
})



export class EWalletCryptoComponent implements OnInit {

  displayedColumns: string[] = ['currencyType', 'receiverAddress', 'amount', 'timestamp', 'trnxFee', 'hash', 'action'];

  bitCoinDataSource = new MatTableDataSource<UserTransaction>();
  ethereumDataSource = new MatTableDataSource<UserTransaction>();
  tetherDataSource = new MatTableDataSource<UserTransaction>();
  litecoinDataSource = new MatTableDataSource<UserTransaction>();
  moneroDataSource = new MatTableDataSource<UserTransaction>();
  bitcashDataSource = new MatTableDataSource<UserTransaction>();
  rippleDataSource = new MatTableDataSource<UserTransaction>();
  stellarDataSource = new MatTableDataSource<UserTransaction>();


  // default wallet status of currencies
  btcWalletStatus = false;
  ethWalletStatus = false;
  rippleWalletStatus = false;
  stellerWalletStatus = false;
  moneroWalletStatus = false;
  tetherWalletStatus = false;
  liteCoinWalletStatus = false;
  bchWalletStatus = false;

  options: object;

  sendCryptoDialog: MatDialogRef<SendCryptoComponent>;
  receiveCryptoDialog: MatDialogRef<ReceiverCryptoComponent>;

  dialogConfig = new MatDialogConfig();

  // exchange parcentage of crypto
  exchangeRateBitCoin = 0;
  exchangeRateEth = 0;
  exchangeRateTether = 0;
  exchangeRateLiteCoin = 0;
  exchangeRateMonero = 0;
  exchangeRateBitCash = 0;
  exchangeRateRipple = 0;
  exchangeRateStaller = 0;


  // current exchange rate
  bitCoinCurrentRate = 0;
  ethCurrentRate = 0;
  tetherCurrentRate = 0;
  ltcCurrentRate = 0;
  moneroCurrentRate = 0;
  bchCurrentRate = 0;
  rippleCurrentRate = 0;
  stellarCurrentRate = 0;


  // balance in crypto
  bitCoinBalance = 0;
  ethereumBalance = 0;
  tetherBalance = 0;
  liteCoinBalance = 0;
  moneroBalace = 0;
  bitcashBalance = 0;
  rippleBalance = 0;
  stellarBalance = 0;


  // user balance in euro
  btcToEuro = 0;
  ethToEuro = 0;
  tetherToEuro = 0;
  ltcToEuro = 0;
  bitcashToEuro = 0;
  moneroToEuro = 0;
  rippleToEuro = 0;
  stellarToEuro = 0;


  // user currencies receiver address
  userBTCAddress: any;
  userETHAddress: any;
  userUSDTAddress: any;
  userLTCAddress: any;
  userXMRAddress: any;
  userBCHAddress: any;
  userXRPAddress: any;
  userXLMAddress: any;


  search = undefined;

  limitBitcoin = 5;
  limitEtherum = 5;
  limitTether = 5;
  limitLitecoin = 5;
  limitMonero = 5;
  limitBitcash = 5;
  limitRipple = 5;
  limitStellar = 5;

  pageIndex = 0;
  pageLimit = [5, 10, 15];


  totalLengthBitcoin = 0;
  totalLengthEthereum = 0;
  totalLengthTether = 0;
  totalLengthLitecoin = 0;
  totalLengthMonero = 0;
  totalLengthBitCash = 0;
  totalLengthRipple = 0;
  totalLengthStellar = 0;




  constructor(
    private btcService: BitcoinService,
    private ethService: EthereumService,
    private usdtService: TetherService,
    private ltcService: LiteCoinService,
    private xmrService: MoneroService,
    private bchService: BitCoinCashService,
    private xrpService: RippleService,
    private xlmService: StellarService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private apiService: ApiService,
    private userAddress: UserCryptoInfoService,
  ) {
  }


  ngOnInit() {
    // user etherum Balance and converting it to euro
    this.btcService.userBitCoinBalance().subscribe((balance) => {
      if (balance) {
        this.bitCoinBalance = balance.balance;
        this.btcToEuro = this.bitCoinBalance * this.bitCoinCurrentRate;
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });



    // user etherum Balance and converting it to euro
    this.ethService.ethBalance().subscribe((balance) => {
      if (balance) {
        this.ethereumBalance = balance.balance;
        this.ethToEuro = this.ethereumBalance * this.ethCurrentRate;
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });



    // user tehter balance
    this.usdtService.userTetherBalance().subscribe((balance) => {
      this.tetherBalance = balance.balance;
      this.tetherToEuro = this.tetherBalance * this.tetherCurrentRate;
    });




    // user lite coin balance
    this.ltcService.userLTCBalance().subscribe((balance) => {
      if (balance) {
        this.liteCoinBalance = balance.balance;
        this.ltcToEuro = this.liteCoinBalance * this.ltcCurrentRate;
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });



    // user monero balance and converting it to euro
    this.xmrService.userMoneroBalance().subscribe((balance) => {
      if (balance) {
        this.moneroBalace = balance.balance;
        this.moneroToEuro = this.moneroBalace * this.moneroCurrentRate;
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });



    // user bit cash balance and converting it to euro
    this.bchService.userBitCashBalance().subscribe((balance) => {
      if (balance) {
        this.bitcashBalance = balance.balance;
        this.bitcashToEuro = this.bitcashBalance * this.bchCurrentRate;
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });



    // user ripple balance and converting it to euro
    this.xrpService.userXRPBalance().subscribe((balance) => {
      if (balance) {
        this.rippleBalance = balance.balance;
        this.rippleToEuro = this.rippleBalance * this.rippleCurrentRate;
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });



    // user stellar balance and converting it to euro
    this.xlmService.stellarBalance().subscribe((balance) => {
      if (balance) {
        this.stellarBalance = balance.balance;
        this.stellarToEuro = this.stellarBalance * this.stellarCurrentRate;
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });



    this.userAddress.userCoinAddress().subscribe((address) => {
      if (address) {
        this.userBTCAddress = address.btcAddress;
        this.userETHAddress = address.ethAddress;
        this.userUSDTAddress = address.omniusdtAddress;
        this.userLTCAddress = address.litecoinAddress;
        this.userXMRAddress = address.moneroAddress;
        this.userBCHAddress = address.bitcoincashAddress;
        this.userXRPAddress = address.rippleAddress;
        this.userXLMAddress = address.stellarAddress;
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });

    this.apiService.exchangeRate().subscribe((exgRate) => {
      if (exgRate) {
        for (const i in exgRate.data) {
          if (exgRate.data[i].name === 'Bitcoin') {
            this.exchangeRateBitCoin = exgRate.data[i].quotes.EUR.percent_change_1h;
            this.bitCoinCurrentRate = exgRate.data[i].quotes.EUR.price;
          } else if (exgRate.data[i].name === 'Ethereum') {
            this.exchangeRateEth = exgRate.data[i].quotes.EUR.percent_change_1h;
            this.ethCurrentRate = exgRate.data[i].quotes.EUR.price;
          } else if (exgRate.data[i].name === 'Tether') {
            this.exchangeRateTether = exgRate.data[i].quotes.EUR.percent_change_1h;
            this.tetherCurrentRate = exgRate.data[i].quotes.EUR.price;
          } else if (exgRate.data[i].name === 'Litecoin') {
            this.exchangeRateLiteCoin = exgRate.data[i].quotes.EUR.percent_change_1h;
            this.ltcCurrentRate = exgRate.data[i].quotes.EUR.price;
          } else if (exgRate.data[i].name === 'Monero') {
            this.exchangeRateMonero = exgRate.data[i].quotes.EUR.percent_change_1h;
            this.moneroCurrentRate = exgRate.data[i].quotes.EUR.price;
          } else if (exgRate.data[i].name === 'Bitcoin Cash') {
            this.exchangeRateBitCash = exgRate.data[i].quotes.EUR.percent_change_1h;
            this.bchCurrentRate = exgRate.data[i].quotes.EUR.price;
          } else if (exgRate.data[i].name === 'XRP') {
            this.exchangeRateRipple = exgRate.data[i].quotes.EUR.percent_change_1h;
            this.rippleCurrentRate = exgRate.data[i].quotes.EUR.price;
          } else if (exgRate.data[i].name === 'Stellar') {
            this.exchangeRateStaller = exgRate.data[i].quotes.EUR.percent_change_1h;
            this.stellarCurrentRate = exgRate.data[i].quotes.EUR.price;
          }
        }
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });

    this.options = {
      credits: {
        enabled: false
      },
      xAxis: {
        labels: {
          enabled: false
        },
        visible: false,

      },

      yAxis: {
        gridLineColor: 'transparent',
        title: {
          text: null
        },
        labels: {
          enabled: false
        }
      },
      chart: {
        type: 'spline',
        backgroundColor: 'transparent',
        scrollablePlotArea: {
          maxWidth: 200,
          scrollPositionX: 1
        }
      },
      tooltip: {
        valueSuffix: '',
        split: false
      },
      legend: {
        enabled: false
      },
      title: { text: null },
      plotOptions: {
        spline: {
          lineWidth: 1,
          marker: {
            enabled: false
          },
          pointStart: null
        }
      },
      series: [{
        data: [10.4, 10.7, 11.3, 10.2, 9.6, 10.2, 11.1, 10.8, 13.0, 12.5, 12.5, 11.3,
          10.1],
      }]
    };
  }


  // checking BTC wallet status active or not
  openBTC() {
    this.btcService.btcWalletStatus().subscribe((btc) => {
      if (btc) {
        if (btc.success === true) {
          this.btcWalletStatus = btc.btcWalletStatus;
        }
        if (btc.success === false) {
          this.snackBar.open(btc.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
        }
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });


    // getting BTC transaction
    this.bitcoinTransactions();

  }

  // activate BTC wallet
  activateBTCWallet() {
    this.btcService.activateBTC().subscribe((result) => {
      if (result.success === false) {
        this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      }
      if (result.success === true) {
        this.btcWalletStatus = true;
        this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
      }
      if (result[0]) {
        this.snackBar.open(result[0], 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });
  }




  // checking ETH wallet status active or not
  openEthereum() {
    this.ethService.ethWalletStatus().subscribe((eth) => {
      if (eth) {
        if (eth.success === true) {
          this.ethWalletStatus = eth.ethWalletStatus;
        }
        if (eth.success === false) {
          this.snackBar.open(eth.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
        }
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });


    // fetching eth transaction on opening expanion pannel
    this.ethereumTransaction();
  }

  // activate ETH wallet
  activateETHWallet() {
    this.ethService.activateETH().subscribe((result) => {
      if (result.success === false) {
        this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      }
      if (result.success === true) {
        this.ethWalletStatus = true;
        this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
      }
      if (result[0]) {
        this.snackBar.open(result[0], 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });
  }





  // checking USDT wallet status active or not
  openUSDT() {
    this.usdtService.tetherWalletStatus().subscribe((USDT) => {
      if (USDT) {
        if (USDT.success === true) {
          this.tetherWalletStatus = USDT.tetherWalletStatus;
        }
        if (USDT.success === false) {
          this.snackBar.open(USDT.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
        }
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });


    // fetching user USDT transactions
    this.tetherTransaction();
  }

  // activate tether wallet
  activateTetherWallet() {
    this.usdtService.activateTether().subscribe((result) => {
      if (result.success === false) {
        this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      }
      if (result.success === true) {
        this.tetherWalletStatus = true;
        this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
      }
      if (result[0]) {
        this.snackBar.open(result[0], 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });
  }





  // checking LTC wallet status active or not
  openLiteCoin() {
    this.ltcService.liteCoinWallet().subscribe((ltc) => {
      if (ltc) {
        if (ltc.success === true) {
          this.liteCoinWalletStatus = ltc.liteCoinWalletStatus;
        }
        if (ltc.success === false) {
          this.snackBar.open(ltc.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
        }
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });



    // getting lite coin transaction on opening exapanion pannel
    this.liteCoinTransaction();
  }


  // activate Litecoin wallet
  activateLiteCoinWallet() {
    this.ltcService.activateLiteCoin().subscribe((result) => {
      if (result.success === false) {
        this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      }
      if (result.success === true) {
        this.liteCoinWalletStatus = true;
        this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
      }
      if (result[0]) {
        this.snackBar.open(result[0], 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });
  }






  // checking XMR wallet status active or not
  openMonero() {
    this.xmrService.moneroWallet().subscribe((xmr) => {
      if (xmr) {
        if (xmr.success === true) {
          this.moneroWalletStatus = xmr.moneroWalletStatus;
        }
        if (xmr.success === false) {
          this.snackBar.open(xmr.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
        }
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });


    // getting monero transaction on opening monero expanion pannel
    this.moneroTransaction();
  }

  // activat XMR wallet
  activateMoneroWallet() {
    this.xmrService.activateMonero().subscribe((result) => {
      if (result.success === false) {
        this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      }
      if (result.success === true) {
        this.moneroWalletStatus = true;
        this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
      }
      if (result[0]) {
        this.snackBar.open(result[0], 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });
  }







  // checking BCH wallete status active or not
  openBCH() {
    this.bchService.bchWallet().subscribe((bch) => {
      if (bch) {
        if (bch.success === true) {
          this.bchWalletStatus = bch.bchWalletStatus;
        }
        if (bch.success === false) {
          this.snackBar.open(bch.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
        }
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });

    // getting bch transaction on openning expanion pannel
    this.bitcashTransaction();
  }

  // activate bitcoin cash wallet
  activateBCHWallet() {
    this.bchService.activateBitCoinCash().subscribe((result) => {
      if (result.success === false) {
        this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      }
      if (result.success === true) {
        this.bchWalletStatus = true;
        this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
      }
      if (result[0]) {
        this.snackBar.open(result[0], 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });
  }






  // opening XRP expansion panel
  openXRP() {

    // checking XRP wallet status active or not
    this.xrpService.rippleWalletStatus().subscribe((xrp) => {
      if (xrp) {
        if (xrp.success === true) {
          this.rippleWalletStatus = xrp.rippleWalletStatus;
        }
        if (xrp.success === false) {
          this.snackBar.open(xrp.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
        }
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });


    // getting user ripple transaction on opening the expanion pannel
    this.rippleTransactions();

  }

  // activate XRP wallet
  activateXRPWallet() {
    this.xrpService.activateXRP().subscribe((result) => {
      if (result.success === false) {
        this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      }
      if (result.success === true) {
        this.rippleWalletStatus = true;
        this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
      }
      if (result[0]) {
        this.snackBar.open(result[0], 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });
  }






  // opening stellar expansion panel
  openSteller() {
    // checking XLM wallet status active or not
    this.xlmService.stellerWalletStatus().subscribe((xlm) => {
      if (xlm) {
        if (xlm.success === true) {
          this.stellerWalletStatus = xlm.stellerWalletStatus;
        }
        if (xlm.success === false) {
          this.snackBar.open(xlm.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
        }
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });



    // getting transaction of stellar on openning expanion pannel
    this.stellarTransactions();

  }

  // activate XLM wallet
  activateStellarWallet() {
    this.xlmService.activateStellar().subscribe((result) => {
      if (result.success === false) {
        this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      }
      if (result.success === true) {
        this.stellerWalletStatus = true;
        this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
      }
      if (result[0]) {
        this.snackBar.open(result[0], 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });
  }







  // opening model for sending BTC
  sendBitcoin() {
    this.sendCryptoDialog = this.dialog.open(SendCryptoComponent, {
      height: 'auto',
      width: '450px',
      data: this.dialogConfig.data = {
        sendBitcoin: true,
        balance: this.bitCoinBalance,
        currentRate: this.bitCoinCurrentRate,
        balanceInEuro: this.btcToEuro
      }
    });
  }

  // opning model for receving BTC
  recevieBitcoin() {
    this.receiveCryptoDialog = this.dialog.open(ReceiverCryptoComponent, {
      height: 'auto',
      width: '450px',
      data: this.dialogConfig.data = {
        recevieBitcoin: true,
        receiverAddress: this.userBTCAddress
      }
    });
  }








  // opening model for sending eth
  sendEthereum() {
    this.sendCryptoDialog = this.dialog.open(SendCryptoComponent, {
      height: 'auto',
      width: '450px',
      data: this.dialogConfig.data = {
        sendEthereum: true,
        balance: this.ethereumBalance,
        currentRate: this.ethCurrentRate,
        balanceInEuro: this.ethToEuro
      }
    });
  }

  // opning model for receving eth
  recevieEthereum() {
    this.receiveCryptoDialog = this.dialog.open(ReceiverCryptoComponent, {
      height: 'auto',
      width: '450px',
      data: this.dialogConfig.data = {
        recevieEthereum: true,
        receiverAddress: this.userETHAddress
      }
    });
  }






  // opening model for sending Tether
  sendTether() {
    this.sendCryptoDialog = this.dialog.open(SendCryptoComponent, {
      height: 'auto',
      width: '450px',
      data: this.dialogConfig.data = {
        sendTether: true,
        balance: this.tetherBalance,
        currentRate: this.tetherCurrentRate,
        balanceInEuro: this.tetherToEuro
      }
    });
  }

  // opning model for receving Tether
  recevieTether() {
    this.receiveCryptoDialog = this.dialog.open(ReceiverCryptoComponent, {
      height: 'auto',
      width: '450px',
      data: this.dialogConfig.data = {
        receiveTether: true,
        receiverAddress: this.userUSDTAddress
      }
    });
  }






  // opening model for sending Lite Coin
  sendLiteCoin() {
    this.sendCryptoDialog = this.dialog.open(SendCryptoComponent, {
      height: 'auto',
      width: '450px',
      data: this.dialogConfig.data = {
        sendLiteCoin: true,
        balance: this.liteCoinBalance,
        currentRate: this.ltcCurrentRate,
        balanceInEuro: this.ltcToEuro
      }
    });
  }

  // opning model for receving Lite Coin
  recevieLiteCoin() {
    this.receiveCryptoDialog = this.dialog.open(ReceiverCryptoComponent, {
      height: 'auto',
      width: '450px',
      data: this.dialogConfig.data = {
        receiveLiteCoin: true,
        receiverAddress: this.userLTCAddress
      }
    });
  }







  // opening model for sending XMR
  sendMonero() {
    this.sendCryptoDialog = this.dialog.open(SendCryptoComponent, {
      height: 'auto',
      width: '450px',
      data: this.dialogConfig.data = {
        sendMonero: true,
        currentRate: this.moneroCurrentRate,
        balance: this.moneroBalace,
        balanceInEuro: this.moneroToEuro
      }
    });
  }

  // opning model for receving Monero
  recevieMonero() {
    this.receiveCryptoDialog = this.dialog.open(ReceiverCryptoComponent, {
      height: 'auto',
      width: '450px',
      data: this.dialogConfig.data = {
        receiveMonero: true,
        receiverAddress: this.userXMRAddress
      }
    });
  }
 







  // opening model for sending BCH
  sendBCH() {
    this.sendCryptoDialog = this.dialog.open(SendCryptoComponent, {
      height: 'auto',
      width: '450px',
      data: this.dialogConfig.data = {
        sendBitcoinCash: true,
        currentRate: this.bchCurrentRate,
        balance: this.bitcashBalance,
        balanceInEuro: this.bitcashToEuro
      }
    });
  }

  // opning model for receving BCH
  recevieBCH() {
    this.receiveCryptoDialog = this.dialog.open(ReceiverCryptoComponent, {
      height: 'auto',
      width: '450px',
      data: this.dialogConfig.data = {
        receiveBitcoinCash: true,
        receiverAddress: this.userBCHAddress
      }
    });
  }







  // opening model for sending XRP
  sendRipple() {
    this.sendCryptoDialog = this.dialog.open(SendCryptoComponent, {
      height: 'auto',
      width: '450px',
      data: this.dialogConfig.data = {
        sendRipple: true,
        balance: this.rippleBalance,
        currentRate: this.rippleCurrentRate,
        balanceInEuro: this.rippleToEuro
      }
    });
  }

  // opning model for receving XRP
  recevieRipple() {
    this.receiveCryptoDialog = this.dialog.open(ReceiverCryptoComponent, {
      height: 'auto',
      width: '450px',
      data: this.dialogConfig.data = {
        receiveRipple: true,
        receiverAddress: this.userXRPAddress
      }
    });
  }





  // opening model for sending steller
  sendStellar() {
    this.sendCryptoDialog = this.dialog.open(SendCryptoComponent, {
      height: 'auto',
      width: '450px',
      data: this.dialogConfig.data = {
        sendStellar: true,
        balance: this.stellarBalance,
        currentRate: this.stellarCurrentRate,
        balanceInEuro: this.stellarToEuro
      }
    });
  }

  // opning model for receving Steller
  recevieStellar() {
    this.receiveCryptoDialog = this.dialog.open(ReceiverCryptoComponent, {
      height: 'auto',
      width: '450px',
      data: this.dialogConfig.data = {
        recevieStellar: true,
        receiverAddress: this.userXLMAddress
      }
    });
  }






  // function for getting bitcoin transaction
  bitcoinTransactions() {
    this.btcService.userBitCoinTransaction(this.pageIndex, this.limitBitcoin, this.search).subscribe((result) => {
      if (result) {
        this.bitCoinDataSource = result.transactions;
        this.totalLengthBitcoin = result.count;
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });
  }

  // searching in BTC transaction
  searchBitCoin(value: any) {
    this.search = value;
    this.bitcoinTransactions();
  }

  // chnage limit and previous next button in BTC transaction
  getBitCoinTnx(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.limitBitcoin = event.pageSize;
    this.bitcoinTransactions();
  }







  // function for getting etherum transaction
  ethereumTransaction() {
    this.ethService.userEthereumTransaction(this.pageIndex, this.limitEtherum, this.search).subscribe((result) => {
      if (result) {
        this.ethereumDataSource = result.transactions;
        this.totalLengthEthereum = result.count;
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });
  }

  // searching in ETH transaction
  searchEtherum(value: any) {
    this.search = value;
    this.ethereumTransaction();
  }

  // chnage limit and previous next button in ETH transaction
  getEthereumTnx(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.limitEtherum = event.pageSize;
    this.ethereumTransaction();
  }








  // function for getting tether transaction
  tetherTransaction() {
    this.usdtService.userStellarTransaction(this.pageIndex, this.limitTether, this.search).subscribe((result) => {
      if (result) {
        this.tetherDataSource = result.transactions;
        this.totalLengthTether = result.count;
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });
  }


  // searching in USDT transaction
  searchTether(value: any) {
    this.search = value;
    this.tetherTransaction();
  }

  // chnage limit and previous next button in USDT transaction
  getTetherTnx(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.limitTether = event.pageSize;
    this.tetherTransaction();
  }






  liteCoinTransaction() {
    this.ltcService.userLitecoinTransaction(this.pageIndex, this.limitLitecoin, this.search).subscribe((result) => {
      if (result) {
        this.litecoinDataSource = result.transactions;
        this.totalLengthLitecoin = result.count;
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });
  }

  // searching in LTC transaction
  searchLitecoin(value: any) {
    this.search = value;
    this.liteCoinTransaction();
  }

  // chnage limit and previous next button in LTC transaction
  getLitecoinTnx(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.limitLitecoin = event.pageSize;
    this.liteCoinTransaction();
  }






  // function for getting monero transaction
  moneroTransaction() {
    this.xmrService.userMoneroTransaction(this.pageIndex, this.limitMonero, this.search).subscribe((result) => {
      if (result) {
        this.moneroDataSource = result.transactions;
        this.totalLengthMonero = result.count;
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });
  }

  // searching in LTC transaction
  searchMonero(value: any) {
    this.search = value;
    this.moneroTransaction();
  }

  // chnage limit and previous next button in LTC transaction
  getMoneroTnx(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.limitMonero = event.pageSize;
    this.moneroTransaction();
  }






  // function for getting BCH transaction
  bitcashTransaction() {
    this.bchService.userBitCashTransaction(this.pageIndex, this.limitBitcash, this.search).subscribe((result) => {
      if (result) {
        this.bitcashDataSource = result.transactions;
        this.totalLengthBitCash = result.count;
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });
  }

  // searching in BXH transaction
  searchBitcash(value: any) {
    this.search = value;
    this.bitcashTransaction();
  }

  // chnage limit and previous next button in BCH transaction
  getBitCashTnx(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.limitBitcash = event.pageSize;
    this.bitcashTransaction();
  }




  // function for getting ripple transactions
  rippleTransactions() {
    this.xrpService.userRippleTransaction(this.pageIndex, this.limitRipple, this.search).subscribe((result) => {
      if (result) {
        this.rippleDataSource = result.transactions;
        this.totalLengthRipple = result.count;
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });
  }

  // searching in ripple transaction
  searchRipple(value: any) {
    this.search = value;
    this.rippleTransactions();
  }

  // chnage limit and previous next button in ripple transaction
  getRipplePage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.limitRipple = event.pageSize;
    this.rippleTransactions();
  }




  // function for getting stellar transactions
  stellarTransactions() {
    this.xlmService.userStellarTransaction(this.pageIndex, this.limitStellar, this.search).subscribe((result) => {
      if (result) {
        this.stellarDataSource = result.transactions;
        this.totalLengthStellar = result.count;
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });
  }

  // searching in stellar transaction
  searchStellar(value: any) {
    this.search = value;
    this.stellarTransactions();
  }

  // chnage limit and previous next button in stellar transaction
  getStellarPage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.limitStellar = event.pageSize;
    this.stellarTransactions();
  }

}
