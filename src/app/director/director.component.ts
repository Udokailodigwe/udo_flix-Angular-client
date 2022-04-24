/** 
 * The DirectorComponent is used to render a mat dialog containing the director information of the movie selected.
 * @module SynopsisComponent
 */
import { Component, OnInit, Inject} from '@angular/core';

    // Injection token allows access to data passed into mat dialog from movieCard.
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {

  /*
   * Defined injection data in constructor, to pupolate the template
   */ 
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data : {name: string, bio: string}
  ) { }

  ngOnInit(): void {
  }

}
