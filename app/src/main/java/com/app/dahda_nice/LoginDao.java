package com.app.dahda_nice;

import com.google.gson.annotations.SerializedName;

public class LoginDao {
    @SerializedName("res")
    private int res;

    @SerializedName("state")
    private int state;

    public int getRes() {
        return res;
    }

    public void setRes(int res) {
        this.res = res;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }
}
