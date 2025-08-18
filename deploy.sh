#!/bin/bash

# Trading Masters Deployment Script
# This script deploys the codebase to GitHub

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if we're in a git repository
check_git_repo() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "Not in a git repository!"
        exit 1
    fi
}

# Function to check for uncommitted changes
check_clean_working_tree() {
    if ! git diff-index --quiet HEAD --; then
        print_warning "You have uncommitted changes. They will be included in this deployment."
        echo "Modified files:"
        git status --porcelain
        echo ""
        read -p "Continue with deployment? (y/N): " -n 1 -r
        echo ""
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_error "Deployment cancelled."
            exit 1
        fi
    fi
}

# Function to get commit message
get_commit_message() {
    if [ -z "$1" ]; then
        echo "Enter commit message (or press Enter for default): "
        read -r commit_message
        if [ -z "$commit_message" ]; then
            commit_message="Deploy: $(date +'%Y-%m-%d %H:%M:%S') - Updated codebase with latest changes"
        fi
    else
        commit_message="$1"
    fi
}

# Function to run pre-deployment checks
run_pre_deployment_checks() {
    print_status "Running pre-deployment checks..."
    
    # Check if npm is available
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed or not in PATH"
        exit 1
    fi
    
    # Run linting
    print_status "Running ESLint..."
    if npm run lint; then
        print_success "Linting passed"
    else
        print_warning "Linting found issues. Continue anyway? (y/N): "
        read -p "" -n 1 -r
        echo ""
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_error "Deployment cancelled due to linting issues."
            exit 1
        fi
    fi
    
    # Run build test
    print_status "Testing build..."
    if npm run build; then
        print_success "Build test passed"
    else
        print_error "Build failed. Cannot deploy broken code."
        exit 1
    fi
}

# Main deployment function
deploy() {
    local commit_message="$1"
    local skip_checks="$2"
    
    print_status "Starting deployment to GitHub..."
    
    # Check if we're in a git repo
    check_git_repo
    
    # Run pre-deployment checks unless skipped
    if [ "$skip_checks" != "--skip-checks" ]; then
        run_pre_deployment_checks
    fi
    
    # Check for uncommitted changes
    check_clean_working_tree
    
    # Get commit message
    get_commit_message "$commit_message"
    
    # Add all changes
    print_status "Adding all changes to git..."
    git add .
    
    # Show what will be committed
    print_status "Files to be committed:"
    git status --short
    echo ""
    
    # Confirm deployment
    print_warning "Ready to deploy with message: '$commit_message'"
    read -p "Proceed with deployment? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_error "Deployment cancelled."
        exit 1
    fi
    
    # Commit changes
    print_status "Committing changes..."
    git commit -m "$commit_message"
    
    # Push to GitHub
    print_status "Pushing to GitHub..."
    if git push origin main; then
        print_success "Successfully deployed to GitHub!"
        print_success "Repository: https://github.com/arjunbellur/the-trading-desk-site.git"
        
        # Show the latest commit
        print_status "Latest commit:"
        git log --oneline -1
        
    else
        print_error "Failed to push to GitHub. Please check your connection and permissions."
        exit 1
    fi
}

# Help function
show_help() {
    echo "Trading Masters GitHub Deployment Script"
    echo ""
    echo "Usage: ./deploy.sh [options] [commit-message]"
    echo ""
    echo "Options:"
    echo "  -h, --help        Show this help message"
    echo "  --skip-checks     Skip pre-deployment checks (linting and build test)"
    echo "  --status         Show current git status"
    echo "  --force          Force deployment without prompts"
    echo ""
    echo "Examples:"
    echo "  ./deploy.sh                                    # Interactive deployment"
    echo "  ./deploy.sh \"Fix liquid glass buttons\"        # Deploy with custom message"
    echo "  ./deploy.sh --skip-checks \"Quick fix\"         # Skip checks and deploy"
    echo "  ./deploy.sh --status                           # Show git status"
    echo ""
}

# Parse command line arguments
case "$1" in
    -h|--help)
        show_help
        exit 0
        ;;
    --status)
        print_status "Current git status:"
        git status
        exit 0
        ;;
    --force)
        # Force deployment with minimal prompts
        commit_message="${2:-Deploy: $(date +'%Y-%m-%d %H:%M:%S') - Automated deployment}"
        print_status "Force deploying with message: '$commit_message'"
        git add .
        git commit -m "$commit_message"
        git push origin main
        print_success "Force deployment completed!"
        exit 0
        ;;
    *)
        # Normal deployment
        deploy "$1" "$2"
        ;;
esac
