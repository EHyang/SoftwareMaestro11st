package com.app.dahda_nice;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class Myinfo_ extends AppCompatActivity {


    Button button;
    Button button2;
    Button button3;

    SettingFrag settingFrag;
    SettingFrag2 settingFrag2;

    TextView textView;
    TextView textView2;
    TextView textView3;

    int state;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_myinfo_);


        textView2 = findViewById(R.id.my_situation);
        textView = findViewById(R.id.id);
        textView3 = findViewById(R.id.emailid_);


        Intent intent = getIntent();
        String key = intent.getStringExtra("key");
        state = intent.getIntExtra("state", 0);
        String google_id = intent.getStringExtra("google_id");

        textView3.setText(google_id);


        textView.setText(key);

        settingFrag = new SettingFrag();

        button = findViewById(R.id.setting);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                FragmentManager fragmentManager = getSupportFragmentManager();
                FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                fragmentTransaction.replace(R.id.framelayout_3, settingFrag);
                fragmentTransaction.commit();

                Bundle bundle = new Bundle();
                bundle.putInt("k",0);
                settingFrag.setArguments(bundle);
            }
        });
        settingFrag2 = new SettingFrag2();
        button2 = findViewById(R.id.setting2);
        button2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                FragmentManager fragmentManager = getSupportFragmentManager();
                FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                fragmentTransaction.replace(R.id.framelayout_3, settingFrag2);
                fragmentTransaction.commit();

                Bundle bundle = new Bundle();
                bundle.putInt("k",0);
                settingFrag2.setArguments(bundle);
            }
        });

        button3 = findViewById(R.id.myinbutton_);

        button3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });


    }

    @Override
    public void onResume() {
        stateCheck(state);
        super.onResume();
    }

    private void stateCheck(int state) {
        switch (state) {
            case 0:
                textView2.setText("일반자 모드");
                break;
            case 1:
                textView2.setText("접촉자");
                break;
            case 2:
                textView2.setText("확진자");
                break;
        }
    }
}