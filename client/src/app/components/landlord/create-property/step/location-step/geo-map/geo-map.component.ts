import {
  Component,
  effect,
  EventEmitter,
  inject,
  input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import { LocationMapService } from '../location-map.service';
import { ToastService } from '../../../../../../layout/toast.service';
import { County } from '../location-map.model';
import L, { circle, latLng, polygon, tileLayer } from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { query } from '@angular/animations';

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
  private provider: OpenStreetMapProvider | undefined;

  location = input.required<String>();
  placeHolder = input<String>('Select your property residence county');
  currentLocation: County | undefined;

  @Output()
  locationChange = new EventEmitter<string>();

  formatLabel = (county: County) => county.code+" "+county.name;

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

  constructor() {
    this.listenToLocation();
  }

  onMapReady(map: L.Map): void {
    this.map = map;
    this.configSearchControl();
  }
  configSearchControl() {
    this.provider = new OpenStreetMapProvider();
  }

  onLocationChangeEvent(newEvent: AutoCompleteSelectEvent): void {
    const newCounty = newEvent.value as County;
    this.locationChange.emit(newCounty.code);
  }

  private listenToLocation(): void {
    effect(() => {
      const countiesState = this.locationMapService.counties();
      if (countiesState.status === 'OK' && countiesState.value) {
        this.counties = countiesState.value;
        this.filteredCounties = countiesState.value;
        this.changeMapLocation(this.location());
      } else if (countiesState.status === 'ERROR') {
        this.toastService.send({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong when loading on change location',
        });
      }
    });
  }
  changeMapLocation(term: String) {
    this.currentLocation = this.counties.find((county) => county.code === term);
    if (this.currentLocation) {
      this.provider!.search({ query: this.currentLocation.name.common }).then(
        (res) => {
          if (res && res.length > 0) {
            const firstResult = res[0];
            this.map!.setView(new L.LatLng(firstResult.y, firstResult.x), 13);
            new L.Marker([firstResult.y, firstResult.x])
              .addTo(this.map!)
              .bindPopup(firstResult.label)
              .openPopup();
          }
        }
      );
    }
  }

  search(newCompleteEvent: AutoCompleteCompleteEvent): void {
    this.filteredCounties = this.counties.filter((county) =>
      county.name.common.toLowerCase().startsWith(newCompleteEvent.query)
    );
  }
}
