package com.app.dahda_nice;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;


import android.Manifest;
import android.bluetooth.BluetoothAdapter;

import android.bluetooth.BluetoothManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.widget.Toast;

import androidx.appcompat.widget.Toolbar;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import com.google.android.material.navigation.NavigationView;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class GeneralUser extends AppCompatActivity {


    private final String dbName = "Dahda";

    String[] permissions = new String[]{Manifest.permission.ACCESS_COARSE_LOCATION, Manifest.permission.ACCESS_FINE_LOCATION};
    private BluetoothAdapter bluetoothAdapter;
    private static final int REQUEST_ENABLE_BT = 101;
    private static final int REQUEST_PERMISSION = 102;


    public static String mykey;


    static Database database;
    static DatabaseControl databaseControl;

    private DrawerLayout mDrawerLayout;
    NavigationView navigationView;

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();

        switch (id) {
            case android.R.id.home:
                mDrawerLayout.openDrawer(navigationView);
                break;
        }
        return super.onOptionsItemSelected(item);
    }


    MyinfoFrag myinfoFrag;
    TotalInfoFrag totalInfoFrag;
    LocalInfoFrag localInfoFrag;
    ConfirmFrag confirmFrag;
    ContactFrag contactFrag;


    FragmentManager fragmentManager;
    FragmentTransaction fragmentTransaction;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_general_user);


        database = new Database(this, "Dahda", null, 1);
        databaseControl = new DatabaseControl(database);
        databaseControl.delete();


        final Intent intent = getIntent();
        mykey = intent.getStringExtra("mykey");

        int state = intent.getIntExtra("state", -1);

        requestPermission();


        if (!getPackageManager().hasSystemFeature(PackageManager.FEATURE_BLUETOOTH) ||
                !getPackageManager().hasSystemFeature(PackageManager.FEATURE_BLUETOOTH_LE)) {
            Toast.makeText(this, "Bluetooth is not supported", Toast.LENGTH_LONG).show();
            finish();
        }

        final BluetoothManager bluetoothManager =
                (BluetoothManager) getSystemService(Context.BLUETOOTH_SERVICE);

        bluetoothAdapter = bluetoothManager.getAdapter();


        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);


        navigationView = findViewById(R.id.nav_view);
        ActionBar actionBar = getSupportActionBar();
        actionBar.setTitle("");
        actionBar.setDisplayHomeAsUpEnabled(true);
        actionBar.setHomeAsUpIndicator(R.drawable.ic_action_name);
        mDrawerLayout = findViewById(R.id.drawlayout);

        navigationView.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {

                mDrawerLayout.closeDrawers();
                Log.d("Check", menuItem.getItemId() + " ");

                int id = menuItem.getItemId();

                switch (id) {
                    case R.id.one:
                        Intent one = new Intent(getApplicationContext(), CoronaRull.class);
                        startActivity(one);
                        break;
                    case R.id.two:
                        break;
                    case R.id.three:
                        Intent three = new Intent(getApplicationContext(), ConfirmAc.class);
                        startActivity(three);
                        break;

                }

                return true;
            }
        });


        myinfoFrag = new MyinfoFrag();
        totalInfoFrag = new TotalInfoFrag();
        localInfoFrag = new LocalInfoFrag();
        confirmFrag = new ConfirmFrag();
        contactFrag = new ContactFrag();


        replaceFrag(state);

//        fragmentTransaction.replace(R.id.framelayout_, myinfoFrag);
//        fragmentTransaction.replace(R.id.framelayout_b, totalInfoFrag);
//        fragmentTransaction.replace(R.id.framelayout_c, localInfoFrag).commit();

        final SwipeRefreshLayout pullToRefresh = findViewById(R.id.contentSwipeLayout);
        pullToRefresh.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                stateCheck(); // your code
                pullToRefresh.setRefreshing(false);
            }
        });


    }


    private void replaceFrag(int state) {

        fragmentManager= getSupportFragmentManager();
        fragmentTransaction = fragmentManager.beginTransaction();

        switch (state) {
            case 0:
                mDrawerLayout.setBackgroundColor(getResources().getColor(R.color.colorService));
                fragmentTransaction.replace(R.id.framelayout_, myinfoFrag);
                fragmentTransaction.replace(R.id.framelayout_b, totalInfoFrag);
                fragmentTransaction.replace(R.id.framelayout_c, localInfoFrag).commit();
                break;
            case 1:
                mDrawerLayout.setBackgroundColor(Color.parseColor("#FFD700"));
                fragmentTransaction.replace(R.id.framelayout_, contactFrag);
                fragmentTransaction.replace(R.id.framelayout_b, totalInfoFrag);
                fragmentTransaction.replace(R.id.framelayout_c, localInfoFrag).commit();
                break;
            case 2:
                mDrawerLayout.setBackgroundColor(Color.parseColor("#DC143C"));
                fragmentTransaction.replace(R.id.framelayout_, confirmFrag);
                fragmentTransaction.replace(R.id.framelayout_b, totalInfoFrag);
                fragmentTransaction.replace(R.id.framelayout_c, localInfoFrag).commit();
                break;
        }
    }


    @Override
    protected void onRestart() {
        super.onRestart();
        stateCheck();

    }

    @Override
    public void onResume() {
        super.onResume();

        if (bluetoothAdapter == null || !bluetoothAdapter.isEnabled()) {
            Intent enableBtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
            startActivityForResult(enableBtIntent, REQUEST_ENABLE_BT);
        } else {
//            requestPermission();
        }


        requestPermission();


    }

    private void stateCheck() {
        Gson gson = new GsonBuilder()
                .setLenient()
                .create();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://3.34.117.4:3001")
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();

        Api api = retrofit.create(Api.class);

        ConfirmData confirmData = new ConfirmData(mykey);

        api.stateCheck(confirmData).enqueue(new Callback<LoginDao>() {
            @Override
            public void onResponse(Call<LoginDao> call, Response<LoginDao> response) {
                LoginDao data = response.body();

                Log.d("keykeykey!!", data.getRes() + " ");

                if (response.isSuccessful()) {
                    Log.d("Data 성공!!", "///" + data.getRes());

                    int state = Integer.parseInt(data.getRes());
                    replaceFrag(state);

                }

            }

            @Override
            public void onFailure(Call<LoginDao> call, Throwable t) {
                Log.d("TEST 실패 ? : ", " 실패 실패");
                Log.d("why? ", t.toString());
            }
        });

    }


    @Override
    public void onPause() {
        super.onPause();
    }


    private void requestPermission() {
        Log.d("requestPermission", "퍼미션 요청");


        String requestPermissions[] = new String[permissions.length];
        int index = -1;
        for (int i = 0; i < permissions.length; i++) {
            if (ContextCompat.checkSelfPermission(this, permissions[i]) != PackageManager.PERMISSION_GRANTED) {
                requestPermissions[++index] = permissions[i];
            }
        }
        if (index != -1) {
            ActivityCompat.requestPermissions(this, permissions, REQUEST_PERMISSION);

        } else {
            scanLeDevice(true);
        }


    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        int check = 0;

        for (int i = 0; i < permissions.length; i++) {
            if (requestCode == REQUEST_PERMISSION && grantResults[i] == PackageManager.PERMISSION_GRANTED) {
                check++;
            }
        }

        if (check == permissions.length) {
            scanLeDevice(true);
        } else {
//            requestPermission();
        }


    }

    private void scanLeDevice(boolean message) {

        Intent mainservice = new Intent(getApplicationContext(), BackgroundService.class);
        Log.d("User!!!", mykey + "  plz");
        mainservice.putExtra("mykey", mykey);


        if (Build.VERSION.SDK_INT >= 26) {
            Log.d("SDK_INT >= 26", "Start ForegroundService");
            startForegroundService(mainservice);
        } else {
            Log.d("SDK_INT < 26", "Start Service");
            startService(mainservice);

        }
    }

    public static void sendDatabase(String data, String getTime, String aLatitude, String aLongitude) {

        Log.d("null Check22", data + ", " + getTime + ", " + aLatitude + ", " + aLongitude);

//        databaseControl.select(data, getTime, aLatitude, aLongitude);

    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == REQUEST_ENABLE_BT) {
//            requestPermission();
        }


    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        databaseControl.delete();
        databaseControl.dbclose();
    }
}