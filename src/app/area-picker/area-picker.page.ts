import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-picker',
  templateUrl: './area-picker.page.html',
  styleUrls: ['./area-picker.page.scss'],
})
export class AreaPickerPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onAreaSelect(normal = true): void {
    let value;
    if (normal) {
      value = 1;
    } else {
      value = 0;
    }
    this.router.navigateByUrl('/home/' + value);
  }


}
