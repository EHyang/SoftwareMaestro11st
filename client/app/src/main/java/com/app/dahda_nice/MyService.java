package com.app.dahda_nice;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothManager;
import android.bluetooth.le.BluetoothLeScanner;
import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanFilter;
import android.bluetooth.le.ScanResult;
import android.bluetooth.le.ScanSettings;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;
import android.os.ParcelUuid;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import java.util.ArrayList;


public class MyService extends Service {

    private boolean hwang;


    private BluetoothAdapter bluetoothAdapter;

    private BluetoothLeScanner bluetoothLeScanner;
    private ScanCallback scanCallback;

    private Handler handler;

    public static String mykey;

    @Override
    public void onCreate() {
        Log.d("Service 333!! Create", " Service Create");

        handler = new Handler();

        final BluetoothManager bluetoothManager =
                (BluetoothManager) getSystemService(Context.BLUETOOTH_SERVICE);

        bluetoothAdapter = bluetoothManager.getAdapter();

        bluetoothLeScanner = bluetoothAdapter.getBluetoothLeScanner();


    }


    @Override
    public void onDestroy() {
        Log.d("Service Destroy", "Service Destroy!!!!");

    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }


    void startForegroundService() {
        Intent notificationIntent = new Intent(this, GeneralUser.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, notificationIntent, 0);


        NotificationCompat.Builder builder;
        if (Build.VERSION.SDK_INT >= 26) {
            String CHANNEL_ID = "hwang service channel";
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID,
                    "hwang service channel",
                    NotificationManager.IMPORTANCE_DEFAULT);

            ((NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE))
                    .createNotificationChannel(channel);

            builder = new NotificationCompat.Builder(this, CHANNEL_ID);
        } else {
            builder = new NotificationCompat.Builder(this);
        }
        builder.setSmallIcon(R.mipmap.ic_launcher)
                .setContent(null)
                .setContentIntent(pendingIntent);

        startForeground(1, builder.build());
    }


    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d("StartCommand", "StartCommand!!!!!!!!!!");
        startForegroundService();

        mykey = intent.getStringExtra("mykey");

        scanLeDevice(true);

        return START_REDELIVER_INTENT;
    }

    private void scanLeDevice(final boolean enable) {
        Log.d("스캔하고 있니 진짜로??!!!?","엄 화나네");
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
                    }, 5000);
                }
            }, 5000);

            hwang = true;

            ScanSettings.Builder settingsBuilder = new ScanSettings.Builder();
            settingsBuilder.setScanMode(ScanSettings.SCAN_MODE_LOW_POWER);
            ScanSettings scanSettings = settingsBuilder.build();


            scanCallback = new SampleScanCallback();
            bluetoothLeScanner.startScan(new ArrayList<ScanFilter>(), scanSettings, scanCallback);
            Log.d("hwanghwang!!","fjfj");

        } else {
            hwang = false;
            bluetoothLeScanner.stopScan(scanCallback);
        }
    }


}



