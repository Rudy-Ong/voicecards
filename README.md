# Voice Postcard

Record a short voice message in the browser and print it as a card with a QR
code on it. Whoever scans the code hears your message. There are no accounts
for the recipient, no app to install, and no database.

<p align="center">
  <img src="img/step4-card-wedding.png" alt="A printed A5 wedding card for Sofia & Mateo with a QR code" width="360">
</p>

Card designs are included for **weddings, birthdays, new babies and
farewells**, plus a classic style. You can print on **A5** or **B5**, in
portrait or landscape.

---

## Contents

- [How it works](#how-it-works)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Walkthrough: a wedding card, step by step](#walkthrough-a-wedding-card-step-by-step)
- [Other occasions](#other-occasions)
- [Local development](#local-development)
- [Repository layout](#repository-layout)
- [Privacy and limits](#privacy-and-limits)
- [License](#license)

---

## How it works

```
 ┌───────────── your browser ──────────────────┐
 │ index.html (recorder mode)                  │
 │   1. record with the microphone             │
 │   2. keep a local copy in the browser       │
 │   3. upload clip to Cloudinary              │
 │   4. print a card with a QR code for        │
 │      the Cloudinary audio URL               │
 └─────────────────────────────────────────────┘
                     │ print, mail, hand over
                     ▼
 ┌──────────── recipient's phone ──────────────┐
 │ res.cloudinary.com/<cloud>/video/upload/…   │
 │   plays the audio straight from Cloudinary  │
 └─────────────────────────────────────────────┘
```

- **The QR code points straight at the audio file.** It holds the Cloudinary
  URL, for example
  `https://res.cloudinary.com/<cloud-name>/video/upload/voice-postcards/<id>.mp3`,
  so a printed card keeps working even if the site moves or goes offline.
  The `.mp3` ending makes Cloudinary convert the recording on the fly, so it
  plays on any phone.
- **Cloudinary hosts the audio.** The browser uploads the clip straight to
  Cloudinary through an unsigned upload preset and gets back a public HTTPS
  link.
- **No server needed.** The site is a single static page, so any static host
  works (GitHub Pages, Netlify, Cloudflare Pages).

---

## Prerequisites

| Requirement                 | Purpose                                          | Cost |
| --------------------------- | ------------------------------------------------ | ---- |
| A **Cloudinary** account    | Stores the recorded audio                        | Free plan |
| A **GitHub** account        | Holds the code and hosts the page (GitHub Pages) | Free |
| A browser with a microphone | Recording (recent Chrome, Edge, Firefox, Safari) | — |
| Node.js 18+ *(optional)*    | Running the page locally                         | Free |

---

## Setup

### 1. Get the code

Fork this repo on GitHub, or clone it and push it to a new repo:

```bash
git clone https://github.com/Rudy-Ong/voicecards.git
cd voicecards
```

### 2. Set up Cloudinary

1. Sign up at <https://cloudinary.com/users/register_free>.
2. Copy the **Cloud name** from the Console dashboard.
3. Go to **Settings → Upload → Upload presets → Add upload preset** and set:

   | Setting         | Value                              |
   | --------------- | ---------------------------------- |
   | Signing Mode    | **Unsigned**                       |
   | Asset folder    | `voice-postcards`                  |
   | Allowed formats | `webm, ogg, m4a, mp4, mp3, wav`    |
   | Max file size   | about 10 MB                        |

4. Save and copy the preset name.

### 3. Add the Cloudinary details

Open `index.html` and fill in the two values near the top of the script:

```js
const CLOUDINARY_CLOUD_NAME = 'your-cloud-name';
const CLOUDINARY_UPLOAD_PRESET = 'your-preset-name';
```

Commit and push. Leaving these as placeholders also works: enter both values
on the site under **Fallback: unsigned upload** instead. That way they're
stored only in that browser.

### 4. Publish

In the GitHub repo, go to **Settings → Pages**, choose **Deploy from a
branch**, pick `master` and `/ (root)`, then save. The site goes live at
`https://<username>.github.io/voicecards/` after a minute or two.

> The QR code links to Cloudinary, not to this site, so cards made on
> `localhost` work the same as cards made on the published site.

---

## Walkthrough: a wedding card, step by step

This example makes a card for the made-up couple **Sofia & Mateo**, from
**Alex & Jamie**.

### Step 1: Record your message

Open the published site and tap the orange **Start here** button. Speak, then
tap it again to stop. The **limit** field sets the maximum length (up to 2
minutes).

Under **Listen back**, press **▶ Play** to hear the recording before it goes
anywhere. It stays saved in your browser, so a page reload won't lose it.
Didn't like it? Just record again.

<p align="center"><img src="img/step1-record.png" alt="Recorder with a 3-second clip ready to play back" width="560"></p>

### Step 2: Upload it to Cloudinary

Tap **Create card & upload**. The button counts up to 100%. When Cloudinary
confirms the upload:

- the stamp box turns into a **QR code**,
- a green **✓ Uploaded to Cloudinary** box shows the length, size and file name,
- its player streams the **cloud copy**, exactly what the guests will hear.

<p align="center"><img src="img/step2-uploaded.png" alt="Upload confirmed: QR code and green success box" width="720"></p>

If the upload fails, the error shows in red and the button becomes **Retry
upload**. No QR code is made until an upload succeeds, so you can't print a
card with a broken code.

Already have a clip in Cloudinary? Copy its URL from the Media Library, paste
it into **Audio link**, then tap **Use this link** (or press Enter). The QR
code and the printed card switch to that clip, as an `.mp3` link.

### Step 3: Fill in the card

Scroll to **03 / Design the printed card** and fill it in:

| Field       | What we entered                                                               |
| ----------- | ----------------------------------------------------------------------------- |
| Occasion    | **Wedding**                                                                   |
| Paper       | **A5 · 148 × 210 mm** (B5 ISO and B5 JIS are also available)                  |
| Orientation | **Portrait**                                                                  |
| Headline    | *(left empty, so it uses the suggested "Just Married")*                       |
| Names       | `Sofia & Mateo`                                                               |
| Message     | `To the happiest couple we know: may every day together feel like this one.`  |
| Date        | `20 June 2027`                                                                |
| From        | `With love, Alex & Jamie`                                                     |

The preview on the right updates as you type. Any field you leave empty uses
the grey suggestion for that occasion. The page remembers what you entered.

<p align="center"><img src="img/step3-design.png" alt="Card designer with the wedding fields filled in and live preview" width="720"></p>

### Step 4: Preview and print

This is exactly what prints, at real A5 size:

<p align="center"><img src="img/step4-card-wedding.png" alt="Final A5 wedding card for Sofia & Mateo" width="360"></p>

Tap **Print card**. In the print dialog:

| Setting                | Value                                           |
| ---------------------- | ----------------------------------------------- |
| Paper size             | Same as the card (**A5** here)                  |
| Margins                | **None**                                        |
| Scale                  | **100%** / *Actual size*                        |
| Background graphics    | **On** (otherwise colors and borders are lost)  |

Print on heavy cardstock (250–300 gsm) for a real-card feel. Most home
printers can't print to the very edge, so trim the card or use a print shop.

### Step 5: Give it away

Hand it over at the wedding or mail it. The couple scans the QR code with
their phone's camera, the audio opens in the browser, and your message plays. No app needed.

Prefer tapping to scanning? Tap **Copy link** and write the link to an NFC
sticker (NFC Tools or a similar app) to put on the card.

---

## Other occasions

Every design works with every paper size and both orientations.

| Birthday | New baby | Farewell | Classic |
| :------: | :------: | :------: | :-----: |
| <img src="img/card-birthday.png" alt="Birthday card" width="180"> | <img src="img/card-baby.png" alt="New baby card" width="180"> | <img src="img/card-farewell.png" alt="Farewell card" width="180"> | <img src="img/card-classic.png" alt="Classic card" width="180"> |
| Confetti, bold headline | Moon, stars, soft colors | Airmail border, paper plane | The app's own stamp style |

---

## Local development

```bash
npx serve .               # serves the page on http://localhost:3000
```

The microphone needs `localhost` or HTTPS.

---

## Repository layout

| Path           | What it is                                                            |
| -------------- | --------------------------------------------------------------------- |
| `index.html`   | The whole frontend: recorder, player, card designer, styles and script |
| `api/sign.js`  | Optional serverless function for signed uploads (unused on static hosts) |
| `.env.example` | Variables for `api/sign.js`, only needed if that function is deployed  |
| `img/`         | Screenshots used in this README                                        |
| `LICENSE`      | MIT                                                                    |

There's no build step and no dependencies. The only third-party code is
[qrcodejs](https://github.com/davidshimjs/qrcodejs) from cdnjs, plus Google
Fonts.

---

## Privacy and limits

- **Anyone with the link can play the message.** That includes anyone who
  finds the card. Don't record anything you wouldn't want a stranger to hear.
- **To take a message down**, delete the clip from your Cloudinary Media
  Library (`voice-postcards/` folder). The card then shows *"This message
  could not be loaded"*.
- **Don't change your site's address after printing.** Printed QR codes point
  to the domain they were made on. If you want a custom domain, set it up
  before you print.
- **Cloudinary's free plan has monthly usage limits.** They're plenty for
  personal cards. Check the dashboard if the site is public.
- **The upload preset name is public.** It's visible in the page source, so
  anyone who finds it can upload to the account. The format and size limits
  on the preset keep that in check.

---

## License

[MIT](LICENSE) © 2026 Rudy Ong
