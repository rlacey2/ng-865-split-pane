 
import { Component  } from '@angular/core';
import { SplitPaneComponent } from './splitPane/splitPane';


@Component({
  selector: 'app-root',

  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [SplitPaneComponent],

})

export class AppComponent {
  
  constructor() {

}

}