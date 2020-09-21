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
# /usr/bin/sudo /bin/chown -R $USER:$USER $APP

# touch ~/.bashrc

# ls $APPPATH >> $LOG 2>&1

# systemctl enable dahda

cd $APPPATH

source $APPPATH/scripts/bash_profile.sh >> $LOG 2>&1
. $APPPATH/scripts/bash_profile.sh >> $LOG 2>&1
cat $APPPATH/scripts/bash_profile.sh | /bin/bash >> $LOG 2>&1

npm install >> $LOG 2>&1

echo -e "NPM Install Done" >> $LOG 2>&1

# pwd >> $LOG 2>&1
# nvm install --lts
# nvm use --lts

/bin/echo "$(date '+%Y-%m-%d %X'): ** After Install Hook Completed **" >> $LOG