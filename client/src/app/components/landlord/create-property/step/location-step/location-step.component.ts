import { Component, EventEmitter, input, Output } from '@angular/core';
import { GeoMapComponent } from "./geo-map/geo-map.component";

@Component({
  selector: 'app-location-step',
  standalone: true,
  imports: [GeoMapComponent],
  templateUrl: './location-step.component.html',
  styleUrl: './location-step.component.scss'
})
export class LocationStepComponent {
  location = input.required<string>();
  @Output() locationChange = new EventEmitter<string>();
  @Output() stepValidityChange = new EventEmitter<boolean>();

  onLocationChange(location: string): void {
    console.log('Location changed:', location);
    if (location) {
      this.locationChange.emit(location);
      this.stepValidityChange.emit(true);
    } else {
      console.warn('Invalid location received');
      this.stepValidityChange.emit(false);
    }
  }
}