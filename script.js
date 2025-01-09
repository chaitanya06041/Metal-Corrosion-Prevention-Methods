let submitBtn = document.querySelector('#sbmt_btn');
let form = document.querySelector('form')
let pHRadioButtons = document.querySelectorAll('input[name="pH"]');
let metalSelect = document.getElementById('metal');
let resultDiv = document.querySelector('.result_2');
let resultDiv_2 = document.querySelector('.result');
form.addEventListener('submit', ((e)=>{
    e.preventDefault();
}));


function getSelectedPH() {
    for (const radioButton of pHRadioButtons) {
        if (radioButton.checked) {
            return radioButton.value;
        }
    }
    return null; 
}

submitBtn.addEventListener('click', ()=>{
    const selectedMetal = metalSelect.value; 
    const selectedPH = getSelectedPH(); 

    if (selectedMetal === 'Select') {
        alert('Please select a metal!');
        return;
    } else if (!selectedPH) {
        alert('Please select a pH environment!');
        return;
    }
    fetch('preventions.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const metalData = data[selectedMetal];
            if (metalData && metalData[selectedPH]) {
                resultDiv.remove();
                resultDiv = document.createElement('div');
                resultDiv.classList.add('result_2');
                p1 = document.createElement('p');
                p2 = document.createElement('p');
                p3 = document.createElement('p');
                p1.innerText = "Selected Method: "+ selectedMetal;
                p2.innerText = "Selected pH Environment: "+ selectedPH;
                p3.innerText = "Prevention Method: "+ metalData[selectedPH];
                resultDiv.appendChild(p1);
                resultDiv.appendChild(p2);
                resultDiv.appendChild(p3);
                resultDiv_2.appendChild(resultDiv);
                // resultDiv.textContent = `Selected Metal: ${selectedMetal.toUpperCase()} \n Selected pH Environment: ${selectedPH} PH \n Prevention Method: ${metalData[selectedPH]}`;

                if (metalData["link_" + selectedPH]) {
                    const newA = document.createElement('a');
                    newA.href = metalData["link_" + selectedPH];  
                    newA.textContent = "Learn more about this method"; 
                    newA.target = "_blank";  
                    
                    // resultDiv.appendChild(document.createElement('br')); 
                    resultDiv.appendChild(newA);
                }
            } else {
                resultDiv.textContent = "No prevention method available for the selected combination.";
            }
            
        })
        .catch(error => {
            resultElement.textContent = "Error fetching prevention methods.";
            console.error('Error:', error);
        });
})