#!/bin/sh

set -euo pipefail
: "$SCHED_PATH"

echo "----> Updating schema.json"
pwd=$PWD
cd $SCHED_PATH
mix absinthe.schema.json --schema BlvdGraph.PlatformClient.Schema --pretty $pwd/schema.json
cd $pwd

echo "----> Generating bindings"
graphql-codegen --config codegen.yml