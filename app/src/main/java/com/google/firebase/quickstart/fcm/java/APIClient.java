package com.google.firebase.quickstart.fcm.java;
import com.loopj.android.http.*;

public class APIClient {
    private static String BASE_URL = "https://d99d2cc1c95e.ngrok.io/";

    private static AsyncHttpClient client = new AsyncHttpClient();

    public APIClient(String server_url){
        this.BASE_URL=server_url;
    }

    public static void get(String url, RequestParams params, AsyncHttpResponseHandler responseHandler) {
        client.get(getAbsoluteUrl(url), params, responseHandler);
    }

    public static void post(String url, RequestParams params, AsyncHttpResponseHandler responseHandler) {
        client.post(getAbsoluteUrl(url), params, responseHandler);
    }

    private static String getAbsoluteUrl(String relativeUrl) {
        return BASE_URL + relativeUrl;
    }
}