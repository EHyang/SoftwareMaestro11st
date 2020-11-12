package com.app.dahda_nice;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;

import androidx.activity.result.contract.ActivityResultContracts;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

public class ContactFrag extends Fragment {


    Button contactLocation_;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = (View) inflater.inflate(R.layout.fragment_contact, container, false);

        contactLocation_ =view.findViewById(R.id.contactLocation_);

        contactLocation_.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getActivity(),ContactLocation.class);
                startActivity(intent);
            }
        });


        return view;

    }
}