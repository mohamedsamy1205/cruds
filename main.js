let titele = document.getElementById('titele');
let price = document.getElementById('price');
let ads = document.getElementById('ads');
let taxs = document.getElementById('taxs');
let discount= document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let tbody = document.getElementById('tbody');
let search = document.getElementById('search');
let searchtitele = document.getElementById('searchtitele');
let searchcategory = document.getElementById('searchcategory');
let mood = 'creat'; 
let tmp;
 // get total \\
function gettotal(){
    if(price.value !=''){
        let result = (+price.value + +ads.value + +taxs.value) - +discount.value ;
        total.innerHTML = result;
        total.style.background='#040';
    }else{
        total.innerHTML ='';
        total.style.background='#af1207';

    }
}
 // create data 
let datapro;
if (localStorage.product != null){
    datapro = JSON.parse(localStorage.product);
}else{
    datapro = [];
}

create.onclick = function(){
    let newpro = {
        titele:titele.value.toLowerCase(),
        price:price.value,
        ads:ads.value,
        taxs:taxs.value,
        total:total.innerHTML,
        discount:discount.value,
        count:count.value,
        category:category.value.toLowerCase(),
    }

//count

if(titele.value !='' && price.value !='' && category.value !=''){
        if(mood==='creat'){
            if (newpro.count> 1){
                for( let i=0; i<newpro.count; i++){
                    datapro.push(newpro);
                }
            }else{
                datapro.push(newpro);
            }

        }else{
            datapro[tmp]=newpro;
            mood = 'creat';
            create.innerHTML = 'create';
            count.style.display='block';
        }
    alert("تم انشاء منتج جديد");
    cleardata();
}else{
    alert('تاكد من ادخال الاسم والسعر والنوع');
}
 //save data in locle storege
localStorage.setItem('product' , JSON.stringify(datapro));
showdata();
}
//clear inputs
function cleardata(){
    titele.value = '';
    price.value = '';
    ads.value = '';
    taxs.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
}
//read
function showdata(){
    gettotal()
    let tabel ='';
    for(let i = 0; i < datapro.length; i++){
        tabel += `
        <tr>
            <td>${i+1}</td>
            <td>${datapro[i].titele}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].taxs}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button id="update" onclick = "updatedata(${i})">update</button></td>
            <td><button id="delate" onclick="deletdata(${i})">delate</button></td>
        </tr>
        `
    }
    tbody.innerHTML = tabel;
    let delateall = document.getElementById('delateall');
    if(datapro.length > 0){
        delateall.innerHTML=`
        <button  onclick="clearall()">delateAll (${datapro.length})</button>
        `
    }else{
        delateall.innerHTML="";
    }
}
showdata();
//update
function updatedata(i){
    titele.value = datapro[i].titele;
    price.value = datapro[i].price;
    ads.value = datapro[i].ads;
    taxs.value = datapro[i].taxs;
    discount.value = datapro[i].discount;
    count.value = datapro[i].count;
    category.value = datapro[i].category;
    gettotal();
    create.innerHTML = 'update';
    count.style.display='none';
    mood = 'updat';
    tmp=i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}
//delate
function deletdata(i){
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro);
    showdata();
}
//delate All
function clearall(){
    localStorage.clear();
    datapro.splice(0);
    showdata();
}
//search   
let searchmood = 'titele';
function getsearch(id){
    if(id == 'searchtitele'){
        searchmood = 'titele';
    }else{
        searchmood = 'category';
    }
    search.placeholder = 'Search By '+searchmood;
    search.focus();
    search.value = '';
    showdata();
}
function searchdata(value){
    let tabel = '';
    if(searchmood == 'titele'){
        for(let i=0; i < datapro.length; i++){
            if(datapro[i].titele.includes(value.toLowerCase())){
                tabel += `
                    <tr>
                        <td>${i}</td>
                        <td>${datapro[i].titele}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].taxs}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button id="update" onclick = "updatedata(${i})">update</button></td>
                        <td><button id="delate" onclick="deletdata(${i})">delate</button></td>
                    </tr>
                    `
            }else{
    
                
            }
            
        }
    }else{
        for(let i=0; i < datapro.length; i++){
            if(datapro[i].category.includes(value.toLowerCase())){
                tabel += `
                    <tr>
                        <td>${i}</td>
                        <td>${datapro[i].titele}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].taxs}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button id="update" onclick = "updatedata(${i})">update</button></td>
                        <td><button id="delate" onclick="deletdata(${i})">delate</button></td>
                    </tr>
                    `
            }else{
    
                
            }
            
        }
    }
    tbody.innerHTML = tabel;
}