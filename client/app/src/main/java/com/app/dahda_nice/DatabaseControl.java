package com.app.dahda_nice;

import android.content.ContentValues;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

public class DatabaseControl {

    Database database;
    SQLiteDatabase sqLiteDatabase;
    private final int PIVOT_TIME = 504;

    public DatabaseControl(Database database) {
        this.database = database;
    }


    public void insert(String id, int time, String latitude, String longitude) {
        sqLiteDatabase = database.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(database.ID, id);
        values.put(database.COL_1, time);
        values.put(database.COL_2, latitude);
        values.put(database.COL_3, longitude);

        sqLiteDatabase.insert(database.TABLE_NAME, null, values);

    }

    public void select(String id, int time, String latitude, String longitude) {
        sqLiteDatabase = database.getWritableDatabase();

        String sqlSelect = "SELECT id FROM dahda WHERE id ==" + id;

        Cursor cursor = sqLiteDatabase.rawQuery(sqlSelect, null);

        if (cursor.getCount() == 0) {
            insert(id, time, latitude, longitude);
        } else {
            update(id, time, latitude, longitude);
        }

        cursor.close();

    }

    public void update(String id, int time, String latitude, String longitude) {
        sqLiteDatabase = database.getWritableDatabase();
        String sqlUpdate = "UPDATE dahda SET time=" + time + ", latitude=" + latitude + ", " +
                "longitude=" + longitude +" WHERE id =="+id;
        sqLiteDatabase.execSQL(sqlUpdate);

    }

    public void delete(int time) {
        sqLiteDatabase = database.getWritableDatabase();
        String sqlDelete = "DELETE FROM dahda a WHERE a.time +" + PIVOT_TIME + "<" +time;
        sqLiteDatabase.execSQL(sqlDelete);
    }

    public void dbclose() {
        sqLiteDatabase.close();
        database.close();
    }
}
