const container = document.getElementById("image-container");
const images = container.querySelectorAll("img");

const reset = document.getElementById("reset");
const verify = document.getElementById("verify");
const heading = document.getElementById("h");
const para = document.getElementById("para");

let selectedImages = [];

// Make sure buttons are hidden initially
reset.style.display = "none";
verify.style.display = "none";

// Randomly choose which image will be duplicated
function setupImages() {
    const imageClasses = ["img1", "img2", "img3", "img4", "img5"];

    const duplicateIndex = Math.floor(Math.random() * 5);
    const duplicateClass = imageClasses[duplicateIndex];

    images[5].className = duplicateClass;
    images[5].dataset.image = duplicateClass;

    // Shuffle all six images
    let imageArray = Array.from(images);

    for (let i = imageArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        let temp = imageArray[i];
        imageArray[i] = imageArray[j];
        imageArray[j] = temp;
    }

    imageArray.forEach(function(image) {
        container.appendChild(image);
    });
}

// Select image
function selectImage(event) {
    const image = event.target;

    // Don't select the same tile twice
    if (selectedImages.includes(image)) {
        return;
    }

    // Don't allow more than two tiles
    if (selectedImages.length >= 2) {
        return;
    }

    selectedImages.push(image);
    image.classList.add("selected");

    // Show Reset after first selection
    reset.style.display = "inline-block";

    // Show Verify only after two selections
    if (selectedImages.length === 2) {
        verify.style.display = "inline-block";
    }
}

// Reset
function resetGame() {
    selectedImages = [];

    images.forEach(function(image) {
        image.classList.remove("selected");
    });

    reset.style.display = "none";
    verify.style.display = "none";

    heading.textContent =
        "Please click on the identical tiles to verify that you are not a robot.";

    para.textContent = "";
}

// Verify
function verifyImages() {
    if (selectedImages.length !== 2) {
        return;
    }

    const firstImage = selectedImages[0].dataset.image;
    const secondImage = selectedImages[1].dataset.image;

    if (firstImage === secondImage) {
        para.textContent = "You are a human. Congratulations!";
    } else {
        para.textContent =
            "We can't verify you as a human. You selected the non-identical tiles.";
    }

    verify.style.display = "none";
}

// Add image click events
images.forEach(function(image) {
    image.addEventListener("click", selectImage);
});

// Add button events
reset.addEventListener("click", resetGame);
verify.addEventListener("click", verifyImages);

// Start game
setupImages();