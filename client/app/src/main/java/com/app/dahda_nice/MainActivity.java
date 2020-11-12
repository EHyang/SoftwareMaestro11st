package com.app.dahda_nice;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.widget.TextView;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentPagerAdapter;
import androidx.viewpager.widget.ViewPager;

import me.relex.circleindicator.CircleIndicator;

public class MainActivity extends AppCompatActivity {


    FragmentPagerAdapter fragmentPagerAdapter;
    TextView textView;
    ViewPager viewPager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Log.d("maing","checkcheck");

//        Intent get = getIntent();
//        if (get != null) {//푸시알림을 선택해서 실행한것이 아닌경우 예외처리
//            String notificationData = get.getStringExtra("test");
//            if (notificationData != null) {
//                Log.d("FCM_TEST", notificationData);
//            } else
//                Log.d("FCM_TEST", notificationData + "check");
//        }

        viewPager = findViewById(R.id.viewpager);

        viewPager.setPageTransformer(true, new ZoomOutPageTransformer());
        fragmentPagerAdapter = new ViewPagerAdapter(getSupportFragmentManager());
        viewPager.setAdapter(fragmentPagerAdapter);


        CircleIndicator circleIndicator = findViewById(R.id.indicator);
        circleIndicator.setViewPager(viewPager);

    }


    public void showLoginPage() {
        Intent intent = new Intent(getApplicationContext(), LoginActivity.class);
        startActivity(intent);
    }


}
