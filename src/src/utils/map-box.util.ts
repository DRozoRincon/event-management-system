import axios from "axios";
import { ConfigServer } from "../config/config-server.config";

export class MapBox extends ConfigServer {

    async getNearbyPlaces (lat: number, long: number) {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json`;

        const response: any = await axios.get(url, {
          params: {
            proximity: `${long},${lat}`,
            access_token: this.getEnvironment("MAPBOX_TOKEN"),
            types: "poi",
            limit: 20
          }
        });
        
        const places = response.data.features.map((feature: any) => ({
          name: feature.text,
          address: feature.place_name,
          category: feature.properties.category,
          coordinates: feature.center,
        }));
    
        return places;
    }
}