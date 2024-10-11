const catagorisData = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => displayCatagoris(data.categories))

}
const fetchData = () => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
        .then(res => res.json())
        .then(data => {
            displayCards(data.pets)

        })
}
const lodaingAnimation=(datas)=>{
    const container = document.querySelector('#card-container');
    container.innerHTML=`
   <div class="col-span-3 w-full flex justify-center items-center">
    <span class="loading w-32 border-2 loading-spinner text-[#0E7A81]"></span>
   </div>

    `
    setTimeout(()=>{
        displayCards(datas)
    },2000)
}
const fetchDataCatagori = (type) => {
    const allElm = document.querySelectorAll('.btn-catagoris')

    for (let i = 0; i < allElm.length; i++) {
        allElm[i].style.backgroundColor = "#fff";
        allElm[i].style.color = "#000";
    }
    const targetElm = document.getElementById(type)
    targetElm.style.backgroundColor = '#0e7a81'
    targetElm.style.color = '#fff'
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${type}`)
        .then(res => res.json())
        .then(data => {
            lodaingAnimation(data.data)

        })
}
const handelDeatails=(data)=>{
    
    document.querySelector('#modalBtn').click();
    const container=document.querySelector('#modalContainer')
    container.innerHTML=`
        <img src="${data.image}" alt="">
            <div class="mt-6 mb-2">
                        <h2 class="text-xl font-black tracking-wide">${data.pet_name}</h2>
                    </div>
                    <div class="text-zinc-500 flex items-center ">
                        <i class="fa-solid fa-cubes mr-2"></i>
                        <h1>Breed:</h1>
                        <h1 class="ml-1">${data.breed ? data.breed : 'No Information'}</h1>
                    </div>
                    <div class="text-zinc-500 flex items-center ">
                        <i class="fa-regular fa-calendar-check mr-3"></i>
                        <h1>Birth:</h1>
                        <h1 class="ml-1">${data.date_of_birth ? data.date_of_birth : 'No Information'}</h1>
                    </div>
                    <div class="text-zinc-500 flex items-center ">
                        <i class="fa-solid fa-mars-and-venus mr-2"></i>
                        <h1>Gender:</h1>
                        <h1 class="ml-1">${data.gender ? data.gender : 'No Information'}</h1>
                    </div>
                    <div class="text-zinc-500 flex items-center ">
                        <i class="fa-solid fa-dollar-sign mr-4"></i>
                        <h1>Price:</h1>
                        <h1 class="ml-1">${data.price ? data.price : 'No Information'}$</h1>
                    </div>
                    <div class="text-zinc-500 flex items-center pb-2">
                        <i class="fa-solid fa-mars-and-venus mr-2"></i>
                        <h1>Vaccinated status:</h1>
                        <h1 class="ml-1">${data.gender ? data.gender : 'No Information'}</h1>
                    </div>
                    <h1 class="text-lg font-bold border-t-[1px] p-2">Details Information</h1>
                     <h1 class="text-zinc-500 text-base">${data.pet_details ? data.pet_details : 'No Information'}</h1>
            <div class="modal-action w-full">
                <form method="dialog" class="w-full">
                    <!-- if there is a button, it will close the modal -->
                    <button class="btn w-full">Close</button>
                </form>
            </div>
    `
}
const handelLiked=(item)=>{
    const container=document.querySelector('#likeCOntainer')
    const img=document.createElement('img')
    img.src=item
    // img.className='object-cover object-center w-full rounded-md h-36 bg-gray-500'
    
    container.appendChild(img)
}
const timer=()=>{
    
}
const adoptBtn=(data,div)=>{
    document.querySelector('#adptbtn').click()
    console.log(data)
    const container=document.querySelector('#adptbtnModal');
    let count=3
    const modal=()=>{
        container.innerHTML=`
            <form method="dialog">
                <button id='closeBtn' class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hidden">✕</button>
            </form>
            <h3 class="text-4xl font-black text-[#0E7A81]">Congrates</h3>
            <p class="py-4"><span class="text-lg font-black">${data.pet_name} </span> is on the way</p>
            <h1 class='text-9xl font-black'>${count}</h1>
    `
    }
    modal()
    
    const id=setInterval(()=>{
        count--
        console.log(count)
        modal(count)
        if(count==0){
            clearInterval(id)
            document.querySelector('#closeBtn').click();
            const btn= div.querySelector('button:nth-child(2)')
            btn.style.backgroundColor='#b4cfd1'
            btn.disabled=true
            btn.innerText='Adopted'
            
        }
    },1000)
    
    
}

const displayCards = (datas) => {
    const container = document.querySelector('#card-container');
    container.innerText = ''; 

   
    if (datas.length === 0) {
        const div = document.createElement('div');
        div.classList.add('col-span-3');
        div.innerHTML = `
        <section class="flex w-full items-center h-full sm:p-16 bg-gray-50 text-gray-800">
            <div class="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
                <img src="./images/error.webp" alt="">
                <p class="text-3xl">No Information Available</p>
                <h1>We’re sorry, but it looks like there are currently no pets available for adoption or information. <br> Please check back later as we regularly update our listings.</h1>
            </div>
        </section>
        `;
        container.appendChild(div);
        return;
    }

   
    const createCard = (data, container) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <img src="${data.image}" alt="" class="object-cover object-center w-full rounded-md h-36 bg-gray-500">
            <div class="mt-6 mb-2">
                <h2 class="text-xl font-black tracking-wide">${data.pet_name}</h2>
            </div>
            <div class="text-zinc-500 flex items-center">
                <i class="fa-solid fa-cubes mr-2"></i>
                <h1>Breed:</h1>
                <h1 class="ml-1">${data.breed ? data.breed : 'No Information'}</h1>
            </div>
            <div class="text-zinc-500 flex items-center">
                <i class="fa-regular fa-calendar-check mr-3"></i>
                <h1>Birth:</h1>
                <h1 class="ml-1">${data.date_of_birth ? data.date_of_birth : 'No Information'}</h1>
            </div>
            <div class="text-zinc-500 flex items-center">
                <i class="fa-solid fa-mars-and-venus mr-2"></i>
                <h1>Gender:</h1>
                <h1 class="ml-1">${data.gender ? data.gender : 'No Information'}</h1>
            </div>
            <div class="text-zinc-500 flex items-center pb-2">
                <i class="fa-solid fa-dollar-sign mr-4"></i>
                <h1>Price:</h1>
                <h1 class="ml-1">${data.price ? data.price : 'No Information'}$</h1>
            </div>
            <div class="w-full flex justify-between border-t-[1px] pt-3 border-zinc-300">
                <button onclick="handelLiked('${data.image}')" class="border-[1px] px-4 py-1 rounded-md border-zinc-300 text-zinc-600"><i class="fa-regular fa-thumbs-up"></i></button>
                <button  class="border-[1px] px-4 py-1 rounded-md border-zinc-300 text-[#0E7A81] font-bold">Adopt</button>
                <button class="border-[1px] px-4 py-1 rounded-md border-zinc-300 text-[#0E7A81] font-bold">Details</button>
            </div>
        `;
        div.className = 'max-w-xs text-start p-6 rounded-md border-[1px] text-gray-900';
        container.appendChild(div);
        
       
        div.querySelector('button:last-child').addEventListener('click', () => {
            handelDeatails(data);
        });
        div.querySelector('button:nth-child(2)').addEventListener('click',()=>{
            adoptBtn(data,div)
        })
    };


    datas.forEach(data => createCard(data, container));

 
    document.querySelector('#sortBtn').addEventListener("click", () => {
     
        const sortedData = [...datas].sort((a, b) => (b.price || 0) - (a.price || 0)); 
        container.innerText = ''; 

      
        sortedData.forEach(data => createCard(data, container));
    });
};


const displayCatagoris = (data) => {
    const container = document.querySelector('#catagoris')
    data.forEach(item => {
        // console.log(item)
        const div = document.createElement('div')
        div.innerHTML = `
            <div id='${item.category}' onclick="fetchDataCatagori('${item.category}')" class="gap-3 btn-catagoris flex items-center justify-center border-2 p-5 rounded-lg">
            <img src='${item.category_icon}' alt="">
            <h1 class="text-xl font-bold">${item.category}</h1>
            </div>
        `
        // div.classList.add('gap-3', 'border-2', 'p-5', 'flex', 'justify-center', 'items-center', 'rounded-2xl')
        container.appendChild(div)
    })

}
catagorisData()
fetchData()