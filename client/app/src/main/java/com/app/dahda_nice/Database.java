package com.app.dahda_nice;

import android.content.Context;
import android.database.DatabaseErrorHandler;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

public class Database extends SQLiteOpenHelper {

    public static final String DATABASE_NAME = "Dahda";
    public static final String TABLE_NAME = "dahda";
    public static final String ID = "id";
    public static final String COL_1 = "time";
    public static final String COL_2 = "latitude";
    public static final String COL_3 = "longitude";



    public Database(@Nullable Context context, @Nullable String name, @Nullable SQLiteDatabase.CursorFactory factory, int version) {
        super(context, DATABASE_NAME, null, 1);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        String query = "create table if not exists " + TABLE_NAME + "(" +
                ID + " text not null , " +
                COL_1+ " integer not null , " +
                COL_2+ " text not null , " +
                COL_3+ " text not null);";

        db.execSQL(query);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }
}
