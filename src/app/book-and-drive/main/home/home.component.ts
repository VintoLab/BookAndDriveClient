import { Component } from '@angular/core';
import { PhotoSliderComponent } from "./photo-slider/photo-slider.component";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PhotoSliderComponent,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
