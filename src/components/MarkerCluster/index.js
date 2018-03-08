import React, { Component } from 'react';
import {Marker} from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import CircularJSON from 'circular-json';
import 'react-leaflet-markercluster/dist/styles.min.css';

/* https://yuzhva.github.io/react-leaflet-markercluster/#markercluster-options */
/*  <Marker position={[37.789736, -122.408673]} />
    <Marker position={[37.788972, -122.410677]} />
    <Marker position={[37.76573, -122.39975]} />
*/

//testing Markers. Will remove
const testMarkers = [
  { position: [37.789736, -122.408673] },
  { position: [37.788972, -122.410677] },
  { position: [37.76573, -122.39975] },
];

class MarkerCluster extends Component{
  constructor(props) {
   super(props);

   this.onMarkerClick = this.onMarkerClick.bind(this);
   this.onClusterClick = this.onClusterClick.bind(this);
   this.onPopupClose =  this.onPopupClose.bind(this);
   this.getPopup = this.getPopup.bind(this);
   this.getTooltipWithOptions = this.getTooltipWithOptions.bind(this);
   this.getLatLng = this.getLatLng.bind(this);
  }

  //react-leaflet-markerclusted method
  onMarkerClick(marker){
   // console.log(marker);
    console.log("Clicked Marker!");
   // marker.bindPopup(`<p>Hello world! My coordinates are ${marker._latlng.lat} ${marker._latlng.lng}.</p>`).openPopup();
  }

  //react-leaflet-markerclusted method
  onClusterClick(){
    console.log("Clicked Cluster!");
  }

  //react-leaflet-markerclusted method
  onPopupClose(){
    console.log("Popup has been closed!");
  }

  getLatLng(feature){
    const leafletCoordinates = feature.geometry.coordinates;
    const lat = leafletCoordinates[1];
    const long = leafletCoordinates[0];
    return [lat,long];
  }

  getPopup(feature){
  // console.log(feature.properties);
    return (`
      <div>
      <b>Hello world!</b>
        <p>My coordinates are(LatLng): [${feature.geometry.coordinates[1]} ${feature.geometry.coordinates[0]}]</p>
        <p>My properties are still in the process of being cleaned up in the backend: ${feature.properties}</p>
      </div>
    `);
  }

  getTooltipWithOptions(){
    return L.tooltip({ direction: 'bottom' }).setContent('Its a tooltip!');
  }
 
  render(){  
    this.data = this.props.data;
    let markers = [];
    
    const filteredFeatures = this.data.features.filter((feature) => {return (feature.geometry.coordinates[0] && feature.geometry.coordinates[1])});

    if (filteredFeatures){
      markers = filteredFeatures.map(feature => {
      let marker = {};
      marker.position = this.getLatLng(feature);
      marker.popup = this.getPopup(feature);
      // marker.tooltip = CircularJSON.parse(this.getTooltipWithOptions());  
      return marker;
      });
  
    return (
         <MarkerClusterGroup markers={markers}  
        //onClusterClick={this.onClusterClick}
        //onPopupClose={this.onPopupClose}
      />
    )
  }
  }
}

export default MarkerCluster;