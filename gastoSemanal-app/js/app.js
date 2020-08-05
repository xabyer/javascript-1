( () => {

    /*=================================
    =            Variables            =
    =================================*/
    let totalBudget; //To set de initial total budget
    totalBudget = totalBudget === undefined ?  -1 : Number(document.getElementById('budget').value);

    let currentBudget;//To instance a budget and subtract the speding amount
    
    //DOM const
    const btnSetBudget = document.getElementById('btnSetBudget');
    const budgetSpan = document.querySelector('span#total');
    const remainingSpan = document.querySelector('span#remaining');
    const spendingForm = document.getElementById('add-expense');
    const itemPurchasedInput = document.getElementById('expense');
    const spendingAmountInput = document.getElementById('amount');
    const spendingListUl = document.querySelector('#expenses ul');
    
    
    /*=====  End of Variables  ======*/

    /*=================================
    =            Functions            =
    =================================*/
    
    const checkBudget = () => {

        totalBudget = totalBudget === undefined ||
            totalBudget <= 0 ? Number(document.getElementById('budget').value) : -1;
        
        if (totalBudget <= 0 || totalBudget === undefined) {
            
            document.getElementById('budget').focus();
            document.getElementById('budget').placeholder = 'Value not valid, try again';
            document.getElementById('budget').value = '';
            
            totalBudget = Number(document.getElementById('budget').value);
            

        } else {

            document.querySelector('#weekly_budget').parentElement.parentElement.style.display = 'none';
            document.getElementById('mainContent').style.display = 'flex';
            
            return totalBudget;

        }

    }
    
    /*=====  End of Functions  ======*/

    /*===============================
    =            Classes            =
    ===============================*/
    
    class Budget {

        constructor(budget) {

            this.budget = totalBudget === undefined ||
                            totalBudget <= 0 ? checkBudget() : totalBudget;
            this.remaining_budget = Number(budget);

        }
        //Method to subtract from the current budget
        remainingBudget(amount = 0) {

            return this.remaining_budget -= Number(amount);

        }
    }

    /*----------  DOM classes  ----------*/
    class Interface {

        setInitialDomBudget(amount) {

            //insert HTML amounts
            budgetSpan.innerHTML = amount;
            remainingSpan.innerHTML = amount;

        }

        printMsg(msg, type = 'error') {//Prints error or succes messages.

            const divMsg = document.createElement('div');
            divMsg.classList.add('text-center', 'alert');

            if(type === 'error') {

                divMsg.classList.add('alert-danger');

            }else {

                divMsg.classList.add('alert-success');

            }
            //Create the text to insert
            divMsg.appendChild( document.createTextNode(msg) );

            //Insert the text in the DOM
            document.querySelector('.primario').insertBefore(divMsg, spendingForm);

            //Remove the message after 3 seconds
            setTimeout( () => {

                divMsg.remove();
                spendingForm.reset();

            }, 3000)

        }

        addSpendingList(itemPurchased, spendingAmount) { //Adding data to DOM HTML into List

            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between aling-items-center';

            li.innerHTML = `
                ${itemPurchased}
                <span class="badge badge-pill badge-primary">$ ${spendingAmount}</span>
            `;

            spendingListUl.appendChild(li);
        }

        //checking the remaining budget
        remainingBudgetDom(spendingAmount){

            //update the remaining budget:            
            let remainingBudgetUser = currentBudget.remainingBudget(spendingAmount);            

            //Set DOM remaining budget:
            remainingSpan.innerHTML = `${remainingBudgetUser}`;

            this.checkRemainingBudgetDom(remainingBudgetUser);

        }

        //Change the color of the remaining budget:
        checkRemainingBudgetDom(remainingAmount) {

            const remaining = document.querySelector('.remaining');

            if (remainingAmount <= 0) {

                remaining.classList.remove('alert-success', 'alert-secondary', 'alert-warning');
                remaining.classList.add('alert-danger');

            }else if( (totalBudget/4) >= remainingAmount ){
                
                remaining.classList.remove('alert-success', 'alert-secondary');
                remaining.classList.add('alert-warning');

            }else if ( (totalBudget/2) >= remainingAmount ){
                
                remaining.classList.remove('alert-success');
                remaining.classList.add('alert-secondary');

            }
            
        }

    } 

    /*=====  End of Classes  ======*/

    /*=======================================
    =            Event Listeners            =
    =======================================*/

    document.addEventListener('DOMContentLoaded', () => {

        document.getElementById('mainContent').style.display = 'none';

    });
        
    btnSetBudget.addEventListener('click', (event) => {

        
        event.preventDefault();
        totalBudget = checkBudget();
        currentBudget = new Budget(totalBudget);
        
        //Show initial budget in the HTML
        const ui = new Interface();
        ui.setInitialDomBudget(currentBudget.budget);

    });

    spendingForm.addEventListener('submit', (e) => {

        e.preventDefault();

        //Reading the spending form
        const itemPurchased = itemPurchasedInput.value;
        const spendingAmount = Number(spendingAmountInput.value);
        
        //Interface instance
        const ui = new Interface();

        //Checking the inputs
        if(itemPurchased === '') {

            ui.printMsg('You must enter an expense');

        }else if(spendingAmount === '' ) {
            
            ui.printMsg('You must enter an amount');

        }else if(isNaN(spendingAmount) || spendingAmount === 0){
            
            ui.printMsg('You must enter a number > 0 in the Amount');

        }else{//Insert into HTML

            ui.printMsg('All ok', 'success');
            ui.addSpendingList(itemPurchased, spendingAmount);
            ui.remainingBudgetDom(spendingAmount);

        }

        

    });
        
    /*=====  End of Event Listeners  ======*/

})()