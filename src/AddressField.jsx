/* global google */
import React, {Component} from "react";
import connectField from 'uniforms/connectField';
import wrapField from 'uniforms-bootstrap4/wrapField'

import {
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

import SearchBox from  "react-google-maps/lib/places/SearchBox";


console.log(withGoogleMap)

const INPUT_STYLE = {
    display: 'block',
    width: 'calc(100% - 128px)',
    padding: '0.5rem 0.75rem',
    fontSize: '1rem',
    lineHeight: '1.25',
    color: '#464a4c',
    backgroundColor: '#fff',
    backgroundImage: 'none',
    backgroundClip: 'padding-box',
    border: '1px solid rgba(0, 0, 0, 0.15)',
    borderRadius: '0.25rem',
    marginRight: '140px',
    marginTop: `8px`,
    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
    boxSizing: `border-box`,
};

const SearchBoxWithSearchBox = withGoogleMap(props => (
    <GoogleMap
        ref={props.onMapMounted}
        defaultZoom={15}
        center={props.center}
        onBoundsChanged={props.onBoundsChanged}
        onClick={props.onMapClick}
    >
        <SearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            controlPosition={google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={props.onPlacesChanged}
            inputPlaceholder="Search address"
            inputProps={{defaultValue: props.defaultValue}}
            inputStyle={INPUT_STYLE}
        />
        {props.markers.map((marker, index) => (
            <Marker position={marker.position} key={index}/>
        ))}
    </GoogleMap>
));

/*
 * https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
class SearchBoxComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bounds: null,
            center: {
                lat: -27.4858328,
                lng: 153.0358966,
            },
            markers: [],
        };

        this.handleMapMounted = this.handleMapMounted.bind(this);
        this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
        this.handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
        this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
        this.value = props.value || {}
    }

    onMapClick(e) {
        const geocoder = new google.maps.Geocoder;
        const latlng = e.latLng.toJSON()
        const markers = [{position: latlng}]
        this.setState({
            markers,
        });
            this.value.position = latlng
        geocoder.geocode({location: latlng}, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    this.value.address = results[0].formatted_address
                    this._searchBox._inputElement.value = results[0].formatted_address
                } else {
                    this._searchBox._inputElement.value = ''
                    this.setState({markers: []});
                }
            } else {
                this._searchBox._inputElement.value = ''
                this.setState({markers: []});
            }
        })
        this.props.onChange(this.getValue())
    }

    handleMapMounted(map) {
        this._map = map;
    }

    handleBoundsChanged() {
        this.setState({
            bounds: this._map.getBounds(),
            center: this._map.getCenter(),
        });
    }

    handleSearchBoxMounted(searchBox) {
        this._searchBox = searchBox;
    }

    handlePlacesChanged() {

        const places = this._searchBox.getPlaces();

        // Add a marker for each place returned from search bar
        let markers = []
        if (places[0]) {
            const position = places[0].geometry.location.toJSON()
            const address = places[0].formatted_address
            markers.push({position})
            this.value.position = position
            this.value.address = address
            this._searchBox._inputElement.value = address
            const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;
            this.setState({
                center: mapCenter,
                markers,
            });
        } else {
            this._searchBox._inputElement.value = ''
            this.setState({markers: []});
        }
        this.props.onChange(this.getValue())
    }

    getValue() {
        return Object.keys(this.value).length === 0 ? undefined : this.value

    }

    render() {
        return (
            <SearchBoxWithSearchBox
                containerElement={
                    <div style={{width: '100%', height: `350px`}}/>
                }
                mapElement={
                    <div style={{width: '100%', height: `350px`}}/>
                }
                center={this.state.center}
                onMapMounted={this.handleMapMounted}
                onBoundsChanged={this.handleBoundsChanged}
                onSearchBoxMounted={this.handleSearchBoxMounted}
                bounds={this.state.bounds}
                onPlacesChanged={this.handlePlacesChanged}
                markers={this.state.markers}
                onMapClick={this.onMapClick}
                defaultValue={this.value.address}
            />
        );
    }
}


const SearchBox_ = props => {
    console.log('SearchBox_ props', props, props.error)
    return wrapField(props, (<SearchBoxComponent {...props} />))
}

SearchBox_.displayName = 'SearchBox';

export default connectField(SearchBox_);



