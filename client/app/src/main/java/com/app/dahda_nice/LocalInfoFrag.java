package com.app.dahda_nice;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.text.DecimalFormat;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class LocalInfoFrag extends Fragment {


    TextView gyeonggi;
    TextView incheon;
    TextView seoul;
    TextView gangwon;
    TextView sejong;
    TextView chungbuk;
    TextView chungnam;
    TextView daejeon;
    TextView gyeongbuk;
    TextView jeonbuk;
    TextView daegu;
    TextView jeonnam;
    TextView gwangju;
    TextView gyeongnam;
    TextView busan;
    TextView ulsan;
    TextView jeju;
    TextView quarantine;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = (View) inflater.inflate(R.layout.fragment_local_info, container, false);

        gyeonggi = view.findViewById(R.id.gyeonggi);
        incheon = view.findViewById(R.id.incheon);
        seoul = view.findViewById(R.id.seoul);
        gangwon = view.findViewById(R.id.gangwon);
        sejong = view.findViewById(R.id.sejong);
        chungbuk = view.findViewById(R.id.chungbuk);
        chungnam = view.findViewById(R.id.chungnam);
        daejeon = view.findViewById(R.id.daejeon);
        gyeongbuk = view.findViewById(R.id.gyeongbuk);
        jeonbuk = view.findViewById(R.id.jeonbuk);
        daegu = view.findViewById(R.id.daegu);
        jeonnam = view.findViewById(R.id.jeonnam);
        gwangju = view.findViewById(R.id.gwangju);
        gyeongnam = view.findViewById(R.id.gyeongnam);
        busan = view.findViewById(R.id.busan);
        ulsan = view.findViewById(R.id.ulsan);
        jeju = view.findViewById(R.id.jeju);
        quarantine = view.findViewById(R.id.quarantine);

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


        api.localdata().enqueue(new Callback<LocalData>() {
            @Override
            public void onResponse(Call<LocalData> call, Response<LocalData> response) {
                LocalData data = response.body();


                if (response.isSuccessful()) {
                    Log.d("Data 성공!!", "///" + 0);


                    gyeonggi.setText("경기\n" + data.gyeonggi);
                    incheon.setText("인천\n" + data.incheon);
                    seoul.setText("서울\n" + data.seoul);
                    gangwon.setText("강원\n" + data.gangwon);
                    sejong.setText("세종\n" + data.sejong);
                    chungbuk.setText("충북\n" + data.chungbuk);
                    chungnam.setText("충남\n" + data.chungnam);
                    daejeon.setText("대전\n" + data.daejeon);
                    gyeongbuk.setText("경북\n" + data.gyeongbuk);
                    jeonbuk.setText("전북\n" + data.jeonbuk);
                    daegu.setText("대구\n" + data.daegu);
                    jeonnam.setText("전남\n" + data.jeonnam);
                    gwangju.setText("광주\n" + data.gwangju);
                    gyeongnam.setText("경남\n" + data.gyeongnam);
                    busan.setText("부산\n" + data.busan);
                    ulsan.setText("울산\n" + data.ulsan);
                    jeju.setText("제주\n" + data.jeju);
                    quarantine.setText("검역\n" + data.quarantine);
                }

            }

            @Override
            public void onFailure(Call<LocalData> call, Throwable t) {
                Log.d("TEST 실패 ? : ", " 실패 실패");
                Log.d("why? ", t.toString());
            }
        });
    }
}