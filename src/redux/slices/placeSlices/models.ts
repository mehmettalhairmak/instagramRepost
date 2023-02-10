export interface Places {
  type: string;
  features: Place[];
}

export interface Place {
  type: string;
  id: string;
  geometry: {
    type: string;
    coordinates: Array<number>;
  };
  properties: PlaceProperty;
}

export interface PlaceProperty {
  xid: string;
  name: string;
  dist: number;
  rate: number;
  osm: string;
  wikidata: string;
  kinds: number;
}
