# 📘 Haneesh Portfolio – Full Management Guide
### Everything you need to know to manage your portfolio

---

## 📁 Your Project Location
Your portfolio files are saved at:
```
C:\Users\2025\Documents\haneesh portfolio\
```
Your live website: **https://haneesh7.github.io/haneesh-portfolio/**
Your GitHub repo: **https://github.com/haneesh7/haneesh-portfolio**

---

## 🖥️ PART 1 — Running On Your PC (Local Development)

### ▶️ Start the website on your computer

1. Open **VS Code** (or any terminal)
2. Open a terminal and type exactly:
```
cd "C:\Users\2025\Documents\haneesh portfolio"
npm run dev
```
3. Open your browser and go to: **http://localhost:5173/**
4. You'll see your portfolio live on your computer only ✅

### ⏹️ Stop the local server

- Press `Ctrl + C` in the terminal window
- The site on localhost will stop working (your live link is still fine)

### 🔄 Restart after computer restart

Just repeat the "Start" steps above — run `npm run dev` again.

---

## 🗂️ PART 2 — Adding a New Project

### Step 1 – Add your project image
1. Go to `C:\Users\2025\Documents\haneesh portfolio\public\images\`
2. Copy your project screenshot/image in there
3. Name it simply, e.g. `project_new.png`

### Step 2 – Edit the Work component
1. Open this file in VS Code:
   `src\components\Work.tsx`
2. Find this section (around line 56):
```tsx
[
  { num: "01", name: "...", category: "...", tools: "...", image: "..." },
  { num: "02", name: "...", ... },
  { num: "03", name: "...", ... }
]
```
3. Add a new project by copying one block and changing the details:
```tsx
{
  num: "04",
  name: "Your New Project Name",
  category: "Your Category (e.g. Deep Learning)",
  tools: "Python, TensorFlow",
  image: import.meta.env.BASE_URL + "images/project_new.png"
},
```

### Step 3 – Save and check it works
- The dev server will auto-refresh at http://localhost:5173/
- Scroll to the Work section and verify your new project appears

---

## 🗑️ PART 3 — Removing a Project

1. Open `src\components\Work.tsx`
2. Find the project block you want to remove (the `{ num: "01", ... }` block)
3. Delete the entire block including the commas
4. Save the file

---

## 💼 PART 4 — Editing Your Career / Experience Section

1. Open `src\components\Career.tsx`
2. Each experience/education is a `<div className="career-info-box">` block
3. To add a new one, copy an existing block and paste it above or below
4. Edit the text inside `<h4>` (role), `<h5>` (institution), `<h3>` (date), and `<p>` (description)
5. Save and check localhost

---

## 📤 PART 5 — Publishing Changes to GitHub (Updating Live Site)

Every time you make any change and want it live, follow these 3 steps:

### Open your terminal and run:
```bash
cd "C:\Users\2025\Documents\haneesh portfolio"
"C:\Program Files\Git\bin\git.exe" add .
"C:\Program Files\Git\bin\git.exe" commit -m "Your message here"
"C:\Program Files\Git\bin\git.exe" push origin master
```

Replace `"Your message here"` with what you changed, e.g.:
- `"Add new YOLOv9 project"`
- `"Update internship details"`

After pushing, your live site will **automatically rebuild in ~2 minutes**.

---

## 🌐 PART 6 — Checking the Live Site Build Status

1. Go to: https://github.com/haneesh7/haneesh-portfolio/actions
2. You'll see a list of recent builds
3. A green ✅ means the site deployed successfully
4. A red ❌ means something went wrong (check the logs)

---

## ❌ PART 7 — Taking the Site OFFLINE (Removing from GitHub Pages)

### Option A: Disable GitHub Pages (site goes offline, code stays)
1. Go to: https://github.com/haneesh7/haneesh-portfolio/settings/pages
2. Under "Source", change it to **None**
3. Click Save
4. Your site will go offline but your code is still on GitHub

### Option B: Delete the repository entirely (permanent removal)
1. Go to: https://github.com/haneesh7/haneesh-portfolio/settings
2. Scroll all the way to the bottom — "Danger Zone"
3. Click **"Delete this repository"**
4. Type the repo name to confirm
5. Everything is permanently deleted ⚠️

---

## 🧹 PART 8 — Common Git Commands (Quick Reference)

| What you want to do | Command |
|---|---|
| See what files changed | `git status` |
| See your commit history | `git log --oneline` |
| Save changes (stage + commit) | `git add . && git commit -m "message"` |
| Push to live GitHub | `git push origin master` |
| Undo last change (before push) | `git revert HEAD` |
| Pull latest from GitHub to PC | `git pull origin master` |

> 💡 Always use the full path: `"C:\Program Files\Git\bin\git.exe"` until Git is in your system PATH.

---

## 📦 PART 9 — Install Everything Fresh (If you get a new PC)

1. Install **Node.js** from https://nodejs.org (choose LTS version)
2. Install **Git** from https://git-scm.com/download/win
3. Open terminal and run:
```bash
git clone https://github.com/haneesh7/haneesh-portfolio.git
cd haneesh-portfolio
npm install
npm run dev
```
4. Your portfolio is now running on the new PC! 🎉

---

## 🔑 PART 10 — Login to GitHub Again (If needed)

If you ever need to push from a new machine and Git asks for login:

1. Install GitHub CLI from https://cli.github.com
2. Run in terminal:
```bash
gh auth login
```
3. Choose **GitHub.com** → **Web Browser**
4. Copy the code shown, paste it at https://github.com/login/device
5. Done! You can push again.

---

## 📋 Quick Cheat Sheet

```
START DEV SERVER:    npm run dev
STOP DEV SERVER:     Ctrl + C
PUSH CHANGES LIVE:   git add . → git commit -m "msg" → git push origin master
CHECK LIVE BUILD:    https://github.com/haneesh7/haneesh-portfolio/actions
YOUR LIVE LINK:      https://haneesh7.github.io/haneesh-portfolio/
```

---

*Made for Haneesh Gowda R — June 2026*
