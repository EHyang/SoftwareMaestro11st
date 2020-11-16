#!/bin/bash
USER=ubuntu
APPNAME=dahda
HOME=/home/$USER
APPPATH=/home/ubuntu/server
CMD=$APP/$APPNAME.sh
LOG=$HOME/deploy.log
APP=$HOME/$APPNAME
PIDF=$APP/$APPNAME.pid
ENV=$HOME/.env

/bin/echo "$(date '+%Y-%m-%d %X'): ** Before Install Hook Started **" >> $LOG 2>&1
/bin/echo "home: $HOME" >> $LOG 2>&1
/bin/echo "VERSION 0.85-test" >> $LOG 2>&1

# Do some actions before the installation

apt install awscli -y $LOG 2>&1
aws ssm get-parameters --region ap-northeast-2 --names Dahda-Environment-Variables --with-decryption --query Parameters[0].Value >> $ENV 2>&1
source $ENV >> $LOG 2>&1

/bin/echo "$(date '+%Y-%m-%d %X'): ** Before Install Hook Completed **" >> $LOG 2>&1
