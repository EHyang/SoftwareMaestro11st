package com.app.dahda_nice;

import com.google.gson.annotations.SerializedName;

public class LoginDao {

    @SerializedName("res")
    private String res;

    @SerializedName("state")
    private int state;


    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public String getRes() {
        return res;
    }

    public void setRes(String res) {
        this.res = res;
    }

}
