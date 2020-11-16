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
/bin/echo "VERSION 0.8-test" >> $LOG 2>&1

# Do some actions before the installation

sudo apt install awscli -y
aws ssm get-parameters --region ap-northeast-2 --names Dahda-Environment-Variables --with-decryption --query Parameters[0].Value >> $LOG 2>&1

/bin/echo "$(date '+%Y-%m-%d %X'): ** Before Install Hook Completed **" >> $LOG 2>&1
