package com.app.dahda_nice;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

public class Clinic extends AppCompatActivity {
    private GoogleMap mgoogleMap;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_clinic);

        SupportMapFragment supportMapFragment = (SupportMapFragment) getSupportFragmentManager().findFragmentById(R.id.map);
        supportMapFragment.getMapAsync((OnMapReadyCallback) this);


    }



    @Override
    public void onMapReady(final GoogleMap googleMap) {
        mgoogleMap = googleMap;

        final LatLng Pocheon = new LatLng(37.894936, 127.200344);   // 마커 추가

        MarkerOptions markerOptions = new MarkerOptions();
        markerOptions.position(Pocheon);
        markerOptions.title("포천시청");                                    // 마커 옵션 추가
        googleMap.addMarker(markerOptions);                                 // 마커 등록

        googleMap.setOnMapLoadedCallback(new GoogleMap.OnMapLoadedCallback() {
            @Override
            public void onMapLoaded() {
                mgoogleMap.moveCamera(CameraUpdateFactory.newLatLng(Pocheon));
                mgoogleMap.animateCamera(CameraUpdateFactory.zoomTo(10));
            }
        }); // 구글맵 로딩이 완료되면 카메라 위치 조정
    }
}