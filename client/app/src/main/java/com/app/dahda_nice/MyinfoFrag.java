package com.app.dahda_nice;

import android.content.Intent;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

public class MyinfoFrag extends Fragment {



    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {


        getActivity().startService(new Intent(getActivity(),BackgroundService.class));



        return inflater.inflate(R.layout.fragment_myinfo, container, false);




    }
}