#!/usr/bin/env bash

read -p "Install apidoc? [y/n] " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]
then
    sudo npm install apidoc -g
fi

apidoc -i . -o ../../public/api/doc/
