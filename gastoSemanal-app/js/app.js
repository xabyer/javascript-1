( () => {

    /*=================================
    =            Variables            =
    =================================*/
    let weeklyBudget;
    weeklyBudget = weeklyBudget === undefined ?  -1 : Number(document.getElementById('budget').value);
    
    const btnSetBudget = document.getElementById('btnSetBudget');
    const budgetSpan = document.querySelector('span#total');
    const remainingSpan = document.querySelector('span#remaining');
    
    
    /*=====  End of Variables  ======*/

    /*=================================
    =            Functions            =
    =================================*/
    
    const checkBudget = () => {

        weeklyBudget = weeklyBudget === undefined ||
            weeklyBudget <= 0 ? Number(document.getElementById('budget').value) : -1;
        
        if (weeklyBudget <= 0 || weeklyBudget === undefined) {
            
            document.getElementById('budget').focus();
            document.getElementById('budget').placeholder = 'Value not valid, try again';
            document.getElementById('budget').value = '';
            
            weeklyBudget = Number(document.getElementById('budget').value);
            

        } else {

            document.querySelector('#weekly_budget').parentElement.parentElement.style.display = 'none';
            document.getElementById('mainContent').style.display = 'flex';
            
            return weeklyBudget;

        }

    }
    
    /*=====  End of Functions  ======*/

    /*===============================
    =            Classes            =
    ===============================*/
    
    class Budget {

        constructor(budget) {

            this.budget = weeklyBudget === undefined ||
                            weeklyBudget <= 0 ? checkBudget() : weeklyBudget;
            this.remaining_budget = Number(budget);

        }
        //Method to subtract from the current budget
        remainingBudget(amount = 0) {

            return this.remainingB -= Number(amount);

        }
    }

    /*----------  DOM classes  ----------*/
    class Interface {

        setInitialDomBudget(amount) {

            //insert HTML amounts
            budgetSpan.innerHTML = amount;
            remainingSpan.innerHTML = amount;

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
        weeklyBudget = checkBudget();
        const initialBudget = new Budget(weeklyBudget);
        
        //Show initial budget in the HTML
        const ui = new Interface();
        ui.setInitialDomBudget(initialBudget.budget);

    });
        
    /*=====  End of Event Listeners  ======*/

})()