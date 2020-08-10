package com.app.dahda_nice;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface Api {

    @POST("/login")
    Call<LoginDao> postData(@Body LoginData loginData);

    @POST("/input_my_table")
    Call<LoginDao> scanData (@Body ArrayList arrayList);



}
