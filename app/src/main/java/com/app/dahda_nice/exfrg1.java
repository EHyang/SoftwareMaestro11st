package com.app.dahda_nice;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;


public class exfrg1 extends Fragment {

    public static Fragment newInstance() {
        exfrg1 fragment = new exfrg1();
        Bundle args = new Bundle();
        fragment.setArguments(args);
        return fragment;


    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_exfrg1, container, false);
    }


}
