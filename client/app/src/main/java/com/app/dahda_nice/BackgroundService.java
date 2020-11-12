package com.app.dahda_nice;

import android.Manifest;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothManager;
import android.bluetooth.le.AdvertiseCallback;
import android.bluetooth.le.AdvertiseData;
import android.bluetooth.le.AdvertiseSettings;
import android.bluetooth.le.BluetoothLeAdvertiser;
import android.bluetooth.le.BluetoothLeScanner;
import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanFilter;
import android.bluetooth.le.ScanSettings;
import android.content.Context;
import android.content.Intent;
import android.content.IntentSender;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.google.android.gms.common.api.ResolvableApiException;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.LocationSettingsRequest;
import com.google.android.gms.location.LocationSettingsResponse;
import com.google.android.gms.location.SettingsClient;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;


import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

public class BackgroundService extends Service implements LocationListener {

    private static final String TAG = BackgroundService.class.getSimpleName();

    private static final int FOREGROUND_NOTIFICATION_ID = 1;

    public static boolean running = false;

    public static final String ADVERTISING_FAILED =
            "com.example.android.bluetoothadvertisements.advertising_failed";

    public static final String ADVERTISING_FAILED_EXTRA_CODE = "failureCode";

    public static final int ADVERTISING_TIMED_OUT = 6;

    private BluetoothLeAdvertiser mBluetoothLeAdvertiser;

    private AdvertiseCallback mAdvertiseCallback;

    private Handler mHandler;

    private Runnable timeoutRunnable;

    /**
     * 블루투스 스캔 부분
     */
    private boolean hwang;

    private BluetoothAdapter bluetoothAdapter;

    private BluetoothLeScanner bluetoothLeScanner;
    private ScanCallback scanCallback;

    private Handler handler;

    SendTest sendTest = new SendTest();
//    GeneralUser generalUser = new GeneralUser();

    /**
     * Length of time to allow advertising before automatically shutting off. (10 minutes)
     */
    private long TIMEOUT = TimeUnit.MILLISECONDS.convert(10, TimeUnit.MINUTES);

    public static String mykey;


    /**
     * 위치 정보 가져오기
     */

    Context mContext;
    Location location;
    double latitude;
    double longitude;


    private static final long MIN_DISTANCE_CHANGE_FOR_UPDATES = 0;
    private static final long MIN_TIME_BW_UPDATES = 5000;


    private static final long UPDATE_INTERVAL_IN_MILLISECONDS = 3000;
    private FusedLocationProviderClient mFusedLocationClient;
    private LocationRequest locationRequest;
    private LocationSettingsRequest locationSettingsRequest;


    @Override
    public void onCreate() {

        super.onCreate();

        Log.d("Service !! Create", " Service Create");

        initData();
        handler = new Handler();

        final BluetoothManager bluetoothManager =
                (BluetoothManager) getSystemService(Context.BLUETOOTH_SERVICE);

        bluetoothAdapter = bluetoothManager.getAdapter();

        bluetoothLeScanner = bluetoothAdapter.getBluetoothLeScanner();

    }

    @Override
    public void onDestroy() {

        running = false;
        stopAdvertising();
        mHandler.removeCallbacks(timeoutRunnable);
        stopForeground(true);
        super.onDestroy();
    }


    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }


    private void initialize() {
        if (mBluetoothLeAdvertiser == null) {
            BluetoothManager mBluetoothManager = (BluetoothManager) getSystemService(Context.BLUETOOTH_SERVICE);
            if (mBluetoothManager != null) {
                BluetoothAdapter mBluetoothAdapter = mBluetoothManager.getAdapter();
                if (mBluetoothAdapter != null) {
                    mBluetoothLeAdvertiser = mBluetoothAdapter.getBluetoothLeAdvertiser();
                }

            }
        }

    }


    private void setTimeout() {
        mHandler = new Handler();
        timeoutRunnable = new Runnable() {
            @Override
            public void run() {
                Log.d(TAG, "AdvertiserService has reached timeout of " + TIMEOUT + " milliseconds, stopping advertising.");
                sendFailureIntent(ADVERTISING_TIMED_OUT);
                stopSelf();
            }
        };
        mHandler.postDelayed(timeoutRunnable, TIMEOUT);
    }


    private void startAdvertising() {
        goForeground();

        Log.d(TAG, "Service: Starting Advertising");

        if (mAdvertiseCallback == null) {
            AdvertiseSettings settings = buildAdvertiseSettings();
            AdvertiseData data = buildAdvertiseData();
            mAdvertiseCallback = new SampleAdvertiseCallback();

            if (mBluetoothLeAdvertiser != null) {
                mBluetoothLeAdvertiser.startAdvertising(settings, data,
                        mAdvertiseCallback);
            }
        }
    }

    private void goForeground() {
//        Intent notificationIntent = new Intent(this, GeneralUser.class);
//        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0,
//                notificationIntent, 0);

        String channelId = "com.codechacha.sample1";
        String channelName = "Dahda Application";

        Notification n;
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationChannel channel = new NotificationChannel(
                    channelId, channelName,
                    NotificationManager.IMPORTANCE_DEFAULT
            );
            NotificationManager manager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            manager.createNotificationChannel(channel);

            n = new Notification.Builder(this, channelId)
                    .setContentTitle("Dahda Application")
                    .setContentText("<남궁황, 김태양, 이현우>")
                    .setSmallIcon(R.drawable.number6)
//                    .setContentIntent(pendingIntent)
                    .build();
        } else {
            n = new Notification.Builder(this)
                    .setContentTitle("Advertising device via Bluetooth")
                    .setContentText("This device is discoverable to others nearby.")
                    .setSmallIcon(R.drawable.number6)
//                    .setContentIntent(pendingIntent)
                    .build();
        }

        startForeground(FOREGROUND_NOTIFICATION_ID, n);


    }


    private void stopAdvertising() {
        Log.d(TAG, "Service: Stopping Advertising");
        if (mBluetoothLeAdvertiser != null) {
            mBluetoothLeAdvertiser.stopAdvertising(mAdvertiseCallback);
            mAdvertiseCallback = null;
        }
    }


    private AdvertiseData buildAdvertiseData() {


        AdvertiseData.Builder dataBuilder = new AdvertiseData.Builder();

        String data = mykey;


        dataBuilder.addServiceData(Constants.Service_UUID, data.getBytes(StandardCharsets.UTF_8));


        return dataBuilder.build();

    }


    private AdvertiseSettings buildAdvertiseSettings() {
        AdvertiseSettings.Builder settingsBuilder = new AdvertiseSettings.Builder();
        settingsBuilder.setAdvertiseMode(AdvertiseSettings.ADVERTISE_MODE_LOW_POWER);

        settingsBuilder.setTimeout(0);
        return settingsBuilder.build();
    }


    private class SampleAdvertiseCallback extends AdvertiseCallback {

        @Override
        public void onStartFailure(int errorCode) {
            super.onStartFailure(errorCode);

            Log.d(TAG, "Advertising failed" + errorCode);
            sendFailureIntent(errorCode);
            stopSelf();

        }

        @Override
        public void onStartSuccess(AdvertiseSettings settingsInEffect) {
            super.onStartSuccess(settingsInEffect);
            Log.d(TAG, "Advertising successfully started");
        }

    }

    private void sendFailureIntent(int errorCode) {
        Intent failureIntent = new Intent();
        failureIntent.setAction(ADVERTISING_FAILED);
        failureIntent.putExtra(ADVERTISING_FAILED_EXTRA_CODE, errorCode);
        sendBroadcast(failureIntent);
    }


    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d("AdvertiseService in??", " in? " + intent.getStringExtra("mykey"));
        mykey = intent.getStringExtra("mykey");

        if (intent == null) {
            return Service.START_STICKY;
        } else {
//            mykey = intent.getStringExtra("mykey");

            running = true;
            initialize();
            startAdvertising();
            setTimeout();
            startLocationUpdates();
            scanLeDevice(true);
        }

        return super.onStartCommand(intent, flags, startId);
    }

    private LocationCallback locationCallback = new LocationCallback() {
        @Override
        public void onLocationResult(LocationResult locationResult) {
            super.onLocationResult(locationResult);

            Location currentLocation = locationResult.getLastLocation();
            Clinic.latitude = currentLocation.getLatitude();
            Clinic.longitude = currentLocation.getLongitude();
            String latitude = String.valueOf(currentLocation.getLatitude());
            String longitude = String.valueOf(currentLocation.getLongitude());
            SendTest.aLongitude = longitude;
            SendTest.aLatitude = latitude;


            Log.d("Locations", currentLocation.getLatitude() + "," + currentLocation.getLongitude());
            //Share/Publish Location
        }
    };

    private void startLocationUpdates() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            return;
        }
        mFusedLocationClient.requestLocationUpdates(this.locationRequest,
                this.locationCallback, Looper.myLooper());
    }

    private void initData() {

        locationRequest = LocationRequest.create();
        locationRequest.setInterval(UPDATE_INTERVAL_IN_MILLISECONDS);
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);

        mFusedLocationClient =
                LocationServices.getFusedLocationProviderClient(getApplicationContext());

    }

    private void scanLeDevice(final boolean enable) {
        Log.d("scanLeDevice Check", "Check");
        if (enable) {
            // Stops scanning after a pre-defined scan period.
            handler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    hwang = false;
                    bluetoothLeScanner.stopScan(scanCallback);
                    handler.postDelayed(new Runnable() {
                        @Override
                        public void run() {
                            scanLeDevice(true);
                        }
                    }, 15000);
                }
            }, 3000);

            hwang = true;

            ScanSettings.Builder settingsBuilder = new ScanSettings.Builder();
            settingsBuilder.setScanMode(ScanSettings.SCAN_MODE_LOW_POWER);
            ScanSettings scanSettings = settingsBuilder.build();


            scanCallback = new SampleScanCallback();
            bluetoothLeScanner.startScan(new ArrayList<ScanFilter>(), scanSettings, scanCallback);


        } else {
            hwang = false;
            bluetoothLeScanner.stopScan(scanCallback);
        }
    }

    @Override
    public void onLocationChanged(Location location) {

    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {

    }

    @Override
    public void onProviderEnabled(String provider) {

    }

    @Override
    public void onProviderDisabled(String provider) {

    }
}
