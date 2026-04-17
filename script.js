const qs = document.querySelector.bind(document);

const mainAnimation = qs("#mainAnimation");
const proposal = qs("#proposalBox");
const finalMsg = qs("#finalMessage");

const yesBtn = qs("#yesBtn");
const noBtn = qs("#noBtn");
const btnArea = qs("#btnArea");

let noCount = 0;

/* ---------------- MO.JS ORIGINAL ---------------- */

const el = {
  container: qs('.mo-container'),
};

class Heart extends mojs.CustomShape {
  getShape() {
    return '<path d="M50,88.9C25.5,78.2,0.5,54.4,3.8,31.1S41.3,1.8,50,29.9c8.7-28.2,42.8-22.2,46.2,1.2S74.5,78.2,50,88.9z"/>';
  }
  getLength() { return 200; }
}

mojs.addShape('heart', Heart);

/* SIMPLE LOOP CONTROL */

let playedOnce = false;

const loveTl = new mojs.Timeline({
  onComplete: () => {
    if (!playedOnce) {
      playedOnce = true;

      setTimeout(() => {
        mainAnimation.style.display = "none";
        proposal.classList.remove("hidden");
      }, 300);
    }
  }
});

/* Fake short animation trigger (you already have full animation) */
loveTl.add(new mojs.Tween({ duration: 4300 }));
loveTl.play();

/* ---------------- BUTTON LOGIC ---------------- */

yesBtn.onclick = () => {
  proposal.classList.add("hidden");
  finalMsg.classList.remove("hidden");
};

noBtn.onclick = () => {
  noCount++;

  // Grow YES button
  yesBtn.style.transform = `scale(${1 + noCount * 0.3})`;

  // Multiply YES buttons after few clicks
  if (noCount > 2) {
    for (let i = 0; i < noCount * 2; i++) {
      const btn = document.createElement("button");
      btn.innerText = "YES 💖";
      btn.style.position = "absolute";
      btn.style.top = Math.random() * 100 + "%";
      btn.style.left = Math.random() * 100 + "%";

      btn.onclick = () => {
        proposal.classList.add("hidden");
        finalMsg.classList.remove("hidden");
      };

      btnArea.appendChild(btn);
    }
  }
};