import { Component, OnInit, OnDestroy, signal, effect } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map implements OnInit, OnDestroy {
  selectedPlace = signal<string | null>(null);
  showSewers = signal<boolean>(false);
  private map!: L.Map;
  private imageLayer!: L.ImageOverlay;

  ngOnInit() {
    this.initMap();
  }
  private readonly MAP_BOUNDS: L.LatLngBoundsExpression = [
    [0, 0],
    [1000, 1000],
  ];
  private readonly CITY_IMAGE = 'derry-map.png';
  private readonly SEWER_IMAGE = 'derry-sewers-map.png';
  constructor() {
    effect(() => {
      const isSewer = this.showSewers();
      if (this.imageLayer) {
        this.imageLayer.setUrl(isSewer ? this.SEWER_IMAGE : this.CITY_IMAGE);
      }
    });
  }
  private initMap() {
    this.map = L.map('map', {
      crs: L.CRS.Simple,
      minZoom: -1,
      zoomSnap: 0.1,
    });

    this.imageLayer = L.imageOverlay(this.CITY_IMAGE, this.MAP_BOUNDS).addTo(this.map);

    this.map.fitBounds(this.MAP_BOUNDS, {
      padding: [0, 0]
    });

    this.addMarker(200, 350, 'The Barrens', 'Lugar de reunión del Club de los Perdedores.');
    this.addMarker(500, 600, 'Derry Public Library', 'Donde Ben Hanscom pasaba sus tardes.');
  }
  private addMarker(x: number, y: number, title: string, desc: string): void {
    const marker = L.marker([x, y]).addTo(this.map);
    marker.bindPopup(`<b>${title}</b><br>${desc}`);

    marker.on('click', () => {
      this.selectedPlace.set(title);
      console.log(`Explorando: ${title}`);
    });
  }
  toggleSewers() {
    this.showSewers.update((v) => !v);
  }
  ngOnDestroy() {
    if (this.map) {
      console.log('Desmontando el mapa de Derry para liberar memoria...');
      this.map.remove();
    }
  }
}
