import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserKycVerificationService } from 'src/app/services/user-kyc-verification.service';
import { MatSnackBar, MatStepper } from '@angular/material';
import { ApiService } from 'src/app/services/api.service';
import { UsersService } from 'src/app/services/users.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-user-kyc-verification',
  templateUrl: './user-kyc-verification.component.html',
  styleUrls: ['./user-kyc-verification.component.css']
})
export class UserKycVerificationComponent implements OnInit {

  isLinear = true;
  otp = true;
  user: any;
  addressPreview: any;
  frontPreview: any;
  backPreview: any;
  selfiePreview: any;
  status = 1;


  minDate = new Date(1919, 0, 1);
  maxDate = new Date();

  firstname: any;
  lastname: any;
  country: any;
  mobileno: any;
  newMobile: any;
  numberVerify: any;
  isSmallScreen: boolean;

  // verification editable step
  editable = {
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,

  };

  // verification step like 0,1,2,3, etc
  verificationStatus = {
    step1: true,
    step2: true,
    step3: true,
    step4: true,
    step5: true,
  };

  constructor(
    private userKYCService: UserKycVerificationService,
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    private userService: UsersService,
    private breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver.observe(['(max-width: 768)']).subscribe(result => {
      // if (result.matches) {
      //   this.isSmallScreen = true;
      // } else {
      //   this.isSmallScreen = false;
      // }
    });
  }


  //  send OTP for number verification form
  mobileVerificationForm = new FormGroup({
    mobile: new FormControl('', [Validators.required])
  });


  // verify OTP form
  verifyOTPForm = new FormGroup({
    verifyOTP: new FormControl('', [Validators.required])
  });


  // personal details submission form
  personalDetailsForm = new FormGroup({
    gender: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    houseNo: new FormControl('', [Validators.required, Validators.pattern('^[ A-Za-z0-9_-]*$')]),
    street: new FormControl('', [Validators.required, Validators.pattern('^[ A-Za-z0-9_-]*$')]),
    city: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]),
    district: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]),
    zipCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    country: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
    useraddressimage: new FormControl('', [Validators.required])
  });


  // id prooff verificatiion form
  idProofForm = new FormGroup({
    countryid: new FormControl('', [Validators.required]),
    idnumber: new FormControl('', [Validators.required, Validators.pattern('^\\d+$')]),
    id_proof_front: new FormControl('', Validators.required),
    id_proof_back: new FormControl('', Validators.required)
  });


  // selfie upload form
  selfieForm = new FormGroup({
    userSelfie: new FormControl('', [Validators.required])
  });

  @ViewChild('stepper') stepper: MatStepper;

  ngOnInit() {
    this.user = this.apiService.getUserDetails();
    this.firstname = this.user.firstname;
    this.lastname = this.user.lastname;
    this.userKYCService.getCountryList().subscribe((result) => {
      this.country = result;
    });

    this.numberVerify = this.user.numberVerify;
    if (this.numberVerify && this.status === 1) {
      this.stepper.selectedIndex = 1;
    }

    this.userKYCService.getKycStatus().subscribe((result) => {
      this.status = result.step;
      if (this.status) {
        if (this.status === 1 && this.numberVerify) {
          // console.log(this.status);
          this.stepper.selectedIndex = 2;
        }
        if (this.status === 2) {
          this.stepper.selectedIndex = 3;
        }
        if (this.status === 3) {
          this.stepper.selectedIndex = 4;
        }
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });
  }


  // getting controls of mobile verification for form validation
  get controls() { return this.mobileVerificationForm.controls; }

  // getting controls of verify OTP for form validation
  get controlsOTP() { return this.verifyOTPForm.controls; }

  // getting controls of personal details for form validation
  get personalControls() { return this.personalDetailsForm.controls; }

  // getting controls of id proof for form validation
  get idControls() { return this.idProofForm.controls; }


  // removing + sign from the mobile number
  remove_first_character(element) {
    return element.slice(1);
  }



  // sending OTP for user mobile number verification
  sendOTP() {
    if (this.mobileVerificationForm.invalid) {
      return false;
    } else {
      this.mobileno = this.mobileVerificationForm.value.mobile;
      this.newMobile = this.remove_first_character(this.mobileno);
      const details = {
        mobile: this.newMobile
      };
      this.userKYCService.sendVerificationCode(details).subscribe((result) => {
        if (result.success === false) {
          this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
        }
        if (result.success === true) {
          this.otp = true;
          this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
        }
        if (result[0]) {
          this.snackBar.open(result[0], 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
        }
      }, error => {
        this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      });
    }
  }



  // verify user mobile number via OTP
  verifyOTP() {
    if (this.verifyOTPForm.invalid) {
      return false;
    } else {
      this.userKYCService.verifyOTP(this.verifyOTPForm.value).subscribe((result) => {
        if (result.success === false) {
          this.editable.step1 = true;
          this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
        }
        if (result.success === true) {
          this.editable.step1 = false;
          this.stepper.next();
          this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
        }
        if (result[0]) {
          this.editable.step1 = true;
          this.snackBar.open(result[0], 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
        }
      }, error => {
        this.editable.step1 = true;
        this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      });
    }
  }


  // picking user address proof and patching it to personal details form and showing preview
  onAddressPicked(event: any) {
    // tslint:disable-next-line: deprecation
    const file = (event.target as HTMLInputElement).files[0];
    this.personalDetailsForm.patchValue({ useraddressimage: file });
    this.personalDetailsForm.get('useraddressimage').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.addressPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }



  // saving personal details of the user
  personalDetailsSubmit() {
    if (this.personalDetailsForm.invalid) {
      return false;
    } else {
      this.userKYCService.persoanlDetail(
        this.personalDetailsForm.value.gender,
        this.personalDetailsForm.value.dob,
        this.personalDetailsForm.value.houseNo,
        this.personalDetailsForm.value.street,
        this.personalDetailsForm.value.city,
        this.personalDetailsForm.value.district,
        this.personalDetailsForm.value.zipCode,
        this.personalDetailsForm.value.country,
        this.personalDetailsForm.value.useraddressimage
      ).subscribe((result) => {
        if (result.success === false) {
          this.editable.step2 = true;
          this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
        }
        if (result.success === true) {
          this.editable.step2 = false;
          this.stepper.next();
          this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
        }
        if (result[0]) {
          this.editable.step2 = true;
          this.snackBar.open(result[0], 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
        }
      }, error => {
        this.editable.step2 = true;
        this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      });
    }
  }


  // picking user front side of id proof and patchhing it to id proof form  and showing preview
  onFrontSidePicked($event) {
    // tslint:disable-next-line: deprecation
    const file = (event.target as HTMLInputElement).files[0];
    this.idProofForm.patchValue({ id_proof_front: file });
    this.idProofForm.get('id_proof_front').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.frontPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  // picking user back side of id proof and patchhing it to id proof form  and showing preview
  onBackSidePicked($event) {
    // tslint:disable-next-line: deprecation
    const file = (event.target as HTMLInputElement).files[0];
    this.idProofForm.patchValue({ id_proof_back: file });
    this.idProofForm.get('id_proof_back').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.backPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }


  // saving user id proof
  saveIDProof() {
    if (this.idProofForm.invalid) {
      return false;
    } else {
      this.userKYCService.idProofSubmit(
        this.idProofForm.value.countryid,
        this.idProofForm.value.idnumber,
        this.idProofForm.value.id_proof_front,
        this.idProofForm.value.id_proof_back).subscribe((result) => {
          if (result.success === false) {
            this.editable.step3 = true;
            this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
          }
          if (result.success === true) {
            this.editable.step3 = false;
            this.stepper.next();
            this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
          }
          if (result[0]) {
            this.editable.step3 = true;
            this.snackBar.open(result[0], 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
          }
        }, error => {
          this.editable.step3 = true;
          this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
        });
    }
  }


  // picking user selfie and patchhing it to selfie form and showing preview
  onSelfiePicked($event) {
    // tslint:disable-next-line: deprecation
    const file = (event.target as HTMLInputElement).files[0];
    this.selfieForm.patchValue({ userSelfie: file });
    this.selfieForm.get('userSelfie').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.selfiePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }


  // saving user selfie
  saveSelfie() {
    if (this.selfieForm.invalid) {
      return false;
    } else {
      this.userKYCService.selfieUpload(this.selfieForm.value.userSelfie).subscribe((result) => {
        if (result.success === false) {
          this.editable.step4 = true;
          this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
        }
        if (result.success === true) {
          this.editable.step4 = false;
          this.stepper.next();
          this.snackBar.open(result.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
        }
        if (result[0]) {
          this.editable.step4 = true;
          this.snackBar.open(result[0], 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
        }
      }, error => {
        this.editable.step4 = true;
        this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      });
    }
  }
}
