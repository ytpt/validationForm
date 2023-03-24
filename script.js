const form = document.getElementById( "signUp");
let inputs = document.querySelectorAll("input[data-rule]");
let selects = document.querySelectorAll("select");

form.addEventListener("submit", function(event) {
	event.preventDefault();

	if (formValidate(this)) {
		// 	let response = await fetch("server-ok.json", {
		// 		method: "POST",
		// 		body: new FormData(form)
		// 	});
		//
		// 	let result = await response.json();
		// 	console.log(result);
		// }
		console.log("Форма отправлена");
	}
});

function formValidate() {
	return true;
}

for (let input of inputs) {
	input.addEventListener("blur", function() {
		let rule = this.dataset.rule;
		let value = this.value;
		let check;

		switch(rule) {
			case "name":
				check = /^[A-Za-z]+$/.test(value);
				break;

			case "email":
				check = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
				break;

			case "birthdate":
				break;

			case "gender":
				break;

			case "password":
				check = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8}$/.test(value);
				break;

			case "confirm":
				let pass1 = document.getElementById("password").value;
				pass1 === value ? check = true : check = false;
		}

		this.classList.remove("invalid");
		this.classList.remove("valid");

		if (check) {
			this.classList.add("valid");
		} else {
			this.classList.add("invalid");
		}
	})
}

for (let select of selects) {
	select.addEventListener("blur", function() {

		select.classList.remove("invalid");
		select.classList.remove("valid");

		select.value === "Default"
			? select.classList.add("invalid")
			: select.classList.add("valid");
	})
}