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

touch ~/.bashrc
source $APPPATH/scripts/bash_profile.sh >> $LOG 2>&1
. $APPPATH/scripts/bash_profile.sh >> $LOG 2>&1
cat $APPPATH/scripts/bash_profile.sh | /bin/bash >> $LOG 2>&1

cd $HOME/server

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

/bin/echo "$(date '+%Y-%m-%d %X'): ** Application Start Hook Started **" >> $LOG 2>&1
/bin/echo "$(date '+%Y-%m-%d %X'): Event: $LIFECYCLE_EVENT" >> $LOG 2>&1

# touch ~/.bashrc

pwd >> $LOG 2>&1
cd $APPPATH
pwd >> $LOG 2>&1

id >> $LOG 2>&1

# npm install forever -g >> $LOG 2>&1


# forever start $APPPATH/server.js >> $LOG

# sudo kill -9 `ps -ef | grep 'node ./bin/www' | awk '{print $2}'`
# nohup npm start >/home/ubuntu/logs 2>&1 </home/ubuntu/errors &
# nohup npm start >> $LOG
forever stop server.js >> $LOG 2>&1


#sudo systemctl stop dahda

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