
import {getProduct} from "./api.js"
import { viewproduct, setStatus } from "./ui.js";
let products = [];
let totalPages=0;
const searchInput=document.getElementById("searchInput");
const categoryFilter=document.getElementById("categoryFilter")
const nextbtn=document.getElementById("nextbtn")
const previous=document.getElementById("previous")
const sortFilter=document.getElementById("sortFilter")
let currentPage=1;
let itemsPerPage=12;
async function installproduct(){
    setStatus("Loading")
    try{products=await getProduct();
    if (!products || products.length ===0){
        setStatus("No product was found");return}
    const uni=[...new Set (products.map(function(product){return product.category}))]
    uni.forEach(function(category){
        const option=document.createElement("option");
        option.value=category;
        option.textContent=category;
        categoryFilter.appendChild(option)})
        displayProducts()}
    catch(error){
        setStatus("Failed to load products")}}
searchInput.addEventListener("input",function(){
    currentPage=1;
    displayProducts()})
categoryFilter.addEventListener("change",function(){
    currentPage=1;
    displayProducts()})
function displayProducts(){
    const searchValue=searchInput.value;
    const category=categoryFilter.value;
    const pi=products.filter(function(product){
        return product.title.toLowerCase().includes(searchValue.toLowerCase())&& (category==="" || product.category===category)});
        const sortedProducts=[...pi];
        sortedProducts.sort(function(a,b){
            if(sortFilter.value==="1"){return a.price-b.price}
            else if(sortFilter.value==="2"){return b.price-a.price}
            else if(sortFilter.value==="3"){return a.title.localeCompare(b.title)}
            else{return b.title.localeCompare(a.title)}
        })
        totalPages=Math.ceil(sortedProducts.length / itemsPerPage);
        if(currentPage>totalPages && totalPages>0){currentPage=1;}
        if(sortedProducts.length===0){
            setStatus("No product found");
            viewproduct([]);}
        else{setStatus("");
            const paginated=displayPage(sortedProducts,currentPage);
            viewproduct(paginated)}       
        nextbtn.disabled=(currentPage===totalPages || totalPages===0)
        previous.disabled=(currentPage===1 || totalPages===0)
        return sortedProducts;}
function displayPage(products,page){
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex);    }
installproduct()
nextbtn.addEventListener("click",function(){
    if(currentPage<totalPages){
        currentPage++;
        displayProducts()
    }
})
previous.addEventListener("click",function(){
    if(currentPage>1){
        currentPage--;
        displayProducts()
    }
})
sortFilter.addEventListener("change",function(){
    currentPage=1;
    displayProducts()
})