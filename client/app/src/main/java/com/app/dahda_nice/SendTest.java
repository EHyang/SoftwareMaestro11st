package com.app.dahda_nice;

import android.util.Log;

public class SendTest {

    public static String aLatitude, aLongitude;


    public static void scanData(String data, String getTime) {

        if (aLatitude != null && aLongitude != null) {
            Log.d("null Check", data + ", " + getTime + ", " + aLatitude + ", " + aLongitude);
            GeneralUser generalUser = new GeneralUser();
            generalUser.sendDatabase(data, getTime, aLatitude, aLongitude);
        } else {
            Log.d("All of null", aLatitude + ", " + aLongitude);
        }
    }
}
