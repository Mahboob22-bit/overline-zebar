#!/bin/bash

# ===========================================
# Deploy Configuration
# ===========================================
# Edit these values to customize your deployment

# Widget pack name (will be used as folder name prefix)
# Format: <author>.<widget-name>
WIDGET_NAME="mahboobulla.overline-zebar-dev"

# Version number
VERSION="1.0.0"

# Zebar installation directory
ZEBAR_DIR="$HOME/.glzr/zebar"

# ===========================================
# Do not edit below this line
# ===========================================
DEPLOY_DIR="$ZEBAR_DIR/${WIDGET_NAME}@${VERSION}"

