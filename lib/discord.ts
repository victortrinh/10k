import { sample } from "lodash";

const toxicMessages = [
  "Keep up you scrubs ðĨ",
  "EZ CLAP ð",
  "Maybe you guys should try harder ðŠ",
  "Awwwwww yeaaaa... ðĶ",
  "HEEIIIIINN? ðķ",
  "STIII, J'AI PO D'VIE ðą!!",
  "ONIIII-CHANNNNNNNN ðĨĩ",
  "J'SUIS TROP BON POUR VOUSSS!!",
  "KAAACHOOOOWWW ððð ðïļ",
  "BLEEHHHHH ðĪðĪŠðĪ",
  "Stay HARD 8==D",
  "Making mama proud ð",
  "YAMATEEE KURASAIIIIIIII ð "
];

export function sendDiscordMessage(message: string) {
  const request = new XMLHttpRequest();
  request.open(
    "POST",
    `https://discord.com/api/webhooks/${process.env.DISCORD_USERNAME}/${process.env.DISCORD_SECRET}`
  );

  request.setRequestHeader("Content-type", "application/json");

  const params = {
    username: "Stay Hard Beast",
    content: `${message}. ${sample(toxicMessages)}!`
  };

  request.send(JSON.stringify(params));
}
