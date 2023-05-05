package com.backend.service.GoogleMaps;

import com.google.maps.DirectionsApi;
import com.google.maps.GeoApiContext;
import com.google.maps.errors.ApiException;
import com.google.maps.model.Bounds;
import com.google.maps.model.DirectionsResult;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.IOException;

@Service
public class GoogleMapsServiceImpl implements GoogleMapsService {

    @Value("${google.maps.apikey}")
    private String apiKey;

    @GetMapping("/coordenada")
    public Bounds coordenada() throws IOException, InterruptedException, ApiException {
        GeoApiContext context = new GeoApiContext.Builder()
                .apiKey(apiKey)
                .build();

        DirectionsResult result = DirectionsApi.newRequest(context)
                .origin("Chicago, IL")
                .destination("Los Angeles, CA")
                .await();

        // coordenadas bounds
        return result.routes[0].bounds;
    }
}
