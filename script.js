const imageInput = document.getElementById("imageInput");
const uploadBtn = document.getElementById("uploadBtn");
const cameraBtn = document.getElementById("cameraBtn");
const captureBtn = document.getElementById("captureBtn");

const previewImage = document.getElementById("previewImage");
const camera = document.getElementById("camera");
const canvas = document.getElementById("canvas");

const overallScore = document.getElementById("overallScore");

const cleanliness = document.getElementById("cleanliness");
const lighting = document.getElementById("lighting");
const organization = document.getElementById("organization");
const ergonomics = document.getElementById("ergonomics");
const productivity = document.getElementById("productivity");

const tipsList = document.getElementById("tipsList");

let stream = null;

// Upload Image

uploadBtn.onclick = () => {
    imageInput.click();
};

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        previewImage.src = e.target.result;

        analyzeDesk();

    };

    reader.readAsDataURL(file);

});

// Open Webcam

cameraBtn.onclick = async () => {

    try {

        stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        camera.srcObject = stream;

        camera.style.display = "block";

        captureBtn.style.display = "inline-block";

    } catch {

        alert("Unable to access camera.");

    }

};

// Capture Image

captureBtn.onclick = () => {

    canvas.width = camera.videoWidth;

    canvas.height = camera.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(camera, 0, 0);

    previewImage.src = canvas.toDataURL("image/png");

    stream.getTracks().forEach(track => track.stop());

    camera.style.display = "none";

    captureBtn.style.display = "none";

    analyzeDesk();

};

// Animate Progress

function animateProgress(bar, value) {

    let current = 0;

    const interval = setInterval(() => {

        current++;

        bar.value = current;

        if (current >= value)
            clearInterval(interval);

    }, 12);

}

// Animate Number

function animateNumber(target) {

    let current = 0;

    const interval = setInterval(() => {

        current++;

        overallScore.textContent = current;

        if (current >= target)
            clearInterval(interval);

    }, 18);

}

// Fake AI Analysis

function analyzeDesk() {

    const clean = random(60, 100);
    const light = random(55, 100);
    const org = random(50, 100);
    const ergo = random(45, 100);
    const prod = random(60, 100);

    const score = Math.round(
        (clean + light + org + ergo + prod) / 5
    );

    overallScore.textContent = "0";

    cleanliness.value = 0;
    lighting.value = 0;
    organization.value = 0;
    ergonomics.value = 0;
    productivity.value = 0;

    animateNumber(score);

    animateProgress(cleanliness, clean);
    animateProgress(lighting, light);
    animateProgress(organization, org);
    animateProgress(ergonomics, ergo);
    animateProgress(productivity, prod);

    generateSuggestions(clean, light, org, ergo, prod);

}

function random(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}

function generateSuggestions(c, l, o, e, p) {

    tipsList.innerHTML = "";

    if (c < 75)
        addTip("🧹 Your desk looks cluttered. Remove unnecessary items.");

    if (l < 75)
        addTip("💡 Improve your lighting with a desk lamp or natural light.");

    if (o < 75)
        addTip("📚 Organize books, notebooks and accessories.");

    if (e < 75)
        addTip("🪑 Raise your monitor to eye level for better posture.");

    if (p < 75)
        addTip("📵 Reduce distractions like phones while studying.");

    if (
        c >= 75 &&
        l >= 75 &&
        o >= 75 &&
        e >= 75 &&
        p >= 75
    ) {

        addTip("🎉 Excellent workspace!");

        addTip("🚀 Your study desk is optimized for productivity.");

        addTip("⭐ Keep maintaining this setup.");

    }

}

function addTip(text) {

    const li = document.createElement("li");

    li.textContent = text;

    tipsList.appendChild(li);

}

/* ======================================================

 OPTIONAL GEMINI API

 Replace analyzeDesk() with Gemini response if desired.

 Example prompt:

 Analyze this study desk image.

 Score:

 - Cleanliness
 - Lighting
 - Organization
 - Ergonomics
 - Productivity

 Give suggestions.

====================================================== */
