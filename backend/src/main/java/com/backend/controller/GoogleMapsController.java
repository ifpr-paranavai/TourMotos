package com.backend.controller;

import com.backend.service.GoogleMaps.GoogleMapsService;
import com.google.maps.errors.ApiException;
import com.google.maps.model.Bounds;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/maps")
@RequiredArgsConstructor
@CrossOrigin()
public class GoogleMapsController {

    private final GoogleMapsService googleMapsService;

    @GetMapping("/coordenada")
    public Bounds coordenada() throws IOException, InterruptedException, ApiException {
        return googleMapsService.coordenada();
    }
}
