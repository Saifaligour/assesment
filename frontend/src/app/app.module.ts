import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientJsonpModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomMaterialModule } from './material.module';
import { MatNativeDateModule } from '@angular/material';
import { OTPComponent } from './otp/otp.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserIdleModule } from 'angular-user-idle';


@NgModule({
  declarations: [
    AppComponent,
    OTPComponent,
    NotFoundComponent,

  ],
  imports: [
    BrowserModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    LayoutModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    FlexLayoutModule,
    FormsModule,
    NgProgressModule,
    ImageCropperModule,
    UserIdleModule.forRoot({ idle: 600, timeout: 600, ping: 120 })

  ],
  entryComponents: [OTPComponent],
  providers: [CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
