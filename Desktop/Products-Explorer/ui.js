const productgrid=document.getElementById("productgrid");
const statusmessage=document.getElementById("statusmessage");
const imageModal=document.getElementById("imageModal")
const closeModal=document.getElementById("closeModal")
const modalImage=document.getElementById("modalImage")
const modalRating=document.getElementById("modalRating")
const modalCategory=document.getElementById("modalCategory")
const modalDescription=document.getElementById("modalDescription")
const modalPrice=document.getElementById("modalPrice")
const modalTitle=document.getElementById("modalTitle")

export function viewproduct(products){
    productgrid.innerHTML="";
    products.forEach(function(product){
        const card=document.createElement("div");
        card.className="product-card"
        card.innerHTML=`
        <div class="product-info">
            <div class="product-title">${product.title}</div>
            <div class="product-price">${product.price}</div>
        </div>
        <img src="${product.thumbnail}" class="product-image">
        <p class="product-category">${product.category}</p>
        <p class="product-description">${product.description}</p>
        <p class="product-rating">${product.rating}</p>
        `
        card.addEventListener("click",function(){
            modalTitle.textContent=product.title;
            modalPrice.textContent=product.price;
            modalDescription.textContent=product.description;
            modalCategory.textContent=product.category;
            modalRating.textContent=product.rating;
            modalImage.src=product.thumbnail;
            imageModal.style.display="block";
        })
        productgrid.appendChild(card);})}
closeModal.addEventListener("click",function(){imageModal.style.display="none"});
imageModal.addEventListener("click",function(event){
    if(event.target===imageModal){
        imageModal.style.display="none"
    }
})
export function setStatus(message) {
    statusmessage.textContent = message;
}