package com.app.dahda_nice;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothManager;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;


public class MyService extends Service {

    private boolean hwang;


    private BluetoothAdapter bluetoothAdapter;
    private BluetoothAdapter.LeScanCallback leScanCallback;

    private Handler handler;

    @Override
    public void onCreate() {
        Log.d("Service 333!! Create", " Service Create");

        handler = new Handler();

        final BluetoothManager bluetoothManager =
                (BluetoothManager) getSystemService(Context.BLUETOOTH_SERVICE);

        bluetoothAdapter = bluetoothManager.getAdapter();

        leScanCallback = new BluetoothAdapter.LeScanCallback() {
            @Override
            public void onLeScan(BluetoothDevice device, int rssi, byte[] scanRecord) {
                Intent intent = new Intent(getApplicationContext(),GeneralUser.class);

                Log.d("!!!!!!!!!flkwejfklw!","device name: ----> "+ device.getAddress());


                intent.putExtra("device",device.getAddress());
                startActivity(intent);


            }
        };




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


    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d("StartCommand", "StartCommand!!!!!!!!!!");
        startForegroundService();

        scanLeDevice(true);

        return START_REDELIVER_INTENT;
    }

    private void scanLeDevice(final boolean enable) {
        if (enable) {
            // Stops scanning after a pre-defined scan period.
            handler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    hwang = false;
                    bluetoothAdapter.stopLeScan(leScanCallback);
                    handler.postDelayed(new Runnable() {
                        @Override
                        public void run() {
                            scanLeDevice(true);
                        }
                    }, 60000);
                }
            }, 10000);

            hwang = true;

            bluetoothAdapter.startLeScan(leScanCallback);


        } else {
            hwang = false;
            bluetoothAdapter.stopLeScan(leScanCallback);
        }
    }

    @Override
    public void onDestroy() {
        Log.d("Service Destroy", "Service Destroy!!!!");

    }



}
