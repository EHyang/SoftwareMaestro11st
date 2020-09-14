#!/bin/bash
USER=ubuntu
APPNAME=dahda
HOME=/home/$USER
CMD=$APP/$APPNAME.sh
LOG=$HOME/deploy.log
APP=$HOME/$APPNAME
APPPATH=/home/ubuntu/server

/bin/echo "$(date '+%Y-%m-%d'): ** After Install Hook Started **" >> $LOG
/bin/echo "$(date '+%Y-%m-%d'): Changing owner and group of application... " >> $LOG

# verify that the application directory has the correct owner/group
/usr/bin/sudo /bin/chown -R $USER:$USER $APP

ls $APPPATH >> $LOG

# systemctl enable dahda

echo -e "Done" >> $LOG

cd $APPPATH
pwd >> $LOG
nvm install --lts
nvm use --lts
npm install >> $LOG

npm install forever -g >> $LOG

/bin/echo "$(date '+%Y-%m-%d %X'): ** After Install Hook Completed **" >> $LOG