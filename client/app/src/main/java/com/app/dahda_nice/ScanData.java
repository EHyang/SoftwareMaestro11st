package com.app.dahda_nice;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class ScanData {

    @Expose
    @SerializedName("my_key")
    String my_key;

    @Expose
    @SerializedName("scan_key")
    String scan_key;

    @Expose
    @SerializedName("scan_time")
    String scan_time;


    public ScanData(String my_key, String scan_key, String scan_time) {
        this.my_key = my_key;
        this.scan_key = scan_key;
        this.scan_time = scan_time;
    }


}
