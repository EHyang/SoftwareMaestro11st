package com.app.dahda_nice;

import android.content.ContentValues;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

public class DatabaseControl {

    Database database;
    SQLiteDatabase sqLiteDatabase;


    public DatabaseControl(Database database) {
        this.database = database;

    }


    public void insert(String time, String latitude, String longitude) {
        sqLiteDatabase = database.getWritableDatabase();
        ContentValues values = new ContentValues();
//        values.put(database.ID, id);
        values.put(database.COL_1, time);
        values.put(database.COL_2, latitude);
        values.put(database.COL_3, longitude);

        sqLiteDatabase.insert(database.TABLE_NAME, null, values);

    }

    public void select(String time, String latitude, String longitude) {

        Log.d("databaseCheck", time +", "+ latitude+", "+longitude );

        sqLiteDatabase = database.getWritableDatabase();

        String sqlSelect = "SELECT time FROM dahda WHERE time=='" + time + "'";

        Cursor cursor = sqLiteDatabase.rawQuery(sqlSelect, null);

        while (cursor.moveToNext()) {
            Log.d("opopCheckCheckPlz2",cursor.getString(0));
        }

        if (cursor.getCount() == 0) {
            insert(time, latitude, longitude);
        } else {
            update(time, latitude, longitude);
        }

        cursor.close();

    }

    public void update(String time, String latitude, String longitude) {

        sqLiteDatabase = database.getWritableDatabase();
        String sqlUpdate = "UPDATE dahda SET time='" + time + "', latitude='" + latitude + "', " +
                "longitude='" + longitude +"' WHERE time =='"+time+"'";
        sqLiteDatabase.execSQL(sqlUpdate);

        Log.d("databaseUpdate","checkUpdate");

    }

    public void delete() {
        sqLiteDatabase = database.getWritableDatabase();

//        String sqlDelete = "DELETE FROM dahda WHERE time < DATE_SUB(NOW(),INTEVAL14DAY)";
        String sqlDelete = "DELETE FROM dahda";
        sqLiteDatabase.execSQL(sqlDelete);
    }

    public void dbclose() {
        sqLiteDatabase.close();
        database.close();
    }



}
