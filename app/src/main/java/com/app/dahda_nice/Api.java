package com.app.dahda_nice;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface Api {




    @POST("/testlogin")
    Call<LoginDao> postData(@Body LoginData loginData);

    @POST("/input?my_key=data123")
    Call<LoginDao> scanData (@Body ArrayList<ScanData> scanData);

    @POST("/confirmed")
    Call<LoginDao> mykeyData (@Body ScanData scanData);

//    @POST("/scan/bulk")
//    Call<LoginDao> scanData (@Body ArrayList<ScanData> scanData);




}