import { Component } from '@angular/core';

@Component({
  selector: 'read-more',
  templateUrl: 'read-more-component.html',
})
export class ReadMoreComponent {

  text: string;
  isView: boolean = true;

}
