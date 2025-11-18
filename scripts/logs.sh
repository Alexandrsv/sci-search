#!/bin/bash

echo -e "Логи Sci Search 🏗🏗🏗\n" | lolcat

ssh srv56 "cd ~/containers/sci-search; echo `pwd`; git pull; docker compose logs sci-search --tail 200 -f"