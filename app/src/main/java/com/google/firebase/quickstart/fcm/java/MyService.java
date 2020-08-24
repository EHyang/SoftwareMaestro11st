package com.google.firebase.quickstart.fcm.java;

import android.app.Service;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.IBinder;
import android.os.TokenWatcher;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

public class MyService extends Service {
    @Override
    public void onCreate() {
        super.onCreate();
        Log.d("ServiceOncreate","ServiceOncreate!!");
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d("서비스로 들어왔지롱!!", "서비스로 들어왔다리!! 33");

        return super.onStartCommand(intent, flags, startId);
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;


    }
}
