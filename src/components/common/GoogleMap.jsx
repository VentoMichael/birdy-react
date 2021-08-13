import React, { Component, Fragment } from 'react'
import { Map,InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: true,
            activeMarker: {},
            selectedPlace: {},
        }
    }
    onMarkerClick = (props, marker) =>{
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    };
    containerStyle = {
        maxWidth: '300px',
        maxHeight: '300px',
    }
    render(){
        return (
            <Fragment>
                <Map google={this.props.google}
                     zoom={this.props.zoom}
                     initialCenter={this.props.initialPos}
                     onClick={this.props.getCoordinates}
                     containerStyle={this.containerStyle}
                >
                    {this.props.positions ? this.props.positions.map((position, key) =>
                        <Marker position={position} key={key} name={position.name} superficy={position.superficy} onClick={this.onMarkerClick} />
                    ) : ''}
                </Map>
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <section>
                        <h2 aria-level="2">{this.state.selectedPlace.name}</h2>
                    </section>
                </InfoWindow>
            </Fragment>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.GOOGLE_MAP_API
})(MapContainer)