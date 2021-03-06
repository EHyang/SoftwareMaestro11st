#!/bin/bash
USER=ubuntu
APPNAME=dahda
HOME=/home/$USER
APPPATH=/home/ubuntu/server
CMD=$APP/$APPNAME.sh
LOG=$HOME/deploy.log
APP=$HOME/$APPNAME
PIDF=$APP/$APPNAME.pid
ENV=$HOME/env
CONFIG=$HOME/development.json

/bin/echo "$(date '+%Y-%m-%d %X'): ** Before Install Hook Started **" >> $LOG 2>&1
/bin/echo "home: $HOME" >> $LOG 2>&1
/bin/echo "VERSION 0.85-test" >> $LOG 2>&1

# Do some actions before the installation

apt_wait () {
  while sudo fuser /var/lib/dpkg/lock >/dev/null 2>&1 ; do
    sleep 1
  done
  while sudo fuser /var/lib/apt/lists/lock >/dev/null 2>&1 ; do
    sleep 1
  done
  if [ -f /var/log/unattended-upgrades/unattended-upgrades.log ]; then
    while sudo fuser /var/log/unattended-upgrades/unattended-upgrades.log >/dev/null 2>&1 ; do
      sleep 1
    done
  fi
}

apt_wait

/bin/echo "$(date '+%Y-%m-%d %X'): ** Before Install Hook Completed **" >> $LOG 2>&1
