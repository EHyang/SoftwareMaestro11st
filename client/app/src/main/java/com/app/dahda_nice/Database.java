package com.app.dahda_nice;

import android.content.Context;
import android.database.DatabaseErrorHandler;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

import androidx.annotation.Nullable;

public class Database extends SQLiteOpenHelper {

    public static final String TABLE_NAME = "dahda";
//    public static final String ID = "id";
    public static final String COL_1 = "time";
    public static final String COL_2 = "latitude";
    public static final String COL_3 = "longitude";


    public Database(@Nullable Context context, @Nullable String name, @Nullable SQLiteDatabase.CursorFactory factory, int version) {
        super(context, name, null, 1);

    }

    @Override
    public void onCreate(SQLiteDatabase db) {

        Log.d("Database in?", "in Check");

        String query = "create table if not exists " + TABLE_NAME + "(" +
//                ID + " varchar(50) not null , " +
                COL_1 + " datetime not null , " +
                COL_2 + " varchar(50) not null , " +
                COL_3 + " varchar(50) not null);";

        db.execSQL(query);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }

}
