package com.app.dahda_nice;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

public class LocalInfoFrag extends Fragment {


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = (View) inflater.inflate(R.layout.fragment_local_info, container, false);

        TextView gyeonggi = view.findViewById(R.id.gyeonggi);
        TextView incheon = view.findViewById(R.id.incheon);
        TextView seoul = view.findViewById(R.id.seoul);
        TextView gangwon = view.findViewById(R.id.gangwon);
        TextView sejong = view.findViewById(R.id.sejong);
        TextView chungbuk = view.findViewById(R.id.chungbuk);
        TextView chungnam = view.findViewById(R.id.chungnam);
        TextView daejeon = view.findViewById(R.id.daejeon);
        TextView gyeongbuk = view.findViewById(R.id.gyeongbuk);
        TextView jeonbuk = view.findViewById(R.id.jeonbuk);
        TextView daegu = view.findViewById(R.id.daegu);
        TextView jeonnam = view.findViewById(R.id.jeonnam);
        TextView gwangju = view.findViewById(R.id.gwangju);
        TextView gyeongnam = view.findViewById(R.id.gyeongnam);
        TextView busan = view.findViewById(R.id.busan);
        TextView ulsan = view.findViewById(R.id.ulsan);
        TextView jeju = view.findViewById(R.id.jeju);


        gyeonggi.setText("경기\n" + "6,250");
        incheon.setText("인천\n" + "6,250");
        seoul.setText("서울\n" + "6,250");
        gangwon.setText("강원\n" + "6,250");
        sejong.setText("세종\n" + "6,250");
        chungbuk.setText("충북\n" + "6,250");
        chungnam.setText("충남\n" + "6,250");
        daejeon.setText("대전\n" + "6,250");
        gyeongbuk.setText("경북\n" + "6,250");
        jeonbuk.setText("전북\n" + "6,250");
        daegu.setText("대구\n" + "6,250");
        jeonnam.setText("전남\n" + "6,250");
        gwangju.setText("광주\n" + "6,250");
        gyeongnam.setText("경남\n" + "6,250");
        busan.setText("부산\n" + "6,250");
        ulsan.setText("울산\n" + "6,250");
        jeju.setText("제주\n" + "6,250");


        return view;


    }
}