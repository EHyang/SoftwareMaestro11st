#!/bin/bash
USER=ubuntu
APPNAME=dahda
HOME=/home/$USER
CMD=$APP/$APPNAME.sh
LOG=$HOME/deploy.log
APP=$HOME/$APPNAME
PIDF=$APP/$APPNAME.pid
APPLOG=$APP/$APPNAME.log

# This example assumes the sample 'my_app.sh' script has been added to the the directory 'my_app' and serves as the application launcher

/bin/echo "$(date '+%Y-%m-%d %X'): ** Validate Service Hook Started **" >> $LOG

# Check that the application directory exists
if [ -d $APP ]
then
    /bin/echo "$(date '+%Y-%m-%d %X'): - Checking $APPLICATION_NAME Directory => SUCCESS" >> $LOG
else
    /bin/echo "$(date '+%Y-%m-%d %X'): - Checking $APPLICATION_NAME Directory => FAILED" >> $LOG
fi

# Check that launcher exists
if [ -f $CMD ]
then
    /bin/echo "$(date '+%Y-%m-%d %X'): - Checking $APPLICATION_NAME start script => SUCCESS" >> $LOG
else
    /bin/echo "$(date '+%Y-%m-%d %X'): - Checking $APPLICATION_NAME start script => FAILED" >> $LOG
fi


# Check if application was started successfully
if [ `$CMD is_running` -eq 1 ]
then
    WC=0
    if [ -f $PIDF ]
    then
        PID=`cat $PIDF`
        WC=`ps aux | grep $PID | grep -v grep | wc -c`
    fi

    if [ $WC -gt 0 ]
    then
        /bin/echo "$(date '+%Y-%m-%d %X'): - Checking $APPLICATION_NAME started => SUCCESS [$PID]" >> $LOG
    else
       rm $PIDF
        /bin/echo "$(date '+%Y-%m-%d %X'): - Checking $APPLICATION_NAME started => FAILURE" >> $LOG
        /bin/echo "$(date '+%Y-%m-%d %X'): - Could not start $APPLICATION_NAME" >> $APPLOG
    fi
else
    /bin/echo "$(date '+%Y-%m-%d %X'): - Checking $APPLICATION_NAME started => FAILED" >> $LOG
    /bin/echo "$(date '+%Y-%m-%d %X'): - Could not start $APPLICATION_NAME" >> $APPLOG
fi

/bin/echo "$(date '+%Y-%m-%d %X'): ***************************************************************************************" >> $APPLOG
/bin/echo "$(date '+%Y-%m-%d %X'): ** AWS CodeDeploy - Deployment complete - $APPLICATION_NAME - $DEPLOYMENT_ID **" >> $APPLOG
/bin/echo "$(date '+%Y-%m-%d %X'): ***************************************************************************************" >> $APPLOG

/bin/echo "$(date '+%Y-%m-%d %X'): ** Validate Service Hook Completed **" >> $LOG
/bin/echo "$(date '+%Y-%m-%d %X'): ****************************************************************" >> $LOG
/bin/echo "$(date '+%Y-%m-%d %X'): ** Deployment complete - $APPLICATION_NAME - $DEPLOYMENT_ID **" >> $LOG
/bin/echo "$(date '+%Y-%m-%d %X'): ****************************************************************" >> $LOG