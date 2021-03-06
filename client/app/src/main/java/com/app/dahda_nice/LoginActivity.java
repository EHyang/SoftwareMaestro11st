package com.app.dahda_nice;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.SignInButton;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthCredential;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.GoogleAuthProvider;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class LoginActivity extends AppCompatActivity {

    private static final int RC_SIGN_IN = 900;

    private GoogleSignInClient googleSignInClient;

    private FirebaseAuth firebaseAuth;

    private SignInButton buttonGoogle;

    String google_id;


    private String token;

    public static String kk;

    Button button;
    Button button2;
    SettingFrag settingFrag;
    SettingFrag2 settingFrag2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        Log.d("LoginActivityonCreate!!", " 뭘까아아아아?");




        settingFrag = new SettingFrag();
        button = findViewById(R.id.setting);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                FragmentManager fragmentManager = getSupportFragmentManager();
                FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                fragmentTransaction.replace(R.id.framelayout_, settingFrag);
                fragmentTransaction.commit();
                Bundle bundle = new Bundle();
                bundle.putInt("k",1);
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
                fragmentTransaction.replace(R.id.framelayout_, settingFrag2);
                fragmentTransaction.commit();

                Bundle bundle = new Bundle();
                bundle.putInt("k",1);
                settingFrag2.setArguments(bundle);
            }
        });

        firebaseAuth = FirebaseAuth.getInstance();


        GoogleSignInOptions googleSignInOptions = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(getString(R.string.default_web_client_id))
                .requestEmail()
                .build();


        googleSignInClient = GoogleSignIn.getClient(this, googleSignInOptions);

        buttonGoogle = findViewById(R.id.buttonGoogle);
        buttonGoogle.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent signInIntent = googleSignInClient.getSignInIntent();
                startActivityForResult(signInIntent, RC_SIGN_IN);
                Log.d("googlebuttonClick!!", "" + " 뭘까아아아아?");


            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);


        if (requestCode == RC_SIGN_IN) {


            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            Log.d("requestCode", task.toString());

            try {
                GoogleSignInAccount account = task.getResult(ApiException.class);

                Log.d("emailID!!", account.getEmail());
                google_id = account.getEmail();
                firebaseAuthWithGoogle(account);

            } catch (ApiException e) {
                e.printStackTrace();
            }


        }

    }

    private void firebaseAuthWithGoogle(GoogleSignInAccount account) {

        FirebaseInstanceId.getInstance().getInstanceId()
                .addOnCompleteListener(new OnCompleteListener<InstanceIdResult>() {
                    @Override
                    public void onComplete(@NonNull Task<InstanceIdResult> task) {
                        if (task.isSuccessful()) {
                            Log.d("FirebaseloginSuc", "Login Suc");
                            token = task.getResult().getToken();
                            RetrofitLogin(token);

                        } else {
                            Log.w("isSuccessful!!", " " + task.getException());
                            return;
                        }
                    }
                });

        AuthCredential credential = GoogleAuthProvider.getCredential(account.getIdToken(), null);
        firebaseAuth.signInWithCredential(credential)
                .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {

                        } else {
                            Log.d("FirebaseLoginCheck", "fail?");
                            Toast.makeText(getApplicationContext(), "로그인 실패", Toast.LENGTH_LONG).show();
                        }
                    }
                });


    }

    public void RetrofitLogin(String t) {

        Log.d("token!!!!!!", t);

        Gson gson = new GsonBuilder()
                .setLenient()
                .create();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://3.34.117.4:3000")
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();

        Api api = retrofit.create(Api.class);


        LoginData loginData = new LoginData(google_id, t);

        api.postData(loginData).enqueue(new Callback<LoginDao>() {
            @Override
            public void onResponse(Call<LoginDao> call, Response<LoginDao> response) {
                LoginDao data = response.body();

                Log.d("LoginCheck!!", data.getRes() + " ");

                if (response.isSuccessful()) {
                    String mykey = data.getRes();
                    int state = data.getState();

                    kk = data.getRes();


                    Intent mykey2 = new Intent(getApplicationContext(), JoinSuc.class);
                    mykey2.putExtra("google_id",google_id);
                    Log.d("googleid check!!",google_id+" ");
                    mykey2.putExtra("state",state);
                    mykey2.putExtra("mykey", mykey);
                    startActivity(mykey2);


                }

            }

            @Override
            public void onFailure(Call<LoginDao> call, Throwable t) {
                Log.d("TEST 실패 ? : ", " 실패 실패");
                Log.d("why? ", t.toString());
            }
        });
    }

}
