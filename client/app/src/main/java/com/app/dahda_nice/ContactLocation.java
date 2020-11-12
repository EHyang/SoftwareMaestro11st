package com.app.dahda_nice;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Context;
import android.location.Location;
import android.os.Bundle;
import android.util.Log;
import android.util.TypedValue;
import android.view.View;
import android.widget.Button;
import android.widget.RelativeLayout;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapFragment;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.UiSettings;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

public class ContactLocation extends AppCompatActivity implements OnMapReadyCallback {


    private GoogleMap mgoogleMap;

    private LatLng MyLocation;


    Context context;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contact_location);

        context = this;

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

        MyLocation = new LatLng(37.5428047, 127.0710675);

        MarkerOptions markerOptions = new MarkerOptions();

        markerOptions.position(new LatLng(37.5428047, 127.0710675)).
                title("접촉 위치").snippet("2020년 11월 11일 이 위치에서 접촉");
        mgoogleMap.addMarker(markerOptions);


        mgoogleMap.setOnMapLoadedCallback(new GoogleMap.OnMapLoadedCallback() {
            @Override
            public void onMapLoaded() {

                mgoogleMap.moveCamera(CameraUpdateFactory.newLatLng(MyLocation));
                mgoogleMap.animateCamera(CameraUpdateFactory.zoomTo((float) 10));

            }
        });

    }


//    private void location(double latitude, double longitude) {
//
//        if (latitude != 0 && longitude != 0) {
//            Log.d("여기로 들어갔나?", "여기맞아?");
//            MyLocation = new LatLng(latitude, longitude);
//        } else {
//            MyLocation = new LatLng(37.5642135, 127.0016985);
//            Log.d("여기로 들어갔나?", "여기맞아?222");
//        }
//
//
//    }


}