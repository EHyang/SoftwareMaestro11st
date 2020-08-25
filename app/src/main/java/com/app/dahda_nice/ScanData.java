package com.app.dahda_nice;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class ScanData {

    @Expose
    @SerializedName("scan_key")
    String scan_key;

    @Expose
    @SerializedName("scan_time")
    String scan_time;

    @Expose
    @SerializedName("my_key")
    String my_key;


    public ScanData(String my_key) {
        this.my_key = my_key;
    }

    public ScanData(String scan_key, String scan_time) {
        this.scan_key = scan_key;
        this.scan_time = scan_time;
    }


}
