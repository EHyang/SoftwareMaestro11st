package com.app.dahda_nice;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface Api {

    @POST("/login")
    Call<LoginDao> postData(@Body LoginData loginData);





}
