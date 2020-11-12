package com.app.dahda_nice;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ConfirmAc extends AppCompatActivity {

    Button button;
    Button button2;
    Button button3;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_confirm);


        button = findViewById(R.id.confirmedButton);
        button2 = findViewById(R.id.cancelbutton);
        button3 = findViewById(R.id.back_button);


        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                confirmed();
            }
        });

        button2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                cancel();

            }
        });

        button3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
    }

    void confirmed() {
        Gson gson = new GsonBuilder()
                .setLenient()
                .create();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://3.34.117.4:3000")
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();

        Api api = retrofit.create(Api.class);

        String mykey = BackgroundService.mykey;

        ConfirmData confirmData = new ConfirmData(mykey);

        Log.d("check my key", "check my key " + mykey);


        api.mykeyData(confirmData).enqueue(new Callback<LoginDao>() {
            @Override
            public void onResponse(Call<LoginDao> call, Response<LoginDao> response) {
                LoginDao data = response.body();
                if (response.isSuccessful()) {
                    Log.d("confirm 성공!!!!!!!!!", data.getRes() + " //// ");


                    Log.d("보내줄거얌??", "맞앙??");
                }

            }

            @Override
            public void onFailure(Call<LoginDao> call, Throwable t) {

                Log.d("TEST 실패 ? : ", " confirmed 실패 실패");
                Log.d("why? ", t.toString());
            }
        });
    }

    void cancel() {

        Gson gson = new GsonBuilder()
                .setLenient()
                .create();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://3.34.117.4:3000")
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();

        Api api = retrofit.create(Api.class);

        String mykey = BackgroundService.mykey;

        ConfirmData confirmData = new ConfirmData(mykey);

        Log.d("check my key", "check my key " + mykey);


        api.confirmedCancel(confirmData).enqueue(new Callback<LoginDao>() {
            @Override
            public void onResponse(Call<LoginDao> call, Response<LoginDao> response) {
                LoginDao data = response.body();
                if (response.isSuccessful()) {
                    Log.d("confirm 성공!!!!!!!!!", data.getRes() + " //// ");


                    Log.d("보내줄거얌??", "맞앙??");
                }

            }

            @Override
            public void onFailure(Call<LoginDao> call, Throwable t) {

                Log.d("TEST 실패 ? : ", " confirmed 실패 실패");
                Log.d("why? ", t.toString());
            }
        });
    }
}