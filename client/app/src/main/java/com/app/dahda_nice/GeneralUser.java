package com.app.dahda_nice;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import android.Manifest;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothManager;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.location.Location;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;


public class GeneralUser extends AppCompatActivity {


    String[] permissions = new String[]{Manifest.permission.ACCESS_COARSE_LOCATION, Manifest.permission.ACCESS_FINE_LOCATION};
    private BluetoothAdapter bluetoothAdapter;
    private static final int REQUEST_ENABLE_BT = 101;
    private static final int REQUEST_PERMISSION = 102;
    private static final int REQUEST_LOCATION_PERMISSION = 103;

    public static String mykey;

    private BroadcastReceiver broadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            String latitude = intent.getStringExtra("latitude");
            String longitude = intent.getStringExtra("longitude");

            Log.d("Check Receicer", latitude + " /// " + longitude);

        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_general_user);

        Intent intent = getIntent();
        mykey = intent.getStringExtra("mykey");


        requestPermission();


        LocalBroadcastManager.getInstance(this).registerReceiver(broadcastReceiver,
                new IntentFilter("location"));


        ImageView imageView = findViewById(R.id.gogogo);

        imageView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getApplicationContext(), gogogo.class);
                intent.putExtra("mykey", mykey);
                startActivity(intent);
            }
        });


        if (!getPackageManager().hasSystemFeature(PackageManager.FEATURE_BLUETOOTH) ||
                !getPackageManager().hasSystemFeature(PackageManager.FEATURE_BLUETOOTH_LE)) {
            Toast.makeText(this, "Bluetooth is not supported", Toast.LENGTH_LONG).show();
            finish();
        }

        final BluetoothManager bluetoothManager =
                (BluetoothManager) getSystemService(Context.BLUETOOTH_SERVICE);

        bluetoothAdapter = bluetoothManager.getAdapter();


    }


    @Override
    public void onResume() {
        super.onResume();

        if (bluetoothAdapter == null || !bluetoothAdapter.isEnabled()) {
            Intent enableBtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
            startActivityForResult(enableBtIntent, REQUEST_ENABLE_BT);
        } else {
            requestPermission();
        }

        requestPermission();


    }


    @Override
    public void onPause() {
        super.onPause();
    }


    private void requestPermission() {
        Log.d("requestPermission", "퍼미션 요청");


        String requestPermissions[] = new String[permissions.length];
        int index = -1;
        for (int i = 0; i < permissions.length; i++) {
            if (ContextCompat.checkSelfPermission(this, permissions[i]) != PackageManager.PERMISSION_GRANTED) {
                requestPermissions[++index] = permissions[i];
            }
        }
        if (index != -1) {
            ActivityCompat.requestPermissions(this, requestPermissions, REQUEST_PERMISSION);
        } else {
            scanLeDevice(true);
        }


    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        int check = 0;

        for (int i = 0; i < permissions.length; i++) {
            if (requestCode == REQUEST_PERMISSION && grantResults[i] == PackageManager.PERMISSION_GRANTED) {
                check++;
            }
        }

        if (check == permissions.length) {
            scanLeDevice(true);
        } else {
            requestPermission();
        }


    }

    private void scanLeDevice(boolean b) {

        Intent advertise = new Intent(getApplicationContext(), AdvertiserService.class);
        Log.d("User!!!", mykey + "plz");
        advertise.putExtra("mykey", mykey);

        Intent intent = new Intent(getApplicationContext(), MyService.class);
        intent.putExtra("mykey", mykey);

        Intent intentLocation = new Intent(getApplicationContext(), LocationInfo.class);
        Log.d("LocationServiceCheck!", "ForegroundS");

        if (Build.VERSION.SDK_INT >= 26) {
            Log.d("SDK_INT >= 26", "Start ForegroundService");
            getApplicationContext().startForegroundService(advertise);
            getApplicationContext().startForegroundService(intent);
            getApplicationContext().startForegroundService(intentLocation);
        } else {
            Log.d("SDK_INT < 26", "Start Service");
            startService(intent);
            startService(advertise);
            startService(intentLocation);

        }
    }


    public void location(String time) {

        String getTime = time;
        Log.d("스캔했을 때 위치정보가져오는 메서드", getTime);

        Intent intent = new Intent(getApplicationContext(), LocationInfo.class);
        intent.putExtra("location", 900);



    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == REQUEST_ENABLE_BT) {
            requestPermission();
        }


    }
}