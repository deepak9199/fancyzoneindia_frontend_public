import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-image',
  templateUrl: './pop-image.component.html',
  styleUrls: ['./pop-image.component.css']
})
export class PopImageComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data)
  }
}
