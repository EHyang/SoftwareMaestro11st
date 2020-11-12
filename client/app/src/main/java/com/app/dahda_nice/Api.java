package com.app.dahda_nice;

import java.util.ArrayList;
import java.util.List;


import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface Api {

    @POST("api/v3/login")
    Call<LoginDao> postData(@Body LoginData loginData);

    @POST("api/v3/scan")
    Call<LoginDao> scanData (@Body ArrayList<ScanData> scanData);

    @POST("api/v3/confirmed")
    Call<LoginDao> mykeyData (@Body ConfirmData confirmData);

    @POST("api/v3/confirmed/cancel")
    Call<LoginDao> confirmedCancel (@Body ConfirmData confirmData);

    @POST("api/v3/state")
    Call<LoginDao> stateCheck (@Body ConfirmData confirmData);

    @GET("api/v3/count")
    Call<MiddleData> middledata ();

    @GET("api/v3/local")
    Call<LocalData> localdata ();

    @GET("api/v3/hospital_check")
    Call<List<ClinicData>> clinicdata();


}
