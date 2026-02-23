# 📱 Access App on Phone & Tablet

Learn how to view your anime app from mobile devices and tablets while developing locally.

## 🚀 Quick Steps

### Step 1: Start Your Dev Server
```bash
npm run dev
```
Look for the output showing:
```
 Local:    http://localhost:5173/
```

### Step 2: Find Your Computer's IP Address

#### On Windows:
Open PowerShell and type:
```powershell
ipconfig
```
Look for **"IPv4 Address"** - Your address is:

✅ **`192.168.0.79`** ← Use this one!

#### On Mac/Linux:
```bash
ifconfig
```
Look for **"inet"** address (usually starts with 192.168.x.x)

### Step 3: Connect Phone/Tablet to Same WiFi Network
Make sure your mobile device is connected to the **same WiFi network** as your computer.

### Step 4: Open in Mobile Browser

On your phone or tablet, open the browser and type:
```
http://192.168.0.79:5173
```

**That's it!** Your IP is `192.168.0.79`

---

## ✅ Checklist

- [ ] Dev server running (`npm run dev`)
- [ ] Your IP is: **192.168.0.79** (from Ethernet adapter G.E.M.)
- [ ] Phone/tablet on same WiFi network (G.E.M.)
- [ ] Firewall allows port 5173 (see troubleshooting below)
- [ ] Accessed http://192.168.0.79:5173 in mobile browser

---

## 🔧 Troubleshooting

### Problem: "Can't reach the server" or "Connection refused"

**Solution 1: Check Firewall**
- On Windows, allow Node.js through firewall
- Or allow port 5173 in firewall settings

**Solution 2: Wrong IP Address**
- Your IP is: `192.168.0.79`
- Try pinging from your phone: `ping 192.168.0.79`

**Solution 3: Different Network**
- Make sure phone is on **same WiFi** as computer
- Not on public WiFi while computer is on home WiFi

### Problem: Shows "localhost" error

**Solution:** Don't use `localhost:5173` on phone
- Use your computer's **IP address** instead: `192.168.0.79:5173`
- Localhost only works on the same machine

### Problem: Works sometimes, then stops

**Solution:** Your IP address might have changed
- Run `ipconfig` again to check
- Some routers change IPs, consider setting static IP in router

---

## 💡 Tips

1. **Your IP address (save it!):**
   - **`192.168.0.79:5173`**
   - Keep this handy for testing!

2. **Test responsive design:**
   - Open DevTools on phone (Chrome: Menu → More tools → Developer tools)
   - Rotate device to test portrait/landscape

3. **Hot Reload works on mobile:**
   - Edit your code
   - Save the file
   - Your phone browser automatically refreshes! 🔄

4. **Share with team:**
   - Give them your IP and port: `192.168.0.79:5173`
   - They can test on their devices too!

---

## 🖥️ Advanced: Configure Vite (Optional)

If you want to always expose your dev server, edit `vite.config.js`:

```js
export default {
  server: {
    host: '0.0.0.0',  // Listen on all network interfaces
    port: 5173
  }
}
```

Then restart `npm run dev` and use your IP address.

---

## 📋 Common Commands Reference

| Command | What it does |
|---------|-------------|
| `ipconfig` | Find your computer's IP address |
| `npm run dev` | Start dev server on port 5173 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

**Enjoy testing on your devices!** 🎉
