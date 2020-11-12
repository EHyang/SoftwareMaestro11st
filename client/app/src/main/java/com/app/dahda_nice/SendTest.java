package com.app.dahda_nice;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

public class SendTest {


    public static String aLatitude, aLongitude;


    public static void scanData(String getTime) {

        if (aLatitude != null && aLongitude != null) {
            Log.d("null Check", getTime + ", " + aLatitude + ", " + aLongitude);
            GeneralUser.sendDatabase(getTime, aLatitude, aLongitude);
        } else {
            Log.d("All of null", aLatitude + ", " + aLongitude);
        }
    }
}
