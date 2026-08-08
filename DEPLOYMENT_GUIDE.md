# MakersFriend - Step-by-Step Deployment Guide

This guide walks you through deploying MakersFriend to the web in ~15 minutes, with no coding required.

---

## Option A: Deploy to Vercel (RECOMMENDED - Easiest)

Vercel is the platform built by the creators of Next.js. It's free, fast, and takes 5 minutes.

### Prerequisites
- A GitHub account (free at github.com)
- A Vercel account (free at vercel.com)

### Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click the **+** icon (top right) → "New repository"
3. Name it: `makersfriend`
4. Choose "Public" (anyone can see the code, but only you can edit)
5. Click "Create repository"
6. You'll see a page with instructions. **Keep it open.**

### Step 2: Upload MakersFriend Code to GitHub

You now have a folder with all the MakersFriend files. Upload them to GitHub:

#### Option A1: Using GitHub's web interface (easiest, no command line)

1. On the GitHub page from Step 1, you'll see a section that says "Quick setup — if you've done this kind of thing before"
2. Scroll down and look for a green button "Add file" → "Upload files"
3. Drag and drop ALL the MakersFriend files/folders into the upload area:
   - `makersfriend.jsx`
   - `package.json`
   - `pages/` folder
   - `styles/` folder
   - `next.config.js`
   - `tailwind.config.js`
   - `postcss.config.js`
   - `.gitignore`
   - `README.md`
   - `vercel.json`

4. At the bottom, click "Commit changes"
5. Done! Your code is now on GitHub.

#### Option A2: Using the command line (faster if you're comfortable)

Open your terminal/command prompt and run:

```bash
cd /path/to/makersfriend

git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

git init
git add .
git commit -m "Initial MakersFriend upload"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/makersfriend.git
git push -u origin main
```

(Replace `YOUR_USERNAME` with your GitHub username)

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and log in with GitHub
2. Click "Add New..." → "Project"
3. You should see `makersfriend` in the list. Click "Import"
4. Vercel will auto-detect it's a Next.js project
5. Click "Deploy"
6. **Wait 1-2 minutes.** Your app will be live at a URL like `makersfriend-xyz.vercel.app`

✅ **Your app is live!**

---

## Option B: Deploy to Netlify

Netlify also works, but requires one extra step (specifying build settings).

### Step 1-2: Same as above (create GitHub repo + upload files)

### Step 3: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up (free, can use GitHub login)
2. Click "Add new site" → "Import an existing project"
3. Select GitHub and authorize Netlify
4. Choose your `makersfriend` repository
5. Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
6. Click "Deploy site"

✅ **Your app is live!**

---

## Testing Your Live App

Once deployed:

1. Open your app URL (e.g., `makersfriend-xyz.vercel.app`)
2. You should see the MakersFriend wizard
3. Click through the steps
4. At the end, you'll see either:
   - **Free version:** "Upgrade for £3.99" button (links to your Gumroad)
   - **Or:** Click "Try paid version (demo)" to test paid features locally

✅ **Everything working?** Great! Move to the next section.

---

## Connecting Your Gumroad Payment Link

The "Upgrade" button in the app needs to link to your Gumroad. Here's how to update it:

### Option 1: Edit in GitHub's web interface (easiest)

1. Open your GitHub repository
2. Click on the file `makersfriend.jsx`
3. Click the **pencil icon** (top right) to edit
4. Use Ctrl+F (or Cmd+F) to find: `https://fitzy84.gumroad.com/l/awapcz`
5. Replace it with your Gumroad link (from your Gumroad product page)
6. Scroll to bottom, click "Commit changes"
7. Vercel/Netlify will auto-redeploy your app (~1 min)

### Option 2: Edit locally and push to GitHub

1. Open `makersfriend.jsx` in a text editor
2. Find the line with `https://fitzy84.gumroad.com/l/awapcz`
3. Replace with your Gumroad URL
4. Save the file
5. In terminal, run:
```bash
git add makersfriend.jsx
git commit -m "Update Gumroad link"
git push
```

---

## Custom Domain (Optional)

Once your app is live on Vercel/Netlify, you can add a custom domain:

### Vercel:
1. Open your Vercel dashboard → select `makersfriend` project
2. Go to "Settings" → "Domains"
3. Add your domain (e.g., `makersfriend.com`)
4. Follow Vercel's instructions to update your domain's DNS

### Netlify:
1. Open your Netlify site → "Site settings" → "Domain management"
2. Add your domain
3. Update your domain registrar's DNS settings

---

## Troubleshooting

### App won't deploy
- Check that all files are in the repo
- Make sure `package.json` is in the root folder (not nested)

### "Upgrade" button doesn't work
- Check that your Gumroad link is correct
- Open browser console (F12) to see if there are errors

### Want to make changes?
- Edit files locally or in GitHub
- Push to GitHub (or commit in GitHub web interface)
- Vercel/Netlify auto-redeploys ~1 minute later

---

## You're Done! 🎉

Your MakersFriend app is live and ready to monetize. Share the link with makers and start earning.

**Next steps:**
- Promote on maker forums, Reddit (r/Etsy, r/makers), Facebook groups
- Add to your Etsy shop description
- Share on TikTok/Instagram maker communities
- Get early feedback from users

Good luck! 🚀
