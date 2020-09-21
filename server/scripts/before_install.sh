#!/bin/bash
USER=ubuntu
APPNAME=dahda
HOME=/home/$USER
APPPATH=/home/ubuntu/server
CMD=$APP/$APPNAME.sh
LOG=$HOME/deploy.log
APP=$HOME/$APPNAME
PIDF=$APP/$APPNAME.pid

/bin/echo "$(date '+%Y-%m-%d %X'): ** Before Install Hook Started **" >> $LOG 2>&1
/bin/echo "home: $HOME" >> $LOG 2>&1
/bin/echo "VERSION 0.7-test" >> $LOG 2>&1


# Do some actions before the installation
cd $APPPATH

source $APPPATH/scripts/bash_profile.sh >> $LOG 2>&1
. $APPPATH/scripts/bash_profile.sh >> $LOG 2>&1
cat $APPPATH/scripts/bash_profile.sh | /bin/bash >> $LOG 2>&1

pwd >> $LOG 2>&1
ls >> $LOG 2>&1
ls $APPPATH >> $LOG 2>&1

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash >> $LOG 2>&1

pwd >> $LOG 2>&1

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

nvm install --lts >> $LOG 2>&1
nvm use --lts >> $LOG 2>&1

npm install forever -g >> $LOG 2>&1

/bin/echo "$(date '+%Y-%m-%d %X'): ** Before Install Hook Completed **" >> $LOG 2>&1
