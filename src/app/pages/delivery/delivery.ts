import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SideBare } from './components/side-bare/side-bare';


@Component({
  selector: 'app-delivery',
  imports: [RouterLink, SideBare, RouterOutlet],
  templateUrl: './delivery.html',
  styleUrl: './delivery.scss'
})
export class Delivery {

}
