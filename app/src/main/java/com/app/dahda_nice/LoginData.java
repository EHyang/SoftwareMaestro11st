package com.app.dahda_nice;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class LoginData {

    @Expose
    @SerializedName("google_id")
    private String google_id;

    @Expose
    @SerializedName("token")
    private String token;

    public LoginData(String google_id, String token) {
        this.google_id = google_id;
        this.token = token;
    }

    public String getGoogle_id() {
        return google_id;
    }

    public void setGoogle_id(String google_id) {
        this.google_id = google_id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
