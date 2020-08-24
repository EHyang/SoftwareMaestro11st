package com.app.dahda_nice;

import com.google.gson.annotations.SerializedName;

public class LoginDao {

    @SerializedName("res")
    private String res;


    public String getRes() {
        return res;
    }

    public void setRes(String res) {
        this.res = res;
    }

}
