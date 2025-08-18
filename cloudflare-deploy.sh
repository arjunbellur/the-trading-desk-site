#!/bin/bash

# Cloudflare Pages Deployment Script
# Deploy your React/Vite app to Cloudflare Pages

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 Cloudflare Pages Deployment Setup${NC}"

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo -e "${YELLOW}⚠️  Wrangler CLI not found. Installing...${NC}"
    npm install -g wrangler
fi

# Login to Cloudflare (if not already logged in)
echo -e "${BLUE}🔐 Authenticating with Cloudflare...${NC}"
wrangler auth

# Build the project
echo -e "${BLUE}🔨 Building project...${NC}"
npm run build

# Deploy to Cloudflare Pages
echo -e "${BLUE}📤 Deploying to Cloudflare Pages...${NC}"
wrangler pages deploy dist --project-name=trading-desk-site

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${GREEN}🌐 Your site will be available at: https://trading-desk-site.pages.dev${NC}"
