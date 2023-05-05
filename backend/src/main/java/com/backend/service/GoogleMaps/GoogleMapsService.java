package com.backend.service.GoogleMaps;

import com.google.maps.errors.ApiException;
import com.google.maps.model.Bounds;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public interface GoogleMapsService {

    Bounds coordenada() throws IOException, InterruptedException, ApiException;

}
