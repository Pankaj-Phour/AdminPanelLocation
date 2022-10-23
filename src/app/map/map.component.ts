import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnInit {

  @ViewChild('mapContainer') mapContainer:ElementRef;
  title = 'location';
  map:any;
  marker:any;
  @Input() lat;
  @Input() lon;
  user:any;
  tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    atteibution: '&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  })

ngOnInit(): void {
    this.lon = localStorage.getItem('longitude');
    this.lat = localStorage.getItem('latitude');
}
  mapLoad(){
    this.map = L.map('map',{
      center:[this.lat,this.lon],
      zoom:3
    })
    this.tiles.addTo(this.map)
  }
getlocation(){
 
    console.log(this.lat,this.lon);
    const marker = L.marker([this.lat,this.lon]);
    marker.addTo(this.map)
    setTimeout(()=>{
      // console.log(this.map);
      this.map.setView(new L.LatLng(this.lat,this.lon),4,{animation:true})
      setTimeout(()=>{
        this.map.setZoom(5)
        setTimeout(()=>{
          this.map.setZoom(6)
          setTimeout(()=>{
            this.map.setZoom(7)
            setTimeout(()=>{
              this.map.setZoom(8)
              setTimeout(()=>{
                this.map.setZoom(9)
                setTimeout(()=>{
                  this.map.setZoom(10)
                  setTimeout(()=>{
                    this.map.setZoom(11)
                    setTimeout(()=>{
                      this.map.setZoom(12)
                      setTimeout(()=>{
                        this.map.setZoom(14)
                        setTimeout(()=>{
                          this.map.setZoom(15)
                          setTimeout(()=>{
                            this.map.setZoom(16);
                            setTimeout(()=>{
                              this.map.setZoom(17);
                              setTimeout(()=>{
                                this.map.setZoom(18);
                              },150)
                            },150)
                          },150)
                        },150)
                      },200)
                    },200)
                  },200)
                },200)
              },200)
            },200)
          },200)
        },200)
      },200)
    },1500)
}
ngAfterViewInit() {
  console.log("Hello from Location project");
  this.mapLoad();
  setTimeout(()=>{
    this.getlocation();
  },1500)
  this.user = localStorage.getItem('userP')
}
}

