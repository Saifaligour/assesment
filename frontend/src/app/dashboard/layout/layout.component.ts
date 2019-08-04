import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material';
import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  mode = 'side';
  opened = true;
  layoutGap = '64';
  fixedInViewport = true;
  firstName: any;
  lastName: any;
  profileImage: any;

  public constructor(
    private breakPointObserve: BreakpointObserver,
    private userService: UsersService,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private userIdle: UserIdleService
  ) { }

  ngOnInit() {
    const breakpoints = Object.keys(Breakpoints).map(key => Breakpoints[key]);
    this.breakPointObserve.observe(breakpoints)
      .pipe(map(bst => bst.matches))
      .subscribe(matched => {
        this.determineSidenavMode();
        this.determineLayoutGap();
      });
    this.userService.userProfile().subscribe((profile) => {
      if (profile) {
        this.firstName = profile.firstname;
        this.lastName = profile.lastname;
        if (profile.profileImage) {
          this.profileImage = `${environment.profileImage}${profile.profileImage}`;
        }
      }
    }, error => {
      this.snackBar.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
    });


    this.userIdle.startWatching();

    this.userIdle.onTimerStart().subscribe(count => {
      const eventList = ['click', 'mouseover', 'keydown', 'DOMMouseScroll', 'mousewheel',
        'mousedown', 'touchstart', 'touchmove', 'scroll', 'keyup'];
      for (const event of eventList) {
        document.body.addEventListener(event, () => this.userIdle.resetTimer());
      }
    });


    this.userIdle.onTimeout().subscribe(() => {
      this.apiService.logout();
      this.snackBar.
      open('You are logged out because of inactivity!', 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
    });

  }

  private determineSidenavMode(): void {
    if (
      this.isExtraSmallDevice() ||
      this.isSmallDevice()
    ) {
      this.fixedInViewport = false;
      this.mode = 'over';
      this.opened = false;
      return;
    }
    this.fixedInViewport = true;
    this.mode = 'side';
  }

  private determineLayoutGap(): void {
    if (this.isExtraSmallDevice() || this.isSmallDevice()) {
      this.layoutGap = '0';
      return;
    }
    this.layoutGap = '64';
  }

  public isExtraSmallDevice(): boolean {
    return this.breakPointObserve.isMatched(Breakpoints.XSmall);
  }

  public isSmallDevice(): boolean {
    return this.breakPointObserve.isMatched(Breakpoints.Small);
  }

  onlogout() {
    this.apiService.logout();
    this.snackBar.open(
      'You are logged out successfully!', 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
    this.router.navigate(['']);
  }
}
