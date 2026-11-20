#!/bin/bash

REPO="us-east1-docker.pkg.dev/whitestack-public-docs/whitestack-public-docs"
NAME="whitecruiser-openebs"
DOCKERFILE=Dockerfile
TAG="$(date -u +%Y%m%d-%H%M%S)"

npm run build

docker buildx build --platform linux/amd64 -f "$DOCKERFILE" -t "$REPO/docs-$NAME:$TAG" -t "$REPO/docs-$NAME:PROD" --push .

gcloud run services update "docs-gateway-$NAME" \
    --image="$REPO/docs-$NAME:PROD" \
    --region=us-east1 \
    --project=whitestack-public-docs
