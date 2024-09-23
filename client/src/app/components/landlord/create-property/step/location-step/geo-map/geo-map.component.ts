import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { LocationMapService } from '../location-map.service';
import { ToastService } from '../../../../../../layout/toast.service';
import { County } from '../location-map.model';
import { circle, latLng, polygon, tileLayer } from 'leaflet';

@Component({
  selector: 'app-geo-map',
  standalone: true,
  imports: [LeafletModule, FormsModule, AutoCompleteModule],
  templateUrl: './geo-map.component.html',
  styleUrl: './geo-map.component.scss',
})
export class GeoMapComponent {
  locationMapService: LocationMapService = inject(LocationMapService);
  toastService: ToastService = inject(ToastService);

  private map: L.Map | undefined;

  location = input.required<String>();
  placeHolder = input<String>('Select your property residence county');
  currentLocation: County | undefined;

  @Output()
  locationChange = new EventEmitter<string>();

  formatLabel = (county: County) => county.name;

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 5,
    center: latLng(-1.2810399, 36.8235669),
  };

  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          attribution: '...',
        }
      ),
    },
    overlays: {
      'Big Circle': circle([-1.3, 37], { radius: 5000 }),
      'Big square': polygon([
        [-1.28, 36.75],
        [-1.28, 36.75],
        [-1.28, 36.75],
        [-1.28, 36.75],
      ]),
    },
  };

  counties: Array<County> = [];
  filteredCounties: Array<County> = [];

  onMapReady(map: L.Map): void{
    this.map=map;
  }
}
