package com.app.dahda_nice;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class MiddleData {

    @Expose
    @SerializedName("confirmed")
    String confirmed;

    @Expose
    @SerializedName("confirmed_up")
    String confirmed_up;

    @Expose
    @SerializedName("examined")
    String examined;


    @Expose
    @SerializedName("examined_up")
    String examined_up;

    @Expose
    @SerializedName("normal")
    String normal;

    @Expose
    @SerializedName("normal_up")
    String normal_up;

    @Expose
    @SerializedName("dead")
    String dead;

    @Expose
    @SerializedName("dead_up")
    String dead_up;

    @Expose
    @SerializedName("time")
    String time;

    public String getConfirmed() {
        return confirmed;
    }

    public void setConfirmed(String confirmed) {
        this.confirmed = confirmed;
    }

    public String getConfirmed_up() {
        return confirmed_up;
    }

    public void setConfirmed_up(String confirmed_up) {
        this.confirmed_up = confirmed_up;
    }

    public String getExamined() {
        return examined;
    }

    public void setExamined(String examined) {
        this.examined = examined;
    }

    public String getExamined_up() {
        return examined_up;
    }

    public void setExamined_up(String examined_up) {
        this.examined_up = examined_up;
    }

    public String getNormal() {
        return normal;
    }

    public void setNormal(String normal) {
        this.normal = normal;
    }

    public String getNormal_up() {
        return normal_up;
    }

    public void setNormal_up(String normal_up) {
        this.normal_up = normal_up;
    }

    public String getDead() {
        return dead;
    }

    public void setDead(String dead) {
        this.dead = dead;
    }

    public String getDead_up() {
        return dead_up;
    }

    public void setDead_up(String dead_up) {
        this.dead_up = dead_up;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
