#!/bin/bash

echo -e "Выкатываю Sci Search 🏗🏗🏗\n" | lolcat

ssh srv56 "cd ~/containers/sci-search; echo `pwd`; git pull; docker compose up -d --build --remove-orphans"