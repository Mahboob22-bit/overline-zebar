#!/bin/bash

# Deploy script for overline-zebar widget pack
# Builds all widgets and deploys them to the Zebar directory

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Load configuration
source "$SCRIPT_DIR/deploy.config.sh"

echo -e "${YELLOW}=== Overline-Zebar Deploy Script ===${NC}"
echo ""

# Change to project root
cd "$PROJECT_ROOT"

# Step 1: Build all widgets
echo -e "${YELLOW}[1/3] Building all widgets...${NC}"
pnpm build
echo -e "${GREEN}✓ Build completed${NC}"
echo ""

# Step 2: Prepare deploy directory
echo -e "${YELLOW}[2/3] Preparing deploy directory...${NC}"
echo "  Target: $DEPLOY_DIR"

# Remove old deployment if exists
if [ -d "$DEPLOY_DIR" ]; then
    echo "  Removing old deployment..."
    rm -rf "$DEPLOY_DIR"
fi

# Create fresh deploy directory
mkdir -p "$DEPLOY_DIR"
echo -e "${GREEN}✓ Deploy directory ready${NC}"
echo ""

# Step 3: Copy files
echo -e "${YELLOW}[3/3] Copying files...${NC}"

# Copy zpack.json
cp "$PROJECT_ROOT/zpack.json" "$DEPLOY_DIR/"
echo "  ✓ zpack.json"

# Copy README.md
cp "$PROJECT_ROOT/README.md" "$DEPLOY_DIR/"
echo "  ✓ README.md"

# Copy resources folder
cp -r "$PROJECT_ROOT/resources" "$DEPLOY_DIR/"
echo "  ✓ resources/"

# Copy widget dist folders (only the ones defined in zpack.json)
WIDGETS=("main" "system-stats" "script-launcher" "config-widget")

for widget in "${WIDGETS[@]}"; do
    WIDGET_DIST="$PROJECT_ROOT/widgets/$widget/dist"
    if [ -d "$WIDGET_DIST" ]; then
        mkdir -p "$DEPLOY_DIR/widgets/$widget"
        cp -r "$WIDGET_DIST" "$DEPLOY_DIR/widgets/$widget/"
        echo "  ✓ widgets/$widget/dist/"
    else
        echo -e "  ${RED}✗ widgets/$widget/dist/ not found (skipped)${NC}"
    fi
done

echo ""
echo -e "${GREEN}=== Deployment completed successfully! ===${NC}"
echo ""
echo "Widget pack deployed to:"
echo "  $DEPLOY_DIR"
echo ""
echo "You can now restart Zebar to see the changes."

