package com.app.dahda_nice;

import android.content.Intent;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MyinfoFrag extends Fragment {


    TextView first;
    TextView second;
    String key;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View view = (View) inflater.inflate(R.layout.fragment_myinfo, container, false);

        Bundle bundle = getArguments();

        key = bundle.getString("key");


        connect();

        first = view.findViewById(R.id.first);
        second = view.findViewById(R.id.second);


        return view;


    }

    private void connect() {
        Log.d("fragKeyCheck /// ",key);
        Gson gson = new GsonBuilder()
                .setLenient()
                .create();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://3.34.117.4:3000")
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();

        Api api = retrofit.create(Api.class);

        ConfirmData confirmData = new ConfirmData(key);

        api.info(confirmData).enqueue(new Callback<LoginDao>() {
            @Override
            public void onResponse(Call<LoginDao> call, Response<LoginDao> response) {
                LoginDao data = response.body();


                if (response.isSuccessful()) {
                    Log.d("First Data 성공!!", "///" + data.getFirst());
                    Log.d("Data 성공!!", "///" + data.getSecond());
                    first.setText(data.getFirst());
                    second.setText(data.getSecond());

                }

            }

            @Override
            public void onFailure(Call<LoginDao> call, Throwable t) {
                Log.d("TEST 실패 ? : ", " 실패 실패");
                Log.d("why? ", t.toString());
            }
        });

    }
}
