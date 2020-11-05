package com.app.dahda_nice;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class MainData {

    @Expose
    @SerializedName("first")
    String first;

    @Expose
    @SerializedName("two")
    String two;

    @Expose
    @SerializedName("three")
    String three;


    @Expose
    @SerializedName("confirmed_person")
    String confirmed_person;

    @Expose
    @SerializedName("normal_person")
    String normal_person;

    @Expose
    @SerializedName("cure_person")
    String cure_person;

    @Expose
    @SerializedName("dead_person")
    String dead_person;

    @Expose
    @SerializedName("incheon")
    String incheon;

    @Expose
    @SerializedName("gyeonggi")
    String gyeonggi;

    @Expose
    @SerializedName("seoul")
    String seoul;

    @Expose
    @SerializedName("chungbuk")
    String chungbuk;

    @Expose
    @SerializedName("gangwon")
    String gangwon;

    @Expose
    @SerializedName("sejong")
    String sejong;

    @Expose
    @SerializedName("daejeon")
    String daejeon;

    @Expose
    @SerializedName("gyeongbuk")
    String gyeongbuk;

    @Expose
    @SerializedName("chungnam")
    String chungnam;

    @Expose
    @SerializedName("daegu")
    String daegu;

    @Expose
    @SerializedName("jeonbuk")
    String jeonbuk;

    @Expose
    @SerializedName("jeonnam")
    String jeonnam;

    @Expose
    @SerializedName("gwangju")
    String gwangju;

    @Expose
    @SerializedName("gyeongnam")
    String gyeongnam;

    @Expose
    @SerializedName("ulsan")
    String ulsan;

    @Expose
    @SerializedName("jeju")
    String jeju;

    @Expose
    @SerializedName("busan")
    String busan;


    public MainData(String first, String two, String three, String confirmed_person, String normal_person, String cure_person, String dead_person, String incheon, String gyeonggi, String seoul, String chungbuk, String gangwon, String sejong, String daejeon, String gyeongbuk, String chungnam, String daegu, String jeonbuk, String jeonnam, String gwangju, String gyeongnam, String ulsan, String jeju, String busan) {
        this.first = first;
        this.two = two;
        this.three = three;
        this.confirmed_person = confirmed_person;
        this.normal_person = normal_person;
        this.cure_person = cure_person;
        this.dead_person = dead_person;
        this.incheon = incheon;
        this.gyeonggi = gyeonggi;
        this.seoul = seoul;
        this.chungbuk = chungbuk;
        this.gangwon = gangwon;
        this.sejong = sejong;
        this.daejeon = daejeon;
        this.gyeongbuk = gyeongbuk;
        this.chungnam = chungnam;
        this.daegu = daegu;
        this.jeonbuk = jeonbuk;
        this.jeonnam = jeonnam;
        this.gwangju = gwangju;
        this.gyeongnam = gyeongnam;
        this.ulsan = ulsan;
        this.jeju = jeju;
        this.busan = busan;
    }
}
