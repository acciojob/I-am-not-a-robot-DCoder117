//your code here
const container = document.getElementById("image-container");
const images = container.querySelectorAll("img");

const reset = document.getElementById("reset");
const verify = document.getElementById("verify");
const heading = document.getElementById("h");
const para = document.getElementById("para");

let selectedImages = [];

// Shuffle images
function shuffleImages() {
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

// Select an image
function selectImage(event) {
    let image = event.target;

    // Don't allow the same image to be selected twice
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

    // Show Verify only after exactly two images
    if (selectedImages.length === 2) {
        verify.style.display = "inline-block";
    }
}

// Reset everything
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

// Verify selected images
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

// Add click event to images
images.forEach(function(image) {
    image.addEventListener("click", selectImage);
});

// Add button events
reset.addEventListener("click", resetGame);
verify.addEventListener("click", verifyImages);

// Shuffle when page loads
shuffleImages();