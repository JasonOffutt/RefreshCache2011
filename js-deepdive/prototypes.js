// Person class declaration
var Person = function(args) {
	// this is the constructor
	if (!args) {
		this.firstName = 'Jason';
		this.lastName = 'Offutt';
		this.birthdate = Date.parse('3/11/1979');
		return;
	}

	this.firstName =  args.firstName;
	this.lastName = args.lastName;
	this.birthdate = args.birthdate;
};

// Static method declaration
Person.doSomething = function() {
	console.log('doing something...');
	console.log('done');
};

// Instance method declaration
Person.prototype.getAge = function() {
	var today = new Date();
	var bday = new Date(this.birthdate);
	var nowYear = today.getFullYear();
	var birthYear = bday.getFullYear();
	
	var nowMonth = today.getMonth();
	var birthMonth = bday.getMonth();
	
	var nowDay = today.getDate();
	var birthDay = bday.getDate();
	var age = nowYear - birthYear;
	
	if (nowMonth < birthMonth) {
		age++;
	}
	else if (nowMonth === birthMonth && nowDate < birthDate) {
		age++;
	}
	
	return age;
};

var person = new Person();
var age = person.getAge();
Person.doSomething();

/**
The above code is basically equivalent to something like this in C#...

public class Person
{
	public string FistName { get; set; }
	public string LastName { get; set; }
	public DateTime Birthdate { get; set; }
	
	public Person()
	{
		FirstName = "Jason";
		LastName = "Offutt";
		Birthdate = new DateTime(1979, 3, 11);
	}

	public Person(string firstName, string lastName, DateTime birthdate)
	{
		FirstName = firstName;
		LastName = lastName;
		Birthdate = birthdate;
	}
	
	public int GetAge()
	{
		return BirthDate.Years;
	}
}

var person = new Person();
var age = person.GetAge();
*/