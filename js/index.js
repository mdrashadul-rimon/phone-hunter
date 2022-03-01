const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    // LoadPhone
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    fetch(url)
        .then(res => res.json())
        .then(loadPhone => displayPhone(loadPhone.data));

        displayPhoneDetail().textContent = '';
}


// display Phone
const displayPhone = data => {
    const searchResult = document.getElementById('search-result');

    searchResult.textContent = '';

    data.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="shadow p-3 bg-body rounded">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                </div>
                <a href="#" onclick='loadPhoneDetail("${phone.slug}")' class="btn btn-primary">Show Details</a>
            </div>
            `;
        searchResult.appendChild(div);
    });
}

// loadPhoneDetail
const loadPhoneDetail = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(send => displayPhoneDetail(send.data));
}

// displayPhone Details
const displayPhoneDetail = detailsPhone => {

    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <div class="border-none shadow p-3 bg-body rounded">
        <img src="${detailsPhone.image}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${detailsPhone.name}</h5>
            <p class="card-text">Release Date: ${detailsPhone.releaseDate}</p>
            <p class="card-text">Brand: ${detailsPhone.brand}</p>
            <p class="card-text">Storage: ${detailsPhone.mainFeatures.storage}</p>
            <p class="card-text">Display Size: ${detailsPhone.mainFeatures.displaySize}</p>
            <p class="card-text">Chipset: ${detailsPhone.mainFeatures.chipSet}</p>
            <p class="card-text">Memory: ${detailsPhone.mainFeatures.memory}</p>
            <p class="card-text">Sensors: ${detailsPhone.mainFeatures.sensors}</p>
        </div>
    <div>
    `;
    phoneDetails.appendChild(div);
}