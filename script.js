const container = document.getElementById("image-container");
const images = container.querySelectorAll("img");

const reset = document.getElementById("reset");
const verify = document.getElementById("verify");
const para = document.getElementById("para");

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

    // Set the first five images
    for (let i = 0; i < 5; i++) {
        images[i].className = imageNames[i];
        images[i].dataset.image = imageNames[i];
    }

    // Randomly choose which image will be duplicated
    const randomIndex = Math.floor(Math.random() * 5);
    const duplicateName = imageNames[randomIndex];

    // Make the sixth image the duplicate
    images[5].className = duplicateName;
    images[5].dataset.image = duplicateName;

    // Shuffle all six images
    let shuffledImages = Array.from(images);

    for (let i = shuffledImages.length - 1; i > 0; i--) {

        let randomIndex = Math.floor(Math.random() * (i + 1));

        let temp = shuffledImages[i];
        shuffledImages[i] = shuffledImages[randomIndex];
        shuffledImages[randomIndex] = temp;
    }

    // Put shuffled images back into container
    shuffledImages.forEach(function(image) {
        container.appendChild(image);
    });
}

function selectImage(event) {

    const image = event.currentTarget;

    // Don't select the same tile twice
    if (selectedImages.includes(image)) {
        return;
    }

    // Don't allow more than two selections
    if (selectedImages.length >= 2) {
        return;
    }

    selectedImages.push(image);

    image.classList.add("selected");

    // Show Reset after first selection
    reset.style.display = "inline-block";

    // Show Verify only after exactly two selections
    if (selectedImages.length === 2) {
        verify.style.display = "inline-block";
    }
}

function verifyImages() {

    if (selectedImages.length !== 2) {
        return;
    }

    const firstImage = selectedImages[0].dataset.image;
    const secondImage = selectedImages[1].dataset.image;

    if (firstImage === secondImage) {

        para.textContent =
            "You are a human. Congratulations!";

    } else {

        para.textContent =
            "We can't verify you as a human. You selected the non-identical tiles.";
    }

    // Hide Verify after verification
    verify.style.display = "none";
}

function resetGame() {

    // Clear selected images
    selectedImages = [];

    // Remove selected borders
    images.forEach(function(image) {
        image.classList.remove("selected");
    });

    // Clear result
    para.textContent = "";

    // Hide buttons
    reset.style.display = "none";
    verify.style.display = "none";

    // Create a new random arrangement
    setupImages();
}

images.forEach(function(image) {
    image.addEventListener("click", selectImage);
});

reset.addEventListener("click", resetGame);

verify.addEventListener("click", verifyImages);

// Initial setup
setupImages();