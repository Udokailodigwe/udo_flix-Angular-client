/** 
 * The SynopsisComponent is used to render a mat dialog containing a synopsis of the movie selected.
 * @module SynopsisComponent
 */

import { Component, OnInit, Inject } from '@angular/core';

    // Injection token allows access to data passed into mat dialog from movieCard.
import { MAT_DIALOG_DATA } from '@angular/material/dialog';   

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})
export class SynopsisComponent implements OnInit {

  /*
   * Defined injection data in constructor, to pupolate the template
   */ 
  constructor(
      @Inject(MAT_DIALOG_DATA)
      public data: { name: string, description: string}
  ) { }

  ngOnInit(): void {
  }

}
