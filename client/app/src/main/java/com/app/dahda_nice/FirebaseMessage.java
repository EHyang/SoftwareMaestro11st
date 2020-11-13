package com.app.dahda_nice;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;


public class FirebaseMessage extends FirebaseMessagingService {


    @Override
    public void onNewToken(@NonNull String s) {
        super.onNewToken(s);
        Log.d("FCM_TEST", s);

    }

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
//        String title = remoteMessage.getNotification().getTitle();
        String title = remoteMessage.getData().get("title");
        String message = remoteMessage.getData().get("body");
        String test = remoteMessage.getData().get("data");

        ContactLocation.searchLocation(test);

        Log.d("FirebasePushMessage",title+", "+message+", "+test);
        Intent intent = new Intent(this, ContactLocation.class);
        intent.putExtra("test", test);

        PendingIntent pendingIntent = PendingIntent.getActivity(this, 133, intent, PendingIntent.FLAG_UPDATE_CURRENT);


        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {

            String channel = "dahda";
            String channel_nm = "hwang";

            NotificationManager notichannel = (android.app.NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            NotificationChannel channelMessage = new NotificationChannel(channel, channel_nm,
                    android.app.NotificationManager.IMPORTANCE_DEFAULT);

            channelMessage.setDescription("Dahda Application");
            channelMessage.enableLights(true);
            channelMessage.setLightColor(Color.RED);
            channelMessage.enableVibration(true);
            channelMessage.setShowBadge(false);
            channelMessage.setVibrationPattern(new long[]{1000, 1000});
            notichannel.createNotificationChannel(channelMessage);

            //푸시알림을 Builder를 이용하여 만듭니다.
            NotificationCompat.Builder notificationBuilder =
                    new NotificationCompat.Builder(this, channel)
                            .setSmallIcon(R.drawable.number6)
                            .setColor(Color.RED)
                            .setContentTitle(title)//푸시알림의 제목
                            .setContentText(message)//푸시알림의 내용
                            .setChannelId(channel)
                            .setAutoCancel(true)//선택시 자동으로 삭제되도록 설정.
                            .setContentIntent(pendingIntent)//알림을 눌렀을때 실행할 인텐트 설정.
                            .setDefaults(Notification.DEFAULT_SOUND | Notification.DEFAULT_VIBRATE);

            NotificationManager notificationManager =
                    (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

            notificationManager.notify(9999, notificationBuilder.build());

        } else {
            NotificationCompat.Builder notificationBuilder =
                    new NotificationCompat.Builder(this, "")
                            .setSmallIcon(R.drawable.ic_launcher_background)
                            .setContentTitle(title)
                            .setContentText(message)
                            .setAutoCancel(true)
                            .setContentIntent(pendingIntent)
                            .setDefaults(Notification.DEFAULT_SOUND | Notification.DEFAULT_VIBRATE);

            NotificationManager notificationManager =
                    (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

            notificationManager.notify(9999, notificationBuilder.build());

        }
    }
}

