( () => {

    /*=============================================
    =            Variables and Objects            =
    =============================================*/
    const   maxYear = new Date().getFullYear(),
            minYear = maxYear - 20;
    const selectYears = document.getElementById('year');
    
    const insuranceForm = document.getElementById('quote-insurance');
    const brand = document.getElementById('brand');
    const result = document.getElementById('result');
    

    // Insurance Objet, ES6 declaration; ES5 function Object Construction (Only with didactic intentions)
    const Insurance = function (brand, year, type) { 
        this.brand = brand;
        this.year = year;
        this.type = type;
    }


    /*=====  End of Variables and Objects  ======*/

    /*=================================
    =            DOM                  =
    =================================*/
    
    
    for (let i = maxYear; i >= minYear; i--) {

        let optionYear = document.createElement('option');
        optionYear.value = i;
        optionYear.innerHTML = i;
        selectYears.appendChild(optionYear);

    }

    const Interface = function () {}

    //Message that is printed in the HTML
    Interface.prototype.showMessage = function(msg, type) {

        const div = document.createElement('div');

        if( type === 'error') {
            
            div.classList.add('message', 'error');

        }else {
            
            div.classList.add('message', 'correct');

        }

        div.innerHTML = `${msg}`;
        insuranceForm.insertBefore(div, document.querySelector('.form-group'));
        setTimeout( () => {

            document.querySelector('.message').remove();

        }, 3000);

    }

    //Show on screen the amount of the insurance
    Interface.prototype.showResult = function (insurance, amount){

        let brand;
        switch(insurance.brand) {
            case '1':
                brand = 'American';
                break;
            case '2':
                brand = 'Asiatic';
                break;
            case '3':
                brand = 'European';
                break;
        }

        const div = document.createElement('div');
        div.innerHTML = `
            <p class = "header">Summary</p>
            <p>Brand : ${brand}</p>
            <p>Year: ${insurance.year}</p>
            <p>Type: ${insurance.type}</p>
            <p>Total: $ ${amount}</p>
        `;

        const spinner = document.querySelector('#loading img');
        spinner.style.display = 'block';
        setTimeout( () => {

            spinner.style.display = 'none';
            result.appendChild(div);

        }, 1000);
        
        
    }
    
    /*=====  End of DOM  ======*/

    /*=================================
    =            Functions            =
    =================================*/
    
    Insurance.prototype.quoteInsurance = function (information) {

        /* Simulating insurance prices
            1 = american 1.15
            2 = asiatic 1.05
            3 = european 1.35
        */

        //Base price
        const base = 2000;
        let amount;

        switch(this.brand){
            case '1':
                amount = base * 1.15;
                break;
            case '2':
                amount = base * 1.05;
                break;
            case '3':
                amount = base * 1.35;
                break;
        }

        //Discount based on the age of the vehicle.
        const difference = new Date().getFullYear() - this.year;
        
        //Every year of difference it is necessary to subtract 3% from the insurance amount
        amount *= ( ( 100 - (difference * 3) ) / 100 );

        /* 
            Base => 30% price increase
            complete => 50% price increase
        */
        if(this.type === 'basic') {

            amount *= 1.30;

        }else {

            amount*= 1.50;

        }

        return amount;
    }
    
    /*=====  End of Functions  ======*/



    /*=================================
    =            Listeners            =
    =================================*/
        

    insuranceForm.addEventListener('submit', (e) => {

        e.preventDefault();
        
        //Obtain the selected brand
        let selectedBrand = brand.options[brand.selectedIndex].value;
        
        //Obtain the selected year                
        let selectedYear = selectYears.options[selectYears.selectedIndex].value;
        
        //Obtain the radio button value
        let insuranceType = document.querySelector('input[name="type"]:checked').value;
        
        //Create an instance of Interface:
        const interface = new Interface();

        //Checking non-empty fields
        if(selectedBrand === '' || selectedYear === '' || insuranceType === '') {

            //Interface prints an error
            interface.showMessage('Missing data, check the form and try again', 'error');

        }else {

            //Clean previous results
            const results = document.querySelector('#result div');
            if(results != null) {

                results.remove();

            }

            //Create a insurance instance and show the interface
            const insurance = new Insurance( selectedBrand, selectedYear, insuranceType);
            
            //Quote Insurance
            const amount = insurance.quoteInsurance(insurance);

            //Show the result:
            interface.showResult(insurance, amount);
            interface.showMessage('Quoting...', 'correct');
        }

    });

        
        
    /*=====  End of Listeners  ======*/

})()