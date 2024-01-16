let obj = {
    "first_name": "Vardan",
    "last_name": "Hovsepyan",
    "age": 13,
    "tumo_student": true,

    sayHello() {
        console.log(this.first_name)
    }
}


console.log("obj");
console.log(obj);
console.log("obj.first_name");
console.log(obj.first_name);
console.log("obj.sayHello");
obj.sayHello();