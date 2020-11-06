package com.app.dahda_nice;

import java.util.ArrayList;


import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface Api {

    @POST("api/v2/login")
    Call<LoginDao> postData(@Body LoginData loginData);

    @POST("api/v2/scan")
    Call<LoginDao> scanData (@Body ArrayList<ScanData> scanData);

    @POST("api/v2/confirmed")
    Call<LoginDao> mykeyData (@Body ConfirmData confirmData);

    @POST("api/v2/confirmed/cancel")
    Call<LoginDao> confirmedCancel (@Body ConfirmData confirmData);

    @POST("api/v2/state")
    Call<LoginDao> stateCheck (@Body ConfirmData confirmData);

    @POST("api/v3/count")
    Call<MiddleData> middledata ();

    @POST("api/v3/local")
    Call<LocalData> localdata ();



}
