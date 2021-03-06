/** 
 * The GenreComponent is used to render a mat dialog containing information about the genre of the movie selected.
 * @module GenreComponent
 */

import { Component, OnInit, Inject } from '@angular/core';

//import data from movieCard comp to inject into this component
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; 


@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})

export class GenreComponent implements OnInit {

  movies: any[] = [];

    /**
     * used @ inject to inject data from a function in movieCard component in to this component, subsequently to its template.
   * Defined injection data in constructor, to pupolate the template
   */ 
  constructor(
  
      @Inject(MAT_DIALOG_DATA)
        public data: { name: string;    description: string;  }, // injected data
  ) { }

  ngOnInit(): void {
  }


}
