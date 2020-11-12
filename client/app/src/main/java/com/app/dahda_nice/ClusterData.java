package com.app.dahda_nice;

import com.google.android.gms.maps.model.LatLng;
import com.google.maps.android.clustering.ClusterItem;

public class ClusterData implements ClusterItem {

    LatLng mPosition;

    String mTitle;

    public ClusterData(double lat, double lng, String mTitle) {
        this.mPosition = new LatLng(lat,lng);
        this.mTitle = mTitle;
    }

    @Override
    public LatLng getPosition() {
        return mPosition;
    }

    @Override
    public String getTitle() {
        return mTitle;
    }

    @Override
    public String getSnippet() {
        return null;
    }
}
