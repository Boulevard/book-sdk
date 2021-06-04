#!/bin/sh

set -u
: "$SCHED_PATH"

pwd=$PWD
cd $SCHED_PATH
mix absinthe.schema.json --schema BlvdGraph.PlatformClient.Schema --pretty $pwd/schema.json
cd $pwd
