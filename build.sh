#!/bin/bash

# Exit script if it fails
# set -e
# exec "$0"

yarn build && cp -r ./build/* $HOME/docker/cra-docker/flask-app/static/