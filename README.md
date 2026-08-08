# MakersFriend - Design Profitability Calculator

A web app that helps laser-cutting makers (and other makers) validate design profitability before investing time and materials.

## Features

### Free Version
- Step-by-step wizard calculator
- Material cost input
- Labour rate and time tracking
- Monthly overhead calculation
- Basic break-even pricing
- Simple text results

### Paid Version (£3.99)
- All free features plus:
- Side-by-side bar chart comparison
- Etsy market data (price range, competitors, ratings)
- Save up to 3 design analyses
- Currency selector (GBP, EUR, USD)
- Optional "Buy Me a Coffee" tip button

## Local Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000 in your browser
```

## Deployment to Vercel (Recommended)

### Step 1: Push to GitHub
```bash
# Initialize git repo (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial MakersFriend commit"

# Create a repo on GitHub, then push:
git remote add origin https://github.com/YOUR_USERNAME/makersfriend.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repo
4. Vercel will auto-detect Next.js
5. Click "Deploy"
6. Your app will be live at `yourproject.vercel.app`

**That's it!** No configuration needed. Vercel handles everything.

---

## Deployment to Netlify (Alternative)

### Step 1: Push to GitHub (same as above)

### Step 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Select GitHub and authorize
4. Choose your repository
5. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
6. Click "Deploy site"

---

## Connecting Your Gumroad Link

The app automatically gates features based on payment status:

1. Free users see a "Preview" with basic results
2. When they click "Upgrade for £3.99", they're sent to your Gumroad link:
   - **Link:** `https://fitzy84.gumroad.com/l/awapcz`

### To update the Gumroad link:
Edit `makersfriend.jsx` and find this line:
```jsx
href="https://fitzy84.gumroad.com/l/awapcz"
```

Replace with your actual Gumroad URL.

---

## Testing Payment Flow (Local)

For testing, there's a "Try paid version (demo)" button that unlocks all features locally without payment. This is just for testing.

---

## Data & Privacy

- All calculations happen in the browser (no server-side processing)
- User data is saved to browser's localStorage (stays on their device)
- No analytics, no tracking
- Etsy market data is mocked/estimated in MVP

---

## Future Enhancements

- Real Etsy API integration for live market data
- User accounts + cloud sync
- PDF export of analyses
- Mobile app version
- Seasonality patterns database
- Pinterest/Google Trends integration

---

## Support

If you have questions or need modifications, let me know!

---

## License

Private/Proprietary - MakersFriend™
