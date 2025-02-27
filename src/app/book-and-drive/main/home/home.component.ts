import { Component } from '@angular/core';
import { PhotoSliderComponent } from "./photo-slider/photo-slider.component";
import { MatButtonModule } from '@angular/material/button';
import { AdvantagesComponent } from './advantages/advantages.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PhotoSliderComponent,
    AdvantagesComponent,
    MatButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
