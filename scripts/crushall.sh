#!/bin/sh -xe
pushd ..
mkdir -p /tmp/textures/{items,blocks}/
pngcrush -rem alla -rem text -d /tmp/textures/items/ textures/items/*
pngcrush -rem alla -rem text -d /tmp/textures/blocks/ textures/blocks/*
cp /tmp/textures/items/* textures/items/
cp /tmp/textures/blocks/* textures/blocks/
popd

