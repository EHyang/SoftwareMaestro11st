package com.app.dahda_nice;

import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanResult;
import android.os.ParcelUuid;
import android.util.Log;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

public class SampleScanCallback extends ScanCallback{

        @Override
        public void onBatchScanResults(List<ScanResult> results) {
            super.onBatchScanResults(results);


        }

        @Override
        public void onScanResult(int callbackType, ScanResult result) {
            super.onScanResult(callbackType, result);
            try {
                Map<ParcelUuid, byte[]> data = result.getScanRecord().getServiceData();

                String str = new String(data.get(Constants.Service_UUID), StandardCharsets.UTF_8);
                Log.d("TAG", str);
            } catch (Exception e) {

            }

        }

        @Override
        public void onScanFailed(int errorCode) {
            super.onScanFailed(errorCode);
        }

    }
