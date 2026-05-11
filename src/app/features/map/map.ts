import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map implements OnInit, OnDestroy {
  selectedPlace = signal<string | null>(null);
  private map!: L.Map;

  ngOnInit() {
    this.initMap();
  }

  private initMap() {
    this.map = L.map('map', {
      crs: L.CRS.Simple,
      minZoom: -1,
      zoomSnap: 0.1
    });

    const bounds: L.LatLngBoundsExpression = [
      [0, 0],
      [1000, 1000],
    ];
    L.imageOverlay('derry-map.png', bounds).addTo(this.map);

    this.map.fitBounds(bounds, {
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
  ngOnDestroy() {
    if (this.map) {
      console.log('Desmontando el mapa de Derry para liberar memoria...');
      this.map.remove();
    }
  }
}
