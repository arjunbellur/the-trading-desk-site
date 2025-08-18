#!/bin/bash

# Quick Deploy Script for Trading Masters
# Fast deployment without extensive checks

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Quick Deploy to GitHub${NC}"

# Get commit message or use default
COMMIT_MSG="${1:-Quick deploy: $(date +'%Y-%m-%d %H:%M:%S')}"

echo -e "${BLUE}📝 Commit message: ${NC}$COMMIT_MSG"

# Add, commit, and push
echo -e "${BLUE}📦 Adding files...${NC}"
git add .

echo -e "${BLUE}💾 Committing...${NC}"
git commit -m "$COMMIT_MSG"

echo -e "${BLUE}⬆️  Pushing to GitHub...${NC}"
git push origin main

echo -e "${GREEN}✅ Deployed successfully!${NC}"
echo -e "${GREEN}🔗 Repository: https://github.com/arjunbellur/the-trading-desk-site.git${NC}

# Show latest commit
git log --oneline -1
