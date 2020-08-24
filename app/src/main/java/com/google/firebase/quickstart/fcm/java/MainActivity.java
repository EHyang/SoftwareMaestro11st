/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.google.firebase.quickstart.fcm.java;

import android.Manifest;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothManager;
import android.bluetooth.le.AdvertiseData;
import android.bluetooth.le.AdvertisingSet;
import android.bluetooth.le.AdvertisingSetCallback;
import android.bluetooth.le.AdvertisingSetParameters;
import android.bluetooth.le.BluetoothLeAdvertiser;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.os.ParcelUuid;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.quickstart.fcm.R;
import com.google.firebase.quickstart.fcm.databinding.ActivityMainBinding;
import com.loopj.android.http.RequestParams;

import org.json.JSONException;

import java.util.UUID;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "MainActivity";
    private BluetoothManager bluetoothManager;

    private BluetoothAdapter bluetoothAdapter;
    private static final int REQUEST_ENABLE_BT = 101;
    private static final int REQUEST_PERMISSION = 102;
    private AdvertisingSet currentAdvertisingSet;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ActivityMainBinding binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        if (!getPackageManager().hasSystemFeature(PackageManager.FEATURE_BLUETOOTH) ||
                !getPackageManager().hasSystemFeature(PackageManager.FEATURE_BLUETOOTH_LE)) {
            Toast.makeText(this,"Bluetooth is not supported", Toast.LENGTH_LONG).show();
            finish();
        }

        final BluetoothManager bluetoothManager =
                (BluetoothManager) getSystemService(Context.BLUETOOTH_SERVICE);

        bluetoothAdapter = bluetoothManager.getAdapter();

        Button button = findViewById(R.id.startadvertise);

        button.setOnClickListener(new View.OnClickListener() {
            @RequiresApi(api = Build.VERSION_CODES.O)
            @Override
            public void onClick(View view) {
                requestPermission();
            }
        });


        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            // Create channel to show notifications.
            String channelId  = getString(R.string.default_notification_channel_id);
            String channelName = getString(R.string.default_notification_channel_name);
            NotificationManager notificationManager =
                    getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(new NotificationChannel(channelId,
                    channelName, NotificationManager.IMPORTANCE_LOW));
        }

        // If a notification message is tapped, any data accompanying the notification
        // message is available in the intent extras. In this sample the launcher
        // intent is fired when the notification is tapped, so any accompanying data would
        // be handled here. If you want a different intent fired, set the click_action
        // field of the notification message to the desired intent. The launcher intent
        // is used when no click_action is specified.
        //
        // Handle possible data accompanying notification message.
        // [START handle_data_extras]
        if (getIntent().getExtras() != null) {
            for (String key : getIntent().getExtras().keySet()) {
                Object value = getIntent().getExtras().get(key);
                Log.d(TAG, "Key: " + key + " Value: " + value);
            }
        }
        // [END handle_data_extras]

        binding.subscribeButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.d(TAG, "Subscribing to weather topic");
                // [START subscribe_topics]
                FirebaseMessaging.getInstance().subscribeToTopic("weather")
                        .addOnCompleteListener(new OnCompleteListener<Void>() {
                            @Override
                            public void onComplete(@NonNull Task<Void> task) {
                                String msg = getString(R.string.msg_subscribed);
                                if (!task.isSuccessful()) {
                                    msg = getString(R.string.msg_subscribe_failed);
                                }
                                Log.d(TAG, msg);
                                Toast.makeText(MainActivity.this, msg, Toast.LENGTH_SHORT).show();
                            }
                        });
                // [END subscribe_topics]
            }
        });

        binding.logTokenButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                // Get token
                // [START retrieve_current_token]
                FirebaseInstanceId.getInstance().getInstanceId()
                        .addOnCompleteListener(new OnCompleteListener<InstanceIdResult>() {
                            @Override
                            public void onComplete(@NonNull Task<InstanceIdResult> task) {
                                if (!task.isSuccessful()) {
                                    Log.w(TAG, "getInstanceId failed", task.getException());
                                    return;
                                }

                                // Get new Instance ID token
                                String token = task.getResult().getToken();

                                RequestParams params = new RequestParams();
                                params.add("token", token);
                                try {
                                    new TwitterRestClientUsage().postToken(params);
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                                // Log and toast
                                String msg = getString(R.string.msg_token_fmt, token);
                                Log.d(TAG, msg);
                                Toast.makeText(MainActivity.this, msg, Toast.LENGTH_SHORT).show();
                            }
                        });
                // [END retrieve_current_token]
            }
        });


        binding.sendTokenButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                // Get token
                // [START retrieve_current_token]
                FirebaseInstanceId.getInstance().getInstanceId()
                        .addOnCompleteListener(new OnCompleteListener<InstanceIdResult>() {
                            @Override
                            public void onComplete(@NonNull Task<InstanceIdResult> task) {
                                if (!task.isSuccessful()) {
                                    Log.w(TAG, "getInstanceId failed", task.getException());
                                    return;
                                }

                                // Get new Instance ID token
                                String token = task.getResult().getToken();
                                try {
                                    new TwitterRestClientUsage().sendSend();
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                                // Log and toast
                                String msg = getString(R.string.msg_token_fmt, token);
                                Log.d(TAG, msg);
                                Toast.makeText(MainActivity.this, msg, Toast.LENGTH_SHORT).show();
                            }
                        });
                // [END retrieve_current_token]
            }
        });
    }


    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public void onResume() {
        super.onResume();

        if (bluetoothAdapter == null || !bluetoothAdapter.isEnabled()) {
            Intent enableBtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
            startActivityForResult(enableBtIntent, REQUEST_ENABLE_BT);
        } else {
            requestPermission();
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    private void requestPermission() {
        Log.d("2222222","2");
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.ACCESS_COARSE_LOCATION},
                    REQUEST_PERMISSION);
        } else {
            scanLeDevice(true);
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    private void scanLeDevice(boolean b) {
//        Intent intent = new Intent(getApplicationContext(), MyService.class);
//        if (Build.VERSION.SDK_INT >= 26) {
//            Log.d("26262626y2626 3333","dkjfslkdjf!!");
////            getApplicationContext().startForegroundService(intent);
//            startService(intent);void example2() {
//       BluetoothAdapter adapter = BluetoothAdapter.getDefaultAdapter();
//       BluetoothLeAdvertiser advertiser =
//         BluetoothAdapter.getDefaultAdapter().getBluetoothLeAdvertiser();
//
//       // Check if all features are supported
//       if (!adapter.isLe2MPhySupported()) {
//           Log.e(LOG_TAG, "2M PHY not supported!");
//           return;
//       }
//       if (!adapter.isLeExtendedAdvertisingSupported()) {
//           Log.e(LOG_TAG, "LE Extended Advertising not supported!");
//           return;
//       }
//
//       int maxDataLength = adapter.getLeMaximumAdvertisingDataLength();
//
//       AdvertisingSetParameters.Builder parameters = (new AdvertisingSetParameters.Builder())
//               .setLegacyMode(false)
//               .setInterval(AdvertisingSetParameters.INTERVAL_HIGH)
//               .setTxPowerLevel(AdvertisingSetParameters.TX_POWER_MEDIUM)
//               .setPrimaryPhy(BluetoothDevice.PHY_LE_2M)
//               .setSecondaryPhy(BluetoothDevice.PHY_LE_2M);
//
//       AdvertiseData data = (new AdvertiseData.Builder()).addServiceData(new
//         ParcelUuid(UUID.randomUUID()),
//               "You should be able to fit large amounts of data up to maxDataLength. This goes
//               up to 1650 bytes. For legacy advertising this would not
//               work".getBytes()).build();
//
//       AdvertisingSetCallback callback = new AdvertisingSetCallback() {
//           @Override
//           public void onAdvertisingSetStarted(AdvertisingSet advertisingSet, int txPower, int status) {
//               Log.i(LOG_TAG, "onAdvertisingSetStarted(): txPower:" + txPower + " , status: "
//                + status);
//               currentAdvertisingSet = advertisingSet;
//           }
//
//           @Override
//           public void onAdvertisingSetStopped(AdvertisingSet advertisingSet) {
//               Log.i(LOG_TAG, "onAdvertisingSetStopped():");
//           }
//       };
//
//       advertiser.startAdvertisingSet(parameters.build(), data, null, null, null, callback);
//
//       // After the set starts, you can modify the data and parameters of currentAdvertisingSet.
//       currentAdvertisingSet.setAdvertisingData((new
//         AdvertiseData.Builder()).addServiceData(new ParcelUuid(UUID.randomUUID()),
//               "Without disabling the advertiser first, you can set the data, if new data is
//                less than 251 bytes long.".getBytes()).build());
//
//       // Wait for onAdvertisingDataSet callback...
//
//       // Can also stop and restart the advertising
//       currentAdvertisingSet.enableAdvertising(false, 0, 0);
//       // Wait for onAdvertisingEnabled callback...
//       currentAdvertisingSet.enableAdvertising(true, 0, 0);
//       // Wait for onAdvertisingEnabled callback...
//
//       // Or modify the parameters - i.e. lower the tx power
//       currentAdvertisingSet.enableAdvertising(false, 0, 0);
//       // Wait for onAdvertisingEnabled callback...
//       currentAdvertisingSet.setAdvertisingParameters(parameters.setTxPowerLevel
//         (AdvertisingSetParameters.TX_POWER_LOW).build());
//       // Wait for onAdvertisingParametersUpdated callback...
//       currentAdvertisingSet.enableAdvertising(true, 0, 0);
//       // Wait for onAdvertisingEnabled callback...
//
//       // When done with the advertising:
//       advertiser.stopAdvertisingSet(callback);
//    }
//
//        } else {
//
//            Log.d("26262626y2626 3333","dkjfslkdjf!!");
//            startService(intent);
//        }


    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    private void advertise2() {
            BluetoothAdapter adapter = BluetoothAdapter.getDefaultAdapter();
            BluetoothLeAdvertiser advertiser =
                    BluetoothAdapter.getDefaultAdapter().getBluetoothLeAdvertiser();

            // Check if all features are supported
            if (!adapter.isLe2MPhySupported()) {
                Log.e("2m phy not", "2M PHY not supported!");
                return;
            }
            if (!adapter.isLeExtendedAdvertisingSupported()) {
                Log.e("le extended no", "LE Extended Advertising not supported!");
                return;
            }

            int maxDataLength = adapter.getLeMaximumAdvertisingDataLength();

            AdvertisingSetParameters.Builder parameters = (new AdvertisingSetParameters.Builder())
                    .setLegacyMode(false)
                    .setInterval(AdvertisingSetParameters.INTERVAL_HIGH)
                    .setTxPowerLevel(AdvertisingSetParameters.TX_POWER_MEDIUM)
                    .setPrimaryPhy(BluetoothDevice.PHY_LE_2M)
                    .setSecondaryPhy(BluetoothDevice.PHY_LE_2M);

            AdvertiseData data = (new AdvertiseData.Builder()).addServiceData(new
                            ParcelUuid(UUID.randomUUID()),
                    "You should be able to fit large amounts of data up to maxDataLength. This goes up to 1650 bytes. For legacy advertising this would not work".getBytes()).build();

            AdvertisingSetCallback callback = new AdvertisingSetCallback() {
                @Override
                public void onAdvertisingSetStarted(AdvertisingSet advertisingSet, int txPower, int status) {
                    Log.i("onAdvertisingSetStarted", "onAdvertisingSetStarted(): txPower:" + txPower + " , status: "
                            + status);
                    currentAdvertisingSet = advertisingSet;
                }

                @Override
                public void onAdvertisingSetStopped(AdvertisingSet advertisingSet) {
                    Log.i("LOG_TAG", "onAdvertisingSetStopped():");
                }
            };

            advertiser.startAdvertisingSet(parameters.build(), data, null, null, null, callback);

            // After the set starts, you can modify the data and parameters of currentAdvertisingSet.
            currentAdvertisingSet.setAdvertisingData((new
                    AdvertiseData.Builder()).addServiceData(new ParcelUuid(UUID.randomUUID()),
                    "Without disabling the advertiser first, you can set the data, if new data is less than 251 bytes long.".getBytes()).build());

            // Wait for onAdvertisingDataSet callback...

            // Can also stop and restart the advertising
            currentAdvertisingSet.enableAdvertising(false, 0, 0);
            // Wait for onAdvertisingEnabled callback...
            currentAdvertisingSet.enableAdvertising(true, 0, 0);
            // Wait for onAdvertisingEnabled callback...

            // Or modify the parameters - i.e. lower the tx power
            currentAdvertisingSet.enableAdvertising(false, 0, 0);
            // Wait for onAdvertisingEnabled callback...
            currentAdvertisingSet.setAdvertisingParameters(parameters.setTxPowerLevel
                    (AdvertisingSetParameters.TX_POWER_LOW).build());
            // Wait for onAdvertisingParametersUpdated callback...
            currentAdvertisingSet.enableAdvertising(true, 0, 0);
            // Wait for onAdvertisingEnabled callback...

            // When done with the advertising:
            advertiser.stopAdvertisingSet(callback);

    }

//
//    @RequiresApi(api = Build.VERSION_CODES.O)
//    void advertise() {
//        BluetoothLeAdvertiser advertiser =
//                BluetoothAdapter.getDefaultAdapter().getBluetoothLeAdvertiser();
//
//        AdvertisingSetParameters parameters = (new AdvertisingSetParameters.Builder())
//                .setLegacyMode(true) // True by default, but set here as a reminder.
//                .setConnectable(true)
//                .setInterval(AdvertisingSetParameters.INTERVAL_HIGH)
//                .setTxPowerLevel(AdvertisingSetParameters.TX_POWER_MEDIUM)
//                .build();
//
//        AdvertiseData data = (new AdvertiseData.Builder()).setIncludeDeviceName(true).build();
//
//        AdvertisingSetCallback callback = new AdvertisingSetCallback() {
//            @Override
//            public void onAdvertisingSetStarted(AdvertisingSet advertisingSet, int txPower, int status) {
//                Log.i("LOG_TAG", "onAdvertisingSetStarted(): txPower:" + txPower + " , status: "
//                        + status);
//                currentAdvertisingSet = advertisingSet;
//            }
//
//            @Override
//            public void onAdvertisingDataSet(AdvertisingSet advertisingSet, int status) {
//                Log.i("LOG_TAG", "onAdvertisingDataSet() :status:" + status);
//            }
//
//            @Override
//            public void onScanResponseDataSet(AdvertisingSet advertisingSet, int status) {
//                Log.i("LOG_TAG", "onScanResponseDataSet(): status:" + status);
//            }
//
//            @Override
//            public void onAdvertisingSetStopped(AdvertisingSet advertisingSet) {
//                Log.i("LOG_TAG", "onAdvertisingSetStopped():");
//            }
//        };
//
//        advertiser.startAdvertisingSet(parameters, data, null, null, null, callback);
//
//        // After onAdvertisingSetStarted callback is called, you can modify the
//        // advertising data and scan response data:
//        currentAdvertisingSet.setAdvertisingData(new AdvertiseData.Builder().
//                setIncludeDeviceName(true).setIncludeTxPowerLevel(true).build());
//        // Wait for onAdvertisingDataSet callback...
//        currentAdvertisingSet.setScanResponseData(new
//                AdvertiseData.Builder().addServiceUuid(new ParcelUuid(UUID.randomUUID())).build());
//        // Wait for onScanResponseDataSet callback...
//
//        // When done with the advertising:
//        advertiser.stopAdvertisingSet(callback);
//    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == REQUEST_ENABLE_BT) {
            requestPermission();
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == REQUEST_PERMISSION && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            scanLeDevice(true);
        }
    }
}
