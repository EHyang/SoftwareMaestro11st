#!/bin/bash
USER=ubuntu
APPNAME=dahda
HOME=/home/$USER
# CMD=$APP/$APPNAME.sh
# CMD="sudo systemctl start $APPNAME"
LOG=$HOME/deploy.log
APPPATH=/home/ubuntu/server

# This example assumes the sample 'my_app.sh' script has been added to the the directory 'my_app' and serves as the application launcher

# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

/bin/echo "$(date '+%Y-%m-%d %X'): ** Application Start Hook Started **" >> $LOG 2>&1
/bin/echo "$(date '+%Y-%m-%d %X'): Event: $LIFECYCLE_EVENT" >> $LOG 2>&1

# touch ~/.bashrc

pwd >> $LOG 2>&1
cd $APPPATH
pwd >> $LOG 2>&1
#npm start

source $APPPATH/scripts/bash_profile.sh >> $LOG 2>&1
. $APPPATH/scripts/bash_profile.sh >> $LOG 2>&1
cat $APPPATH/scripts/bash_profile.sh | /bin/bash >> $LOG 2>&1

# cd $APPPATH
# pwd >> $LOG 2>&1

# ls >> $LOG 2>&1

# nvm install --lts
# nvm use --lts
# npm install >> $LOG 2>&1
# npm -v >> $LOG 2>&1
# node -v >> $LOG 2>&1

id >> $LOG 2>&1

# npm install forever -g >> $LOG 2>&1


# forever start $APPPATH/server.js >> $LOG

# sudo kill -9 `ps -ef | grep 'node ./bin/www' | awk '{print $2}'`
# nohup npm start >/home/ubuntu/logs 2>&1 </home/ubuntu/errors &
# nohup npm start >> $LOG
forever start server.js >> $LOG 2>&1

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
