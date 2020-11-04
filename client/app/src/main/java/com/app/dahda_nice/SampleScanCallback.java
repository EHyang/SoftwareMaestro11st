package com.app.dahda_nice;

import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanResult;
import android.content.Context;
import android.content.Intent;
import android.os.ParcelUuid;
import android.util.Log;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class SampleScanCallback extends ScanCallback {


    Intent intent;

    Context context;
    GeneralUser generalUser;

    String getTime;
    String daTa;

    @Override
    public void onBatchScanResults(List<ScanResult> results) {
        super.onBatchScanResults(results);


    }

    @Override
    public void onScanResult(int callbackType, ScanResult result) {
        super.onScanResult(callbackType, result);

        try {
            Map<ParcelUuid, byte[]> data = result.getScanRecord().getServiceData();

            String advertiseData = new String(data.get(Constants.Service_UUID), StandardCharsets.UTF_8);
            sendAdvertiseData(advertiseData);


            Log.d("HWANG DATA123", advertiseData);

        } catch (Exception e) {

        }

    }

    private void sendAdvertiseData(String d) {

        Gson gson = new GsonBuilder()
                .setLenient()
                .create();

        daTa = d;
        Log.d("HWANG DATA123kkk", daTa);

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://3.34.117.4:3001")
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();

        Api api = retrofit.create(Api.class);


        long now = System.currentTimeMillis();
        Date mDate = new Date(now);
        SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        getTime = simpleDate.format(mDate);
        Log.d("scanCheck!!33", getTime);

        String key = BackgroundService.mykey;

        Log.d("scanCheck!!33", key);

        ArrayList<ScanData> scanData = new ArrayList<>();


        scanData.add(new ScanData(key, daTa, getTime));


        api.scanData(scanData).enqueue(new Callback<LoginDao>() {
            @Override
            public void onResponse(Call<LoginDao> call, Response<LoginDao> response) {
                LoginDao data = response.body();
                if (response.isSuccessful()) {
                    Log.d("Scandata 성공!!!!!!!!!", data.getRes() + " //// ");


                    Log.d("보내줄거얌??", "맞앙??");
                    SendTest.scanData(daTa, getTime);
                }

            }

            @Override
            public void onFailure(Call<LoginDao> call, Throwable t) {
                Log.d("TEST 실패 ? : ", " 실패 실패");
                Log.d("why? ", t.toString());
            }
        });

    }


    @Override
    public void onScanFailed(int errorCode) {
        super.onScanFailed(errorCode);

        Log.e("SCANFAIL", "" + errorCode);
    }


}
