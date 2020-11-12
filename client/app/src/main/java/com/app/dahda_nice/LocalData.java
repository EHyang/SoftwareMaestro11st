package com.app.dahda_nice;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class LocalData {

    /**
     *     seoul: 누적 확진자수
     *     busan: 누적 확진자수
     *     daegu: 누적 확진자수
     *     incheon: 누적 확진자수
     *     gwangju: 누적 확진자수
     *     daejeon: 누적 확진자수
     *     ulsan: 누적 확진자수
     *     sejong: 누적 확진자수
     *     gyeonggi: 누적 확진자수
     *     gangwon: 누적 확진자수
     *     chungbuk: 누적 확진자수
     *     chungnam: 누적 확진자수
     *     jeonbuk: '누적 확진자수
     *     jeonnam: 누적 확진자수
     *     gyeongbuk: 누적 확진자수
     *     gyeongnam: '누적 확진자수
     *     jeju: 누적 확진자수
     *     quarantine: 누적 확진자수 (검역)
     */

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

    @Expose
    @SerializedName("quarantine")
    String quarantine;


    public String getIncheon() {
        return incheon;
    }

    public void setIncheon(String incheon) {
        this.incheon = incheon;
    }

    public String getGyeonggi() {
        return gyeonggi;
    }

    public void setGyeonggi(String gyeonggi) {
        this.gyeonggi = gyeonggi;
    }

    public String getSeoul() {
        return seoul;
    }

    public void setSeoul(String seoul) {
        this.seoul = seoul;
    }

    public String getChungbuk() {
        return chungbuk;
    }

    public void setChungbuk(String chungbuk) {
        this.chungbuk = chungbuk;
    }

    public String getGangwon() {
        return gangwon;
    }

    public void setGangwon(String gangwon) {
        this.gangwon = gangwon;
    }

    public String getSejong() {
        return sejong;
    }

    public void setSejong(String sejong) {
        this.sejong = sejong;
    }

    public String getDaejeon() {
        return daejeon;
    }

    public void setDaejeon(String daejeon) {
        this.daejeon = daejeon;
    }

    public String getGyeongbuk() {
        return gyeongbuk;
    }

    public void setGyeongbuk(String gyeongbuk) {
        this.gyeongbuk = gyeongbuk;
    }

    public String getChungnam() {
        return chungnam;
    }

    public void setChungnam(String chungnam) {
        this.chungnam = chungnam;
    }

    public String getDaegu() {
        return daegu;
    }

    public void setDaegu(String daegu) {
        this.daegu = daegu;
    }

    public String getJeonbuk() {
        return jeonbuk;
    }

    public void setJeonbuk(String jeonbuk) {
        this.jeonbuk = jeonbuk;
    }

    public String getJeonnam() {
        return jeonnam;
    }

    public void setJeonnam(String jeonnam) {
        this.jeonnam = jeonnam;
    }

    public String getGwangju() {
        return gwangju;
    }

    public void setGwangju(String gwangju) {
        this.gwangju = gwangju;
    }

    public String getGyeongnam() {
        return gyeongnam;
    }

    public void setGyeongnam(String gyeongnam) {
        this.gyeongnam = gyeongnam;
    }

    public String getUlsan() {
        return ulsan;
    }

    public void setUlsan(String ulsan) {
        this.ulsan = ulsan;
    }

    public String getJeju() {
        return jeju;
    }

    public void setJeju(String jeju) {
        this.jeju = jeju;
    }

    public String getBusan() {
        return busan;
    }

    public void setBusan(String busan) {
        this.busan = busan;
    }

    public String getQuarantine() {
        return quarantine;
    }

    public void setQuarantine(String quarantine) {
        this.quarantine = quarantine;
    }
}
