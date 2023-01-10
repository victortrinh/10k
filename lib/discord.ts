import { sample } from "lodash";

const toxicMessages = [
  "Keep up you scrubs 🥇",
  "EZ CLAP 🙏",
  "Maybe you guys should try harder 💪",
  "Awwwwww yeaaaa... 💦",
  "HEEIIIIINN? 🐶",
  "STIII, J'AI PO D'VIE 😱!!",
  "ONIIII-CHANNNNNNNN 🥵",
  "J'SUIS TROP BON POUR VOUSSS!!",
  "KAAACHOOOOWWW 👉😎👉 🏎️",
  "BLEEHHHHH 🤙🤪🤙",
  "Stay HARD 8==D",
  "Making mama proud 😏",
  "YAMATEEE KURASAIIIIIIII 😝 "
];

export function sendDiscordMessage(
  name: string,
  reps: number,
  exercise: string
) {
  const request = new XMLHttpRequest();
  request.open(
    "POST",
    `https://discord.com/api/webhooks/${process.env.DISCORD_USERNAME}/${process.env.DISCORD_SECRET}`
  );

  request.setRequestHeader("Content-type", "application/json");

  const params = {
    username: "Stay Hard Beast",
    content: `${name} just did ${reps} ${exercise}! ${sample(toxicMessages)}!`
  };

  request.send(JSON.stringify(params));
}
