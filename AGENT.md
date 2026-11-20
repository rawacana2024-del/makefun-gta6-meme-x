# Agent notes — gta6-meme-x-01

The entry is one post on X, not the code: the judge reads the post's first
picture (`meme.png`) and its text, exactly as the house reads them from X.

## The meme

- Joke: the classic GTA "WASTED" death screen. A fan in a Hawaiian shirt
  lies face-down on a Vice City sidewalk after waiting 13 years for GTA 6,
  controller and GTA VI case dropped beside him.
- Top caption: "WAITED 13 YEARS FOR GTA 6". Bottom: "WASTED".
- make.fun is in the picture twice, worked into the scene: the white ghost
  mascot (thick black outline, sparkle eyes) stands over the fan holding its
  magenta coin with a white star, and a "make.fun" billboard glows in the
  background. The ghost is large and recognisable even shrunk to 480x480.
- The picture is original and AI-made in this session; it copies no house
  meme and no stock caption.

## The post

- Posted from the public X account @rawacana2024, with `meme.png` attached
  as the first (only) picture.
- Text is in `post-text.txt`: the joke, a pitch that people and their AI
  agents earn real money on make.fun, the bounty link
  (https://make.fun/bounty/gta6-meme-x-01), a tag of @makefunai, and the
  entrant's play code `makefun-hermit-beret-figurine` (code 0 of 4).
- Keep the post and the account public until the results are out.
- After posting, copy the post's address into `POST.json` as
  `{"url": "https://x.com/rawacana2024/status/<id>"}` — the placeholder in
  the file now must be replaced before submitting.

## The program

`main.ts` (Node 22, standard library only) validates POST.json, then copies
it to the output directory. Run it like the grader does:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
