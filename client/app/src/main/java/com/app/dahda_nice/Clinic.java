package com.app.dahda_nice;


import android.content.Context;
import android.content.DialogInterface;
import android.location.Location;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AlertDialog;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.maps.CameraUpdate;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.maps.android.clustering.Cluster;
import com.google.maps.android.clustering.ClusterManager;

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


    Context context;
    ClusterManager<ClusterData> clusterManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_clinic);
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



        location(latitude, longitude);

//        MarkerOptions markerOptions = new MarkerOptions();
//        markerOptions.position(new LatLng(latitude, longitude));
//
//
//        mgoogleMap.addMarker(markerOptions);


//        for (int i = 0; i < GeneralUser.arrayList.size(); i++) {
//            MarkerOptions markerOption = new MarkerOptions();
//            markerOption.position(new LatLng(GeneralUser.arrayList.get(i).getY(), GeneralUser.arrayList.get(i).getX()))
//                    .title(GeneralUser.arrayList.get(i).getName())
//                    .snippet("전화번호: " + GeneralUser.arrayList.get(i).getPhone());
//
//            mgoogleMap.addMarker(markerOption);
//        }


        clusterManager = new ClusterManager<>(context,mgoogleMap);

        mgoogleMap.setOnMapLoadedCallback(new GoogleMap.OnMapLoadedCallback() {
            @Override
            public void onMapLoaded() {

                mgoogleMap.moveCamera(CameraUpdateFactory.newLatLng(MyLocation));
                mgoogleMap.animateCamera(CameraUpdateFactory.zoomTo(10));
            }
        });

        mgoogleMap.setOnCameraIdleListener(clusterManager);
        mgoogleMap.setOnMarkerClickListener(clusterManager);



        for(int i=0; i<ClinicDataCon.arrayList.size(); i++) {
            ClusterData clusterData = new ClusterData(ClinicDataCon.arrayList.get(i).getY(),
                    ClinicDataCon.arrayList.get(i).getX(), ClinicDataCon.arrayList.get(i).getName());
            clusterManager.addItem(clusterData);
        }

        mgoogleMap.setOnInfoWindowClickListener(new GoogleMap.OnInfoWindowClickListener() {
            @Override
            public void onInfoWindowClick(Marker marker) {
                String marker_number;
                int check = 0;

                for (int i = 0; i < ClinicDataCon.arrayList.size(); i++) {
                    if (ClinicDataCon.arrayList.get(i).findIndex(marker.getTitle()) != null) {
                        marker_number = ClinicDataCon.arrayList.get(i).findIndex(marker.getTitle());
                        check = i;
                        break;
                    }
                }

                AlertDialog.Builder builder = new AlertDialog.Builder(context);
                builder.setTitle("병원정보");
                builder.setMessage(
                        "이름 : " + ClinicDataCon.arrayList.get(check).getName() +
                                "\n전화번호 : " + ClinicDataCon.arrayList.get(check).getPhone()
                );

                builder.setPositiveButton("확인", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {

                    }
                });

                AlertDialog alertDialog = builder.create();
                alertDialog.show();

            }
        });

        clusterManager.setOnClusterClickListener(new ClusterManager.OnClusterClickListener<ClusterData>() {
            @Override
            public boolean onClusterClick(Cluster<ClusterData> cluster) {
                LatLng latLng = new LatLng(cluster.getPosition().latitude,cluster.getPosition().longitude);
                CameraUpdate cameraUpdate = CameraUpdateFactory.newLatLng(latLng);
                mgoogleMap.moveCamera(cameraUpdate);

                return false;
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