package com.app.dahda_nice;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class gogogo extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_gogogo);


        Intent intent = getIntent();
        final String mykey = intent.getStringExtra("mykey");

        Button button = findViewById(R.id.button);

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Gson gson = new GsonBuilder()
                        .setLenient()
                        .create();

                Retrofit retrofit = new Retrofit.Builder()
                        .baseUrl("http://3.34.117.4:3000")
                        .addConverterFactory(GsonConverterFactory.create(gson))
                        .build();

                Api api = retrofit.create(Api.class);

                ScanData scanData = new ScanData(mykey);

                api.mykeyData(scanData).enqueue(new Callback<LoginDao>() {
                    @Override
                    public void onResponse(Call<LoginDao> call, Response<LoginDao> response) {

                        LoginDao data = response.body();

                        if (response.isSuccessful()) {
                            Log.d("성공인가요?!!?!", data.getRes());
                        }
                    }

                    @Override
                    public void onFailure(Call<LoginDao> call, Throwable t) {
                        Log.d("TEST 실패 ? : ", " 실패 실패");
                        Log.d("why? ", t.toString());
                    }
                });

            }
        });
    }
}



