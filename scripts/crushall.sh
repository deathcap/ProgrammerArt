#!/bin/sh -xe
find . -name '*.png' -exec sh -c 'mv {} {}.tmp && pngcrush -rem alla -rem text {}.tmp {} && rm {}.tmp' \;
