# 🚀 Deploy to Cloudflare Pages - Complete Guide

Get your Trading Masters site live with a free Cloudflare Pages deployment!

## 🎯 Quick Start (Recommended Method)

### **Option 1: Cloudflare Dashboard (Easiest)**

1. **Go to Cloudflare Pages**
   - Visit: [dash.cloudflare.com](https://dash.cloudflare.com)
   - Sign up for free (if you don't have an account)

2. **Create New Project**
   - Click **"Pages"** in sidebar
   - Click **"Create a project"**
   - Click **"Connect to Git"**

3. **Connect GitHub**
   - Click **"Connect GitHub"**
   - Authorize Cloudflare
   - Select: `arjunbellur/the-trading-desk-site`

4. **Configure Build Settings**
   ```
   Project name: trading-desk-site
   Production branch: main
   Framework preset: Vite
   Build command: npm run build
   Build output directory: dist
   Environment variables: (none needed)
   ```

5. **Deploy!**
   - Click **"Save and Deploy"**
   - Your site will be live at: `https://trading-desk-site.pages.dev`

---

### **Option 2: Command Line (Advanced)**

Run this command in your terminal:

```bash
./cloudflare-deploy.sh
```

This script will:
- Install Wrangler CLI if needed
- Authenticate with Cloudflare
- Build your project
- Deploy to Cloudflare Pages

---

## 🔧 Manual CLI Setup

If you prefer step-by-step CLI:

```bash
# 1. Install Wrangler CLI
npm install -g wrangler

# 2. Login to Cloudflare
wrangler auth

# 3. Build your project
npm run build

# 4. Deploy
wrangler pages deploy dist --project-name=trading-desk-site
```

---

## 🌐 Your Live Site URLs

After deployment, your site will be available at:

- **Primary**: `https://trading-desk-site.pages.dev`
- **Custom Domain**: You can add your own domain later

---

## ⚙️ Build Configuration Details

**For Vite/React projects like yours:**

| Setting | Value |
|---------|-------|
| Framework | Vite |
| Build Command | `npm run build` |
| Build Output | `dist` |
| Node Version | 18+ (automatic) |
| Install Command | `npm install` |

---

## 🚀 Auto-Deployment Setup

Once connected, Cloudflare will automatically:
- ✅ Deploy when you push to `main` branch
- ✅ Create preview deployments for PRs
- ✅ Run builds in their environment
- ✅ Serve your site globally via CDN

---

## 🔄 Update Your Live Site

After initial setup, to update your live site:

1. **Make changes locally**
2. **Deploy to GitHub** (using your existing script):
   ```bash
   ./deploy.sh "Updated site with new features"
   ```
3. **Cloudflare automatically rebuilds** your live site!

---

## 🛠️ Troubleshooting

### Build Fails?
```bash
# Test build locally first
npm run build

# Check for any errors in build output
# Fix any issues, then redeploy
```

### Environment Variables Needed?
- Go to Cloudflare Pages dashboard
- Select your project
- Go to Settings > Environment variables
- Add any needed variables

### Custom Domain?
- In Cloudflare Pages dashboard
- Go to Custom domains
- Add your domain
- Follow DNS setup instructions

---

## 📊 Benefits of Cloudflare Pages

- ✅ **Free tier** with generous limits
- ✅ **Global CDN** for fast loading
- ✅ **Auto SSL certificates**
- ✅ **Git integration** for auto-deployment
- ✅ **Preview deployments** for branches
- ✅ **Analytics** and performance monitoring
- ✅ **Custom domains** support

---

## 🎯 Next Steps After Deployment

1. **Test your live site** thoroughly
2. **Share the live URL** with others
3. **Set up custom domain** (optional)
4. **Monitor performance** in Cloudflare dashboard
5. **Use preview deployments** for testing changes

---

## 🆘 Need Help?

- **Cloudflare Docs**: [developers.cloudflare.com/pages](https://developers.cloudflare.com/pages/)
- **Build Issues**: Check the build logs in Cloudflare dashboard
- **Domain Issues**: Use Cloudflare's DNS settings

---

## 🚀 Quick Command

**Ready to deploy right now?**

```bash
# Option 1: Use the dashboard (recommended)
open https://dash.cloudflare.com

# Option 2: Use CLI script
./cloudflare-deploy.sh
```

**Your Trading Masters site will be live in minutes! 🎉**
