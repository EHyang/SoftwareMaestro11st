#!/bin/bash
USER=ubuntu
APPNAME=dahda
HOME=/home/$USER
CMD=$APP/$APPNAME.sh
LOG=$HOME/deploy.log
APP=$HOME/$APPNAME
PIDF=$APP/$APPNAME.pid

/bin/echo "$(date '+%Y-%m-%d %X'): ** Before Install Hook Started **" >> $LOG

# Do some actions before the installation
pwd >> $LOG
sudo cp $HOME/server/$APPNAME.service /etc/systemd/system

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash >> $LOG

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm install --lts
nvm use --lts
npm install >> $LOG

/bin/echo "$(date '+%Y-%m-%d %X'): ** Before Install Hook Completed **" >> $LOG