#!/bin/bash
USER=ubuntu
APPNAME=dahda
HOME=/home/$USER
APPPATH=/home/ubuntu/server
CMD=$APP/$APPNAME.sh
LOG=$HOME/deploy.log
APP=$HOME/$APPNAME
PIDF=$APP/$APPNAME.pid

/bin/echo "$(date '+%Y-%m-%d %X'): ** Before Install Hook Started **" >> $LOG
/bin/echo "home: $HOME" >> $LOG

# Do some actions before the installation
cd $APPPATH
pwd >> $LOG
ls >> $LOG
ls $APPPATH >> $LOG
sudo cp $APPPATH/$APPNAME.service /etc/systemd/system

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash >> $LOG

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
cd $APPPATH
pwd >> $LOG
nvm install --lts >> $LOG
nvm use --lts >> $LOG
npm install >> $LOG

npm install forever -g >> $LOG

/bin/echo "$(date '+%Y-%m-%d %X'): ** Before Install Hook Completed **" >> $LOG