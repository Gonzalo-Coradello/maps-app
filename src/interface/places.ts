export interface PlacesResponse {
    type:        string;
    query:       string[];
    features:    Feature[];
    attribution: string;
}

export interface Feature {
    id:         string;
    type:       string;
    place_type: string[];
    relevance:  number;
    properties: Properties;
    text:       string;
    place_name: string;
    center:     number[];
    geometry:   Geometry;
    address:    string;
    context:    Context[];
}

export interface Context {
    id:          string;
    mapbox_id?:  string;
    text:        string;
    wikidata?:   string;
    short_code?: ShortCode;
}

export enum ShortCode {
    Ar = "ar",
    ArB = "AR-B",
    ArS = "AR-S",
}

export interface Geometry {
    type:          string;
    coordinates:   number[];
    interpolated?: boolean;
    omitted?:      boolean;
}

export interface Properties {
    accuracy:             string;
    "override:postcode"?: string;
    mapbox_id:            string;
}
