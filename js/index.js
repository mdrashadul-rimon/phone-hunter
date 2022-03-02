// spinner function
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
//search phone
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    //display spinner
    toggleSpinner('block');

    // clear data
    searchField.value = '';

    //Error for Null search
    if (searchText == '') {
        alert('Please Search Something.')
        toggleSpinner('none');
    } else {
        // LoadPhone
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(loadPhone => displayPhone(loadPhone.data))
        // clear phone details
        displayPhoneDetail().textContent = '';
    }
}

// display Phone
const displayPhone = data => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    //Error for not found
    if (data.length === 0) {
        const error = document.getElementById('error-result');
        error.innerHTML = `
        <h5>No result found</h5>`;
        searchResult.appendChild(error);
        toggleSpinner('none');
        
    } else {
        //show 20 data
        data.slice(-20).forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="shadow p-3 bg-body rounded-3">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                </div>
                <a href="#" onclick='loadPhoneDetail("${phone.slug}")' class="btn btn-success">Show Details</a>
            </div>
            `;
            searchResult.appendChild(div);
        });
        toggleSpinner('none');
    }
}

// loadPhone Details
const loadPhoneDetail = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(send => displayPhoneDetail(send.data));
}

// display Phone Details
const displayPhoneDetail = detailsPhone => {

    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <div class="my-2 shadow p-3 bg-body rounded-3">
        <img src="${detailsPhone.image}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${detailsPhone.name}</h5>
            <p class="card-text text-success">Release Date: ${detailsPhone.releaseDate ? detailsPhone.releaseDate : 'Date not found!'}</p>
            <p class="card-text">Brand: ${detailsPhone.brand}</p>
            <p class="card-text">Storage: ${detailsPhone.mainFeatures.storage}</p>
            <p class="card-text">Display Size: ${detailsPhone.mainFeatures.displaySize}</p>
            <p class="card-text">Chipset: ${detailsPhone.mainFeatures.chipSet}</p>
            <p class="card-text">Memory: ${detailsPhone.mainFeatures.memory}</p>
            <p class="card-text">Sensors: ${detailsPhone.mainFeatures.sensors}</p>
        <div>Others:
            <ul>
                <li>WLAN: ${detailsPhone.others ? detailsPhone.others.WLAN : 'Not Available'}</li>
                <li class="border-0">Bluetooth: ${detailsPhone.others ? detailsPhone.others.Bluetooth : 'Not Available'}</li>
                <li class="card-text">GPS: ${detailsPhone.others ? detailsPhone.others.GPS : 'Not Available'}</li>
                <li class="card-text">NFC: ${detailsPhone.others ? detailsPhone.others.NFC : 'Not Available'}</li>
                <li class="card-text">Radio: ${detailsPhone.others ? detailsPhone.others.Radio : 'Not Available'}</li>
                <li class="card-text">USB: ${detailsPhone.others ? detailsPhone.others.USB : 'Not Available'}</li>
            </ul>
        </div>
        </div>
    <div>
        `;
    phoneDetails.appendChild(div);
}