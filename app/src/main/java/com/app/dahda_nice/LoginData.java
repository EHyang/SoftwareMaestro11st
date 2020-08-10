package com.app.dahda_nice;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class LoginData {

    @Expose
    @SerializedName("google_id")
    private String google_id;

    @Expose
    @SerializedName("my_mac")
    private String my_mac;


    public LoginData(String google_id, String my_mac) {
        this.google_id = google_id;
        this.my_mac = my_mac;
    }

    public String getGoogle_id() {
        return google_id;
    }

    public void setGoogle_id(String google_id) {
        this.google_id = google_id;
    }

    public String getMy_mac() {
        return my_mac;
    }

    public void setMy_mac(String my_mac) {
        this.my_mac = my_mac;
    }
}
