package com.app.dahda_nice;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class TotalInfoFrag extends Fragment {


    TextView confirmed_person;
    TextView examined;
    TextView normal_person;
    TextView dead_person;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = (View) inflater.inflate(R.layout.fragment_total_info, container, false);

        confirmed_person = view.findViewById(R.id.confirmed_person);
        examined = view.findViewById(R.id.examined);
        normal_person = view.findViewById(R.id.normal_person);
        dead_person = view.findViewById(R.id.dead_person);

        retrofitgo();

        return view;
    }

    private void retrofitgo() {

        Gson gson = new GsonBuilder()
                .setLenient()
                .create();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://3.34.117.4:3000")
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();

        Api api = retrofit.create(Api.class);


        api.middledata().enqueue(new Callback<MiddleData>() {
            @Override
            public void onResponse(Call<MiddleData> call, Response<MiddleData> response) {
                MiddleData data = response.body();


                Log.d("keykeykey!!", data.getConfirmed() + " ");

                if (response.isSuccessful()) {
                    Log.d("Data 성공!!", "///" + 0);
                    confirmed_person.setText(data.getConfirmed());
                    examined.setText(data.getExamined());
                    normal_person.setText(data.normal);
                    dead_person.setText(data.dead);

                }

            }

            @Override
            public void onFailure(Call<MiddleData> call, Throwable t) {
                Log.d("TEST 실패 ? : ", " 실패 실패");
                Log.d("why? ", t.toString());
            }
        });
    }
}