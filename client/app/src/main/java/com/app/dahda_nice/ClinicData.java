package com.app.dahda_nice;

import com.google.android.gms.maps.model.LatLng;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import com.google.maps.android.clustering.ClusterItem;


public class ClinicData implements ClusterItem {

    @Expose
    @SerializedName("num")
    String num;

    @Expose
    @SerializedName("name")
    String name;

    @Expose
    @SerializedName("x")
    double x;

    @Expose
    @SerializedName("y")
    double y;

    @Expose
    @SerializedName("phone")
    String phone;

    public String getNum() {
        return num;
    }

    public void setNum(String num) {
        this.num = num;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }


    public String findIndex(String name) {
        if (this.name.equals(name)) {
            return name;
        } else
            return null;
    }

    @Override
    public LatLng getPosition() {
        return null;
    }

    @Override
    public String getTitle() {
        return null;
    }

    @Override
    public String getSnippet() {
        return null;
    }
}

