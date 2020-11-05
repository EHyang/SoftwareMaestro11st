package com.app.dahda_nice;


import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

public class Clinic extends AppCompatActivity implements OnMapReadyCallback {

    private GoogleMap mgoogleMap;

    static double latitude = 0;
    static double longitude = 0;
    private LatLng MyLocation;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_clinic);

        Button button = findViewById(R.id.button);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
        SupportMapFragment supportMapFragment = (SupportMapFragment) getSupportFragmentManager().findFragmentById(R.id.map);
        supportMapFragment.getMapAsync(this);

    }


    @Override
    public void onMapReady(final GoogleMap googleMap) {
        mgoogleMap = googleMap;

        location(latitude, longitude);

        MarkerOptions markerOptions = new MarkerOptions();
        markerOptions.position(MyLocation);
        markerOptions.title("남궁 황");
        googleMap.addMarker(markerOptions);

        googleMap.setOnMapLoadedCallback(new GoogleMap.OnMapLoadedCallback() {
            @Override
            public void onMapLoaded() {
                mgoogleMap.moveCamera(CameraUpdateFactory.newLatLng(MyLocation));
                mgoogleMap.animateCamera(CameraUpdateFactory.zoomTo(10));
            }
        });
    }


    private void location(double latitude, double longitude) {

        if (latitude != 0 && longitude != 0) {
            Log.d("여기로 들어갔나?", "여기맞아?");
            MyLocation = new LatLng(latitude, longitude);
        } else {
            MyLocation = new LatLng(37.5642135, 127.0016985);
            Log.d("여기로 들어갔나?", "여기맞아?222");
        }


    }
}