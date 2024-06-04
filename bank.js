/**
 * Task: Banking System
 * Requirements:
 * 1. users can open account by giving username and password.
 * 2. Generate a random account number for them
 * 3. users can have some inital deposit.
 * 4. users can transfer money to anyone. (Only transfer if they have balance);
 * 5. users can withdraw money. (Only withdraw if they have balance);
 * 6. users can depoist money.
 * 
 * in case of transfer out, user is required to provide password.
 */

class Account {

    #username
    #password
    #balance

    static totalAccount = 0;


    constructor({ username, password, initalDeposit = 0, ifsc }) {

        if (isNaN(Number(initalDeposit))) throw new Error(`Inital deposit must be a number`);
        if (!password || password.length < 3) throw new Error(`Password must be 3 or more chars`)
        if (!username || username.length < 3) throw new Error(`Username must be 3 or more chars`)

        this.#username = username;
        this.#password = password;
        this.#balance = Number(initalDeposit);
        this.ifsc = ifsc;
        this.accountNumber = `acc_${username}_${Date.now().toString()}`;

        Account.totalAccount++;
    }

    deposit(amount) {
        if (isNaN(Number(amount))) throw new Error(`Amount must be a number`);
        if (Number(amount) < 0) throw new Error(`Amount must be gt than 0`);
        this.#balance += Number(amount);

        console.log(`[${this.#username}] OTP: Credited ${amount} from your account`);
    }

    withdraw(amount) {
        const amt = Number(amount)
        if (isNaN(amt)) throw new Error(`Amount must be a number`);
        if (amt < 0) throw new Error(`Amount must gt 0`);
        if (amt > this.#balance) throw new Error('Insifficent balance');

        this.#balance -= amt

        console.log(`[${this.#username}] OTP: Debited ${amt} from your account`);
    }

    /**
     * 
     * @param {Account} to 
     * @param {number} amount 
     * @param {string} password 
     */
    tranfer(to, amount, password) {
        if (this.#password !== password) throw new Error(`Password is incorrect`);
        if (!(to instanceof Account)) throw new Error(`account should be instance of Account`);

        this.withdraw(amount);
        to.deposit(amount);
    }

    displayBalance() {
        console.log(`******** Balance *******\n
            Account Number: ${this.accountNumber}\n
            Account Holder Name: ${this.#username}\n
            Balance: ${this.#balance}
        `)
    }
}


// const akash = new Account({ username: 'akash', password: 'a123', initalDeposit: 100 });
const nitin = new Account({ username: 'nitin', password: 'n123', initalDeposit: 400 });
const prakash = new Account({ username: 'prakash', password: 'p123', initalDeposit: 200 });
const aniket = new Account({ username: 'aniket', password: 'an123', initalDeposit: 500 });

// akash.tranfer(nitin, 50, 'a123');
// prakash.tranfer(nitin, 200, 'p123');

// nitin.tranfer(aniket, 600, 'n123');

// nitin.displayBalance();
// aniket.displayBalance()


class Bank {
    constructor(name) {
        this.name = name;
        this.db = new Map();
    }

    /**
     * @param {Account} account - Account Object
     */
    openAccount(account) {
        if (!(account instanceof Account)) throw new Error(`account must be an object of Account!`)
        if (this.db.has(account.accountNumber)) throw new Error('Account number already exists');

        this.db.set(account.accountNumber, account);
        return account;
    }

    /**
     * 
     * @param {string} id 
     * @returns {Account}
     */
    getAccountById(id) {
        if (!this.db.has(id)) throw new Error('Wrong Account Number')
        return this.db.get(id);
    }

    /**
     * 
     * @param {Account} from 
     * @param {Account} to 
     * @param {number} amount
     * @param {string} password
     */
    static transfer(from, to, amount, password) {
        from.tranfer(to, amount, password);
    }

}

const hdfc = new Bank('HDFC Bank');
const icici = new Bank('ICICI Bank');


const IFSC = {
    'HDFC': hdfc,
    'ICICI': icici
}


const piyush = hdfc.openAccount(new Account({ username: 'Piyush', password: 'p1234', initalDeposit: 200, ifsc: 'HDFC' }))
const akash = icici.openAccount(new Account({ username: 'Akash', password: 'a123', initalDeposit: 50, ifsc: 'ICICI' }))

hdfc.getAccountById(piyush.accountNumber).tranfer(
    icici.getAccountById(akash.accountNumber), 50, 'p1234'
)

Bank.transfer(piyush, akash, 50, 'p1234');

piyush.displayBalance();
akash.displayBalance()

console.log('Total Accounts', Account.totalAccount);


// Map
/** DB
 * Account Number => Account Obj
 * 1 => Account Obj
 */

// Please revise these topic
// Classes
// Constructor
// How to use Classes in clean way
// static methods
// private variables

// I will start with
// Inheritance JS