# GitHub Deployment Scripts

This repository includes two deployment scripts to help you deploy your code to GitHub efficiently.

## 📋 Prerequisites

- Git repository already initialized (✅ Already done)
- GitHub repository set up (✅ Already done: `the-trading-desk-site`)
- Node.js and npm installed
- Git credentials configured

## 🚀 Deployment Options

### 1. Full Deployment Script (`deploy.sh`)

**Recommended for production deployments**

```bash
./deploy.sh
```

**Features:**
- ✅ Pre-deployment checks (linting, build test)
- ✅ Interactive prompts for safety
- ✅ Shows what files will be committed
- ✅ Colored output for better visibility
- ✅ Error handling and rollback protection

**Usage Examples:**

```bash
# Interactive deployment with all checks
./deploy.sh

# Deploy with custom commit message
./deploy.sh "Added liquid glass buttons with Apple design compliance"

# Skip pre-deployment checks (faster)
./deploy.sh --skip-checks "Quick fix for button variants"

# Force deployment without prompts (use carefully)
./deploy.sh --force "Automated deployment"

# Check current git status
./deploy.sh --status

# Show help
./deploy.sh --help
```

### 2. Quick Deploy Script (`quick-deploy.sh`)

**For rapid iterations and small fixes**

```bash
./quick-deploy.sh
```

**Features:**
- ⚡ Fast deployment without checks
- 🎯 Minimal prompts
- 📝 Auto-generated commit messages
- 🎨 Clean, emoji-rich output

**Usage Examples:**

```bash
# Quick deploy with auto-generated message
./quick-deploy.sh

# Quick deploy with custom message
./quick-deploy.sh "Fixed BlurInView animations"
```

## 🛠️ Manual Deployment Commands

If you prefer to run commands manually:

```bash
# Add all changes
git add .

# Commit with message
git commit -m "Your commit message"

# Push to GitHub
git push origin main
```

## ⚠️ Important Notes

1. **Current Repository**: `https://github.com/arjunbellur/the-trading-desk-site.git`
2. **Branch**: `main` (default)
3. **Always test locally** before deploying
4. **Use descriptive commit messages** for better project history

## 🔧 Troubleshooting

### Permission Denied
```bash
chmod +x deploy.sh
chmod +x quick-deploy.sh
```

### Git Authentication Issues
```bash
# Configure git credentials if needed
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# For HTTPS authentication, you may need a Personal Access Token
# Go to GitHub Settings > Developer settings > Personal access tokens
```

### Build Failures
```bash
# Run build test manually
npm run build

# Run linting manually
npm run lint
```

## 📁 Current Deployment Status

Your repository currently has these pending changes:
- Modified files: Multiple component updates
- New files: BlurInView component, Magic UI components, Liquid Glass button
- Deleted files: ParticleBackground, globals.css

Run `./deploy.sh --status` to see current git status anytime.

## 🎯 Best Practices

1. **Use the full deployment script** for important changes
2. **Test the build locally** before deploying
3. **Write meaningful commit messages**
4. **Deploy frequently** to avoid large, complex merges
5. **Use quick deploy** only for minor fixes and iterations

## 🆘 Need Help?

Run `./deploy.sh --help` for detailed usage information.
