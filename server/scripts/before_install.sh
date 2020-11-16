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

/bin/echo "$(date '+%Y-%m-%d %X'): ** Before Install Hook Completed **" >> $LOG 2>&1
