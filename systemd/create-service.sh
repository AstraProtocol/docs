#!/usr/bin/env bash

set -e

BASEDIR=$(dirname "$0")

ASTRAD_BINARY=$(which astrad || (echo -e "\033[31mPlease add astrad to PATH\033[0m" 1>&2 && exit 1))
ASTRAD_USER=$USER
ASTRAD_BINARY_DIR=$(dirname $(which astrad))
ASTRAD_USER_HOME=$(eval echo "~$USER")

sed "s#<ASTRAD_BINARY>#$ASTRAD_BINARY#g; s#<ASTRAD_USER>#$ASTRAD_USER#g; s#<ASTRAD_BINARY_DIR>#$ASTRAD_BINARY_DIR#g; s#<ASTRAD_USER_HOME>#$ASTRAD_USER_HOME#g" $BASEDIR/astrad.service.template > $BASEDIR/astrad.service

echo -e "\033[32mGenerated $BASEDIR/astrad.service\033[0m"

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  sudo cp $BASEDIR/astrad.service /etc/systemd/system/astrad.service
  sudo systemctl daemon-reload
  sudo systemctl enable astrad.service
  echo -e "\033[32mCreated /etc/systemd/system/astrad.service\033[0m"
else
  echo -e "\033[31mCan only create /etc/systemd/system/astrad.service for linux\033[0m" 1>&2
  exit 1
fi
