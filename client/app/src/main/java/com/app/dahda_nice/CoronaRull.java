package com.app.dahda_nice;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

public class CoronaRull extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_corona_rull);

        Button button = findViewById(R.id.button);

        Intent get = getIntent();
        if (get != null) {//푸시알림을 선택해서 실행한것이 아닌경우 예외처리
            String notificationData = get.getStringExtra("test");
            if (notificationData != null)
                Log.d("FCM_TEST", notificationData);
        }

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
    }
}