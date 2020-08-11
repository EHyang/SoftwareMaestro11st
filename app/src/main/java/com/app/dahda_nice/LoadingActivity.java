package com.app.dahda_nice;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;

public class LoadingActivity extends AppCompatActivity {


    private final int DISPLAY_TIME = 5000;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_loading);


        startanim();

        Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                startActivity(new Intent(getApplicationContext(),MainActivity.class));
                LoadingActivity.this.finish();

            }
        },DISPLAY_TIME);
    }

    private void startanim() {

        Animation animation = AnimationUtils.loadAnimation(getBaseContext(), R.anim.alpha);
        ImageView imageView = findViewById(R.id.hwang3);
        imageView.setAnimation(animation);



    }

    @Override
    public void onBackPressed() {

    }
}
