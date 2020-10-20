package com.app.dahda_nice;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothManager;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.sqlite.SQLiteDatabase;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;


public class GeneralUser extends AppCompatActivity {


    private final String dbName = "Dahda";

    String[] permissions = new String[]{Manifest.permission.ACCESS_COARSE_LOCATION, Manifest.permission.ACCESS_FINE_LOCATION};
    private BluetoothAdapter bluetoothAdapter;
    private static final int REQUEST_ENABLE_BT = 101;
    private static final int REQUEST_PERMISSION = 102;
    private static final int REQUEST_LOCATION_PERMISSION = 103;

    public static String mykey;


    static Database database;
    static DatabaseControl databaseControl;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_general_user);

        database = new Database(this, "Dahda", null, 1);
        databaseControl = new DatabaseControl(database);
        databaseControl.delete();




        Intent intent = getIntent();
        mykey = intent.getStringExtra("mykey");


        requestPermission();


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
            ActivityCompat.requestPermissions(this, permissions, REQUEST_PERMISSION);

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

        Intent intent = new Intent(getApplicationContext(), BackgroundService.class);
        Log.d("User!!!", mykey + "plz");
        intent.putExtra("mykey", mykey);


        if (Build.VERSION.SDK_INT >= 26) {
            Log.d("SDK_INT >= 26", "Start ForegroundService");
            getApplicationContext().startForegroundService(intent);
        } else {
            Log.d("SDK_INT < 26", "Start Service");
            startService(intent);

        }
    }

    public static void sendDatabase(String data, String getTime, String aLatitude, String aLongitude) {

        Log.d("null Check22", data + ", " + getTime + ", " + aLatitude + ", " + aLongitude);

        databaseControl.select(data, getTime, aLatitude, aLongitude);
//        if (data != null && getTime != null && aLatitude != null && aLongitude != null) {
//            Log.d("null Check33", data + ", " + getTime + ", " + aLatitude + ", " + aLongitude);
//            databaseControl.select(data, getTime, aLatitude, aLongitude);
//        }

    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == REQUEST_ENABLE_BT) {
            requestPermission();
        }


    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        databaseControl.delete();
        databaseControl.dbclose();
    }
}