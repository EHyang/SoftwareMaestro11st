#!/bin/bash
USER=ubuntu
APPNAME=dahda
HOME=/home/$USER
# CMD=$APP/$APPNAME.sh
CMD="sudo systemctl start $APPNAME"
LOG=$HOME/deploy.log
APPPATH=/home/ubuntu/server

# This example assumes the sample 'my_app.sh' script has been added to the the directory 'my_app' and serves as the application launcher

/bin/echo "$(date '+%Y-%m-%d %X'): ** Application Start Hook Started **" >> $LOG
/bin/echo "$(date '+%Y-%m-%d %X'): Event: $LIFECYCLE_EVENT" >> $LOG

pwd >> $LOG
cd $APPPATH
pwd >> $LOG
#npm start

cd $APPPATH
pwd >> $LOG

ls >> $LOG

nvm install --lts
nvm use --lts
npm install >> $LOG
npm -v >> $LOG
node -v >> $LOG

npm install forever -g >> $LOG

# forever start $APPPATH/server.js >> $LOG

# sudo kill -9 `ps -ef | grep 'node ./bin/www' | awk '{print $2}'`
# nohup npm start >/home/ubuntu/logs 2>&1 </home/ubuntu/errors &
nohup npm start >> $LOG

# sudo systemctl start $APPNAME

# if [ -f $CMD ]
# then
#     echo $APP >> $LOG
#     pwd >> $LOG
#     # $CMD start
#     # npm start
#     /bin/echo "$(date '+%Y-%m-%d %X'): Starting $APPLICATION_NAME" >> $LOG
# else
#     /bin/echo "$(date '+%Y-%m-%d %X'): $CMD not found. Proceeding with deployment" >> $LOG
# fi
/bin/echo "$(date '+%Y-%m-%d %X'): ** Application Start Hook Completed **" >> $LOG
