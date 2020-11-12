package com.app.dahda_nice;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;



public class JoinSuc extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_join_suc);


        Button button = findViewById(R.id.button);

        Intent intent = getIntent();
        final String mykey = intent.getStringExtra("mykey");
        final int state = intent.getIntExtra("state",-1);

        Log.d("check!!"," " + state);

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(),GeneralUser.class);
                intent.putExtra("mykey",mykey);
                intent.putExtra("state",state);
                startActivity(intent);

            }
        });
    }
}
