package com.app.dahda_nice;

import android.util.Log;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ClinicDataCon {

    public static ArrayList<ClinicData> arrayList = new ArrayList<>();

    static void bringData() {
        Gson gson = new GsonBuilder()
                .setLenient()
                .create();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://3.34.117.4:3000")
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();

        Api api = retrofit.create(Api.class);


        api.clinicdata().enqueue(new Callback<List<ClinicData>>() {
            @Override
            public void onResponse(Call<List<ClinicData>> call, Response<List<ClinicData>> response) {
                List<ClinicData> data = response.body();

                if (response.isSuccessful()) {

                    for (int i = 0; i < data.size(); i++) {
                        arrayList.add(data.get(i));
                    }
                    Log.d("마커성공? ", "" + data.get(23).getName());
                }
            }

            @Override
            public void onFailure(Call<List<ClinicData>> call, Throwable t) {
                Log.d("TEST 실패 ? : ", " 실패 실패");
                Log.d("why? ", t.toString());
            }
        });
    }
}
