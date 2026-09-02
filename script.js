const container = document.getElementById("image-container");
const images = container.querySelectorAll("img");

const reset = document.getElementById("reset");
const verify = document.getElementById("verify");
const para = document.getElementById("para");
const heading = document.getElementById("h");

let selectedImages = [];

reset.style.display = "none";
verify.style.display = "none";

function setupImages() {
    const imageNames = [
        "img1",
        "img2",
        "img3",
        "img4",
        "img5"
    ];

    // Choose one image to duplicate
    const duplicateName =
        imageNames[Math.floor(Math.random() * imageNames.length)];

    // Set the sixth image as the duplicate
    images[5].className = duplicateName;
    images[5].dataset.image = duplicateName;

    // Make sure the first five images have their correct identities
    for (let i = 0; i < 5; i++) {
        images[i].className = imageNames[i];
        images[i].dataset.image = imageNames[i];
    }

    // Shuffle all six images
    let shuffled = Array.from(images);

    for (let i = shuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        let temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }

    // Put shuffled images back into the container
    shuffled.forEach(function(image) {
        container.appendChild(image);
    });
}

function selectImage(event) {
    let image = event.currentTarget;

    // Don't select the same image twice
    if (selectedImages.includes(image)) {
        return;
    }

    // Don't allow more than two selections
    if (selectedImages.length >= 2) {
        return;
    }

    selectedImages.push(image);
    image.classList.add("selected");

    reset.style.display = "inline-block";

    if (selectedImages.length === 2) {
        verify.style.display = "inline-block";
    }
}

function resetGame() {
    // Clear selected images
    selectedImages = [];

    // Remove blue border
    images.forEach(function(image) {
        image.classList.remove("selected");
    });

    // Clear message
    para.textContent = "";

    // Restore heading
    heading.textContent =
        "Please click on the identical tiles to verify that you are not a robot.";

    // Hide buttons
    reset.style.display = "none";
    verify.style.display = "none";

    // Create a new random arrangement
    setupImages();
}

function verifyImages() {
    if (selectedImages.length !== 2) {
        return;
    }

    let firstImage = selectedImages[0].dataset.image;
    let secondImage = selectedImages[1].dataset.image;

    if (firstImage === secondImage) {
        para.textContent = "You are a human. Congratulations!";
    } else {
        para.textContent =
            "We can't verify you as a human. You selected the non-identical tiles.";
    }

    verify.style.display = "none";
}

images.forEach(function(image) {
    image.addEventListener("click", selectImage);
});

reset.addEventListener("click", resetGame);

verify.addEventListener("click", verifyImages);

// Initial setup
setupImages();