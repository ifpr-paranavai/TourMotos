package com.backend.service.GoogleMaps;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GoogleMapsService {

    @Value("${google.maps.apikey}")
    private String apiKey;

    public void searchPlaces() {
        // Use a variável apiKey para fazer solicitações à API do Google Maps
    }

}
