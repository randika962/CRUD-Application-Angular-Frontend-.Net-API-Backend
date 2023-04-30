import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EmployeeManager.UI';
  url = "";

  today = new Date();

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
        this.url = this.url.substr(0, this.url.lastIndexOf('/'));
      }
    })
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    setInterval(() => {
      this.today = new Date();
      console.log(this.today)
     }, 1000)
  }

  btnBack() {

    this.router.navigateByUrl('');
  };

}
