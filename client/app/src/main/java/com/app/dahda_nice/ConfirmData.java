package com.app.dahda_nice;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class ConfirmData {
    @Expose
    @SerializedName("my_key")
    String my_key;

    public ConfirmData(String my_key) {
        this.my_key = my_key;
    }


}
