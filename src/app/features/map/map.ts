//------ Imports ------//
import { Component, OnInit, OnDestroy, signal, effect, inject } from '@angular/core';
import * as L from 'leaflet';
import { Place as PlaceService } from '../../core/services/place';

//------ Component declaration ------//
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map implements OnInit, OnDestroy {
  // Signals for state
  selectedPlace = signal<string | null>(null);
  showSewers = signal<boolean>(false);

  // Leaflet references
  private map!: L.Map;
  private imageLayer!: L.ImageOverlay;
  private markerLayer = L.layerGroup(); // Group to manage markers easily

  // Service Injection
  private placeService = inject(PlaceService);
  places = this.placeService.places;

  private readonly MAP_BOUNDS: L.LatLngBoundsExpression = [
    [0, 0],
    [1000, 1000],
  ];
  private readonly CITY_IMAGE = 'maps/derry-map.png';
  private readonly SEWER_IMAGE = 'maps/derry-sewers-map.png';

  constructor() {
    effect(() => {
      const isSewer = this.showSewers();
      if (this.imageLayer) {
        this.imageLayer.setUrl(isSewer ? this.SEWER_IMAGE : this.CITY_IMAGE);
      }
    });
    effect(() => {
      const currentPlaces = this.places();

      // Only run if map is ready and we actually have data
      if (this.map && currentPlaces.length > 0) {
        console.log(`Syncing ${currentPlaces.length} places from Firebase...`);

        this.markerLayer.clearLayers();
        for (const place of currentPlaces) {
          if (this.isValidCoordinate(place.coordinates)) {
            this.addMarker(
              place.coordinates[0],
              place.coordinates[1],
              place.name,
              place.description,
            );
          } else {
            console.warn(`Skipping ${place.name}: Invalid coordinates.`);
          }
        }
      }
    });
  }

  ngOnInit() {
    this.initMap();
  }

  private initMap() {
    // Initialize Leaflet map
    this.map = L.map('map', {
      crs: L.CRS.Simple,
      minZoom: -1,
      zoomSnap: 0.1,
    });

    this.imageLayer = L.imageOverlay(this.CITY_IMAGE, this.MAP_BOUNDS).addTo(this.map);

    this.markerLayer.addTo(this.map);

    this.map.fitBounds(this.MAP_BOUNDS);
  }

  private addMarker(x: number, y: number, title: string, desc: string): void {
    const marker = L.marker([x, y]);
    marker.bindPopup(`<b>${title}</b><br>${desc}`);

    marker.on('click', () => {
      this.selectedPlace.set(title);
      console.log(`Explorando: ${title}`);
    });

    this.markerLayer.addLayer(marker);
  }

  private isValidCoordinate(coords: number[]): boolean {
    return coords && coords.length >= 2 && coords[0] <= 1000 && coords[1] <= 1000;
  }

  toggleSewers() {
    this.showSewers.update((v) => !v);
  }

  ngOnDestroy() {
    if (this.map) {
      console.log('Cleaning up Derry map...');
      this.map.remove();
    }
  }
}
