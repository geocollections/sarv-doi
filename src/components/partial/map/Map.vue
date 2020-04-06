<template>
  <div class="map">
    <div id="map" style="height: 50vh"></div>
    <div class="text-right" v-if="isOnlyOneLocation">
      <v-btn
        text
        class="text-none"
        color="red darken-2 darken-1"
        :href="
          `https://www.google.com/maps/?q=${locations[0].lat},${locations[0].lng}`
        "
        :title="
          `https://www.google.com/maps/?q=${locations[0].lat},${locations[0].lng}`
        "
        target="MapWindow"
      >
        Google Maps
      </v-btn>
      <v-btn
        text
        class="text-none"
        color="red darken-2 darken-1"
        :href="
          `https://xgis.maaamet.ee/xgis2/page/app/geoloogia400k?punkt=${geoToLest(
            locations[0].lat,
            locations[0].lng
          )}&moot=20000&tooltip=`
        "
        :title="
          `https://xgis.maaamet.ee/xgis2/page/app/geoloogia400k?punkt=${geoToLest(
            locations[0].lat,
            locations[0].lng
          )}&moot=20000&tooltip=`
        "
        target="MapWindow"
      >
        Estonian Geoportal
      </v-btn>
    </div>
  </div>
</template>

<script>
import * as L from "leaflet";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-fullscreen/dist/Leaflet.fullscreen";

export default {
  name: "Map",
  props: {
    locations: {
      type: Array
    },
    polygon: {
      type: Array
    }
  },
  data: () => ({
    map: null,
    center: L.latLng(58.5, 25.5),
    zoom: 6,
    markers: [],
    markerIcon: new L.DivIcon({
      html: "<i class='fas fa-map-marker-alt fa-3x' style='color: #D32F2F' />",
      iconSize: [29, 37],
      iconAnchor: [12, 36],
      popupAnchor: [2, -34],
      className: "map-marker"
    }),
    tileProviders: [
      {
        name: "OpenStreetMap",
        leafletObject: L.tileLayer(
          "https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia3V1dG9iaW5lIiwiYSI6ImNpZWlxdXAzcjAwM2Nzd204enJvN2NieXYifQ.tp6-mmPsr95hfIWu3ASz2w",
          {
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }
        ),
        minZoom: 1,
        maxZoom: 18
      },
      {
        name: "OpenTopoMap",
        leafletObject: L.tileLayer(
          "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
          {
            attribution:
              'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          }
        ),
        minZoom: 1,
        maxZoom: 18
      },
      {
        name: "Maaameti fotokaart",
        leafletObject: L.tileLayer(
          "https://tiles.maaamet.ee/tm/tms/1.0.0/foto@GMC/{z}/{x}/{-y}.png&ASUTUS=TALTECH&KESKKOND=LIVE&IS=SARV",
          {
            attribution:
              "Eesti kaardid: <a  href='http://www.maaamet.ee/'>Maa-amet</a>",
            tms: true,
            worldCopyJump: true,
            detectRetina: true,
            zIndex: 1,
            updateWhenIdle: true,
            continuousWorld: true
          }
        ),
        minZoom: 6,
        maxZoom: 18
      },
      {
        name: "Maaameti kaart",
        leafletObject: L.tileLayer(
          "https://tiles.maaamet.ee/tm/tms/1.0.0/kaart@GMC/{z}/{x}/{-y}.png&ASUTUS=TALTECH&KESKKOND=LIVE&IS=SARV",
          {
            attribution:
              "Eesti kaardid: <a  href='http://www.maaamet.ee/'>Maa-amet</a>",
            tms: true,
            worldCopyJump: true,
            detectRetina: true,
            zIndex: 1,
            updateWhenIdle: true,
            continuousWorld: true
          }
        ),
        minZoom: 6,
        maxZoom: 18
      }
    ],
    overlayMaps: [
      {
        name: "Maaameti hübriidkaart",
        leafletObject: L.tileLayer(
          "https://tiles.maaamet.ee/tm/tms/1.0.0/hybriid@GMC/{z}/{x}/{-y}.png&ASUTUS=TALTECH&KESKKOND=LIVE&IS=SARV",
          {
            attribution:
              "Eesti kaardid: <a  href='http://www.maaamet.ee/'>Maa-amet</a>",
            tms: true,
            worldCopyJump: true,
            detectRetina: true,
            zIndex: 2,
            updateWhenIdle: true,
            continuousWorld: true
          }
        ),
        minZoom: 6,
        maxZoom: 18
      }
    ]
  }),
  computed: {
    areLocationsSet() {
      return this.locations && this.locations.length > 0;
    },

    isOnlyOneLocation() {
      return this.areLocationsSet && this.locations.length === 1;
    },

    isPolygonSet() {
      return this.polygon && this.polygon.length > 0;
    }
  },
  mounted() {
    this.initMap();
  },
  beforeDestroy() {
    // eslint-disable-next-line no-console
    this.map.off("zoomend", () => console.log("zoomend OFF"));
    // eslint-disable-next-line no-console
    this.map.off("baselayerchange", () => console.log("baselayerchange OFF"));
    // eslint-disable-next-line no-console
    this.map.off("click", () => console.log("click OFF!"));
  },
  methods: {
    initMap() {
      this.map = L.map("map", {
        layers: [this.tileProviders[0].leafletObject],
        scrollWheelZoom: true
      }).setView(this.center, this.zoom);

      let baselayers = {};
      this.tileProviders.forEach(
        provider => (baselayers[provider.name] = provider.leafletObject)
      );
      let overlayMaps = {};
      this.overlayMaps.forEach(
        provider => (overlayMaps[provider.name] = provider.leafletObject)
      );

      L.control.layers(baselayers, overlayMaps).addTo(this.map);
      L.control.scale({ imperial: false }).addTo(this.map);

      // FULLSCREEN
      this.map.addControl(new window.L.Control.Fullscreen());

      //LAYERS CHANGED
      this.map.on("baselayerchange", this.handleLayerChange);

      //ZOOM ACTIVATED
      this.map.on("zoomend", event => (this.zoom = event.target._zoom));

      if (this.areLocationsSet) this.setMarkers(this.locations);
      else if (this.isPolygonSet) this.setPolygon(this.polygon);
    },

    handleLayerChange(event) {
      this.tileProviders.forEach(tile => {
        if (tile.name === event.name) {
          if (event.target._zoom < tile.minZoom) {
            this.map.setView(this.center, tile.minZoom);
          }
          this.map.options.minZoom = tile.minZoom;
          this.map.options.maxZoom = tile.maxZoom;
        }
      });

      if (event.name && event.name === "Maaameti fotokaart") {
        console.log(this.overlayMaps[0].leafletObject);
        this.map.addLayer(this.overlayMaps[0].leafletObject);
        document.querySelector(
          "#map > div.leaflet-control-container > div.leaflet-top.leaflet-right > div > section > div.leaflet-control-layers-overlays > label > div > input"
        ).checked = true;
      } else {
        this.map.removeLayer(this.overlayMaps[0].leafletObject);
        document.querySelector(
          "#map > div.leaflet-control-container > div.leaflet-top.leaflet-right > div > section > div.leaflet-control-layers-overlays > label > div > input"
        ).checked = false;
      }
    },

    setMarkers(locations) {
      this.markers = [];

      locations.forEach(entity => {
        let marker = L.marker(
          {
            lat: parseFloat(entity.lat),
            lng: parseFloat(entity.lng)
          },
          { icon: this.markerIcon }
        ).addTo(this.map);
        if (entity.id)
          marker.on("click", () =>
            window.open(
              this.getGeocollectionsUrl({
                object: "locality",
                id: entity.id
              }),
              "GeocollectionsWindow"
            )
          );
        marker.bindTooltip(entity.name, {
          permanent: true,
          direction: "right",
          offset: [10, -23]
        });
        this.markers.push(marker);
      });
      let bounds = new L.featureGroup(this.markers).getBounds();
      this.map.fitBounds(bounds, { maxZoom: 10 });
    },

    setPolygon(arrayOfPoints) {
      if (arrayOfPoints && arrayOfPoints.length > 0) {
        let listOfPolygons = [];
        arrayOfPoints.forEach(polygon => {
          if (polygon && polygon.polygon && polygon.polygon.length > 0) {
            listOfPolygons.push(polygon.polygon);
          }
        });

        if (listOfPolygons.length > 0) {
          let polygons = L.polygon(listOfPolygons, { color: "#D32F2F" }).addTo(
            this.map
          );
          this.map.fitBounds(polygons.getBounds());
        }
      }
    },

    getGeocollectionsUrl(params) {
      if (params && params.object && params.id) {
        return `https://geocollections.info/${params.object}/${params.id}`;
      }
    },

    /* Code from:  http://www.maaamet.ee/rr/geo-lest/files/geo-lest_function_php.txt */
    geoToLest(north, east) {
      let LAT = north * (Math.PI / 180);
      let LON = east * (Math.PI / 180);
      let a = 6378137.0;
      let F = 298.257222100883;
      let RF = F;
      F = 1 / F;
      let B0 = (57.0 + 31.0 / 60.0 + 3.194148 / 3600.0) * (Math.PI / 180);
      let L0 = 24.0 * (Math.PI / 180);
      let FN = 6375000.0;
      let FE = 500000.0;
      let B1 = (59.0 + 20.0 / 60.0) * (Math.PI / 180);
      let B2 = 58.0 * (Math.PI / 180);
      let f1 = 1 / RF;
      let er = 2.0 * f1 - f1 * f1;
      let e = Math.sqrt(er);
      let t1 = Math.sqrt(
        ((1.0 - Math.sin(B1)) / (1.0 + Math.sin(B1))) *
          Math.pow((1.0 + e * Math.sin(B1)) / (1.0 - e * Math.sin(B1)), e)
      );
      let t2 = Math.sqrt(
        ((1.0 - Math.sin(B2)) / (1.0 + Math.sin(B2))) *
          Math.pow((1.0 + e * Math.sin(B2)) / (1.0 - e * Math.sin(B2)), e)
      );
      let t0 = Math.sqrt(
        ((1.0 - Math.sin(B0)) / (1.0 + Math.sin(B0))) *
          Math.pow((1.0 + e * Math.sin(B0)) / (1.0 - e * Math.sin(B0)), e)
      );
      let t = Math.sqrt(
        ((1.0 - Math.sin(LAT)) / (1.0 + Math.sin(LAT))) *
          Math.pow((1.0 + e * Math.sin(LAT)) / (1.0 - e * Math.sin(LAT)), e)
      );
      let m1 =
        Math.cos(B1) / Math.pow(1.0 - er * Math.sin(B1) * Math.sin(B1), 0.5);
      let m2 =
        Math.cos(B2) / Math.pow(1.0 - er * Math.sin(B2) * Math.sin(B2), 0.5);
      let n = (Math.log(m1) - Math.log(m2)) / (Math.log(t1) - Math.log(t2));
      let FF = m1 / (n * Math.pow(t1, n));
      let p0 = a * FF * Math.pow(t0, n);
      let FII = n * (LON - L0);
      let p = a * FF * Math.pow(t, n);
      n = p0 - p * Math.cos(FII) + FN;
      e = p * Math.sin(FII) + FE;

      return [n, e];
    }
  }
};
</script>

<style scoped>
#map >>> .map-marker:hover {
  opacity: 0.7;
}

#map >>> .leaflet-control-zoom > a {
  color: #D32F2F;
}

#map >>> .leaflet-control-zoom > a:hover {
  color: #000000;
}

#map >>> .leaflet-control-attribution > a {
  color: #D32F2F;
}
</style>
