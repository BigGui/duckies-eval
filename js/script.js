// PICTURES

let imgCount = 0;
const thumbs = Array.from(document.querySelectorAll("#thumbs img[data-src-large]"));
const picturesUrl = thumbs.map(img => img.dataset.srcLarge);

thumbs.forEach((img, i) => {
    img.addEventListener("mouseover", function() {
        imgCount = i;
        displayImageUrl(this.dataset.srcLarge)
    })
});

document.getElementById("pictures-prev").addEventListener("click", function() {
    imgCount--;
    if (imgCount < 0) imgCount = picturesUrl.length - 1;
    updateMainPicture();
});
document.getElementById("pictures-next").addEventListener("click", function() {
    imgCount++;
    updateMainPicture();    
});

function updateMainPicture() {
    displayImageUrl(picturesUrl[imgCount%picturesUrl.length]);
}

function displayImageUrl(url) {
    document.getElementById("pictures-img").src = url;
}


// ACCORDIONS

document.querySelectorAll("[data-accordion-for]").forEach(element => {
    element.addEventListener("click", function(event) {
        this.classList.toggle("closed");
        const content = document.getElementById(this.dataset.accordionFor);
        if (this.classList.contains("closed")) content.classList.add("hidden");
        else content.classList.remove("hidden");
    })
});


// ADD TO CART

function getQuantity() {
    return parseInt(document.getElementById("quantity").value) || 1;
}

function updateCart(quantity) {
    if (quantity > 99) quantity = "99+";
    return document.getElementById("cart-nb").innerText = quantity;
}

function disableCta() {
    const cta = document.getElementById("add-to-cart");
    cta.classList.add("disabled");
    cta.innerText = "Déjà au panier";
}

document.getElementById("add-to-cart").addEventListener("click", function(event) {
    if (this.classList.contains("disabled")) return;
    const qty = getQuantity();
    if (qty > 0) {
        updateCart(qty);
        disableCta();
    }
})


// RELATED PRODUCTS

let carouselCount = 0;
const carouselTotal = document.querySelectorAll("#carousel .carousel-itm").length;
const carouselPrev = document.getElementById("carousel-prev");
const carouselNext = document.getElementById("carousel-next");
updateCarouselHandlers();

carouselPrev.addEventListener("click", function() {
    carouselCount--;
    carouselCount %= carouselTotal;
    updateCarousel();
});
carouselNext.addEventListener("click", function() {
    carouselCount++;
    carouselCount %= carouselTotal;
    updateCarousel();    
});

function updateCarouselHandlers() {
    carouselPrev.classList.remove("hidden");
    carouselNext.classList.remove("hidden");
    if (carouselCount === 0) carouselPrev.classList.add("hidden");
    if (carouselCount === carouselTotal-1) carouselNext.classList.add("hidden");
}

function updateCarousel() {
    updateCarouselHandlers();
    document.querySelector(".carousel-content").style.left = `-${carouselCount%carouselTotal*100}vw`;
}
