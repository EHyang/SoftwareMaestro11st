#!/bin/bash
USER=ubuntu
APPNAME=dahda
HOME=/home/$USER
CMD=$APP/$APPNAME.sh
LOG=$HOME/deploy.log
APP=$HOME/$APPNAME
APPPATH=/home/ubuntu/server
CONFIG=$HOME/development.json

/bin/echo "$(date '+%Y-%m-%d'): ** After Install Hook Started **" >> $LOG
/bin/echo "$(date '+%Y-%m-%d'): Changing owner and group of application... " >> $LOG

cd $APPPATH

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash >> $LOG 2>&1

pwd >> $LOG 2>&1

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

nvm install --lts >> $LOG 2>&1
nvm use --lts >> $LOG 2>&1

npm install forever -g >> $LOG 2>&1

npm install >> $LOG 2>&1

echo -e "NPM Install Done" >> $LOG 2>&1


sudo apt install jq -y >> $LOG 2>&1

sudo apt install awscli -y >> $LOG 2>&1

sudo chown -R ubuntu:ubuntu server/ >> $LOG 2>&1

aws ssm get-parameters --region ap-northeast-2 --names Dahda-Environment-Variables --with-decryption --query Parameters[0].Value | jq -rc . > $APPPATH/config/development.json >> $LOG 2>&1

/bin/echo "$(date '+%Y-%m-%d %X'): ** After Install Hook Completed **" >> $LOG