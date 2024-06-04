class Remote {

    display() {
        console.log('This is a display for Remote')
    }
}

const r1 = new Remote()
r1.display()

/**
 * A constructor is required to create an instance
 * if there is no constructor, you cannot create an obj - 100% TRUE
 * 
 * Execute a program, if there is no constructor written by dev a 
 * "DEFAULT CONSTRUCTOR" is automatically created
 */