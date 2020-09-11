#!/bin/bash

# This example assumes the sample '$APPNAME.sh' script has been added to the the directory '$APPNAME' and serves as the application launcher

USER=ubuntu
APPNAME=dahda
HOME=/home/$USER
# CMD=$APP/$APPNAME.sh
CMD="systemctl stop dahda"
LOG=$HOME/deploy.log
APP=$HOME/$APPNAME
PIDF=$APP/$APPNAME.pid

/bin/echo "$(date '+%Y-%m-%d %X'): ****************************************************************" >> $LOG
/bin/echo "$(date '+%Y-%m-%d %X'): Initializing Deployment for $APPLICATION_NAME - $DEPLOYMENT_ID " >> $LOG
/bin/echo "$(date '+%Y-%m-%d %X'): ****************************************************************" >> $LOG
/bin/echo "$(date '+%Y-%m-%d %X'): ** Application Stop Hook Started **" >> $LOG
/bin/echo "$(date '+%Y-%m-%d %X'): Event: $LIFECYCLE_EVENT" >> $LOG

cd $APP
sudo systemctl stop dahda

# if [ -f $CMD ]
# then
#     $CMD stop
#     /bin/echo "$(date '+%Y-%m-%d %X'): Stopping $APPLICATION_NAME" >> $LOG
# elif [ -f $PIDF ]
# then
#     PID=`cat $PIDF`
#     kill -9 $PID
#     /bin/echo "$(date '+%Y-%m-%d %X'): Killing $APPLICATION_NAME [$PID]" >> $LOG
#     rm $PIDF
# else
#     /bin/echo "$(date '+%Y-%m-%d %X'): $CMD not found. Proceeding with deployment" >> $LOG
# fi
/bin/echo "$(date '+%Y-%m-%d %X'): ** Application Stop Hook Completed **" >> $LOG