package com.app.dahda_nice;


import android.location.Location;
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
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

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
    public void onMapReady(GoogleMap googleMap) {


        mgoogleMap = googleMap;

        location(latitude, longitude);

        MarkerOptions markerOptions = new MarkerOptions();
        markerOptions.position(new LatLng(latitude, longitude));


        mgoogleMap.addMarker(markerOptions);


        for (int i = 0; i < GeneralUser.arrayList.size(); i++) {
            MarkerOptions markerOption = new MarkerOptions();
            markerOption.position(new LatLng(GeneralUser.arrayList.get(i).getY(), GeneralUser.arrayList.get(i).getX()))
                    .title(GeneralUser.arrayList.get(i).getName())
                    .snippet("전화번호: "+GeneralUser.arrayList.get(i).getPhone());

            mgoogleMap.addMarker(markerOption);
        }


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