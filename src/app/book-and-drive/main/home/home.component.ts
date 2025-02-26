import { Component } from '@angular/core';
import { PhotoSliderComponent } from "./photo-slider/photo-slider.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PhotoSliderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
