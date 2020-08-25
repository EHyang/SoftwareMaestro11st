package com.app.dahda_nice;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;

public class ViewPagerAdapter extends FragmentPagerAdapter {
    private static int NUM_ITEMS = 4;



    public ViewPagerAdapter(FragmentManager fm) {
        super(fm);
    }

    @Override
    public Fragment getItem(int position) {
        switch (position) {
            case 0:
                return exfrg1.newInstance();
            case 1:
                return exfrg2.newInstance();
            case 2:
                return exfrg3.newInstance();
            case 3:
                return exfrg4.newInstance();
            default:
                return null;
        }
    }

    @Override
    public int getCount() {
        return NUM_ITEMS;
    }
}
