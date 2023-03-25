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
		document.querySelector(".signup-icon").style.display = "none";

		let success = document.createElement("div");
		success.classList.add("success");
		success.innerHTML = `
			<div class="success__main">
				<h2 class="success__main__title">Thank You!</h2>
				<p class="success__main__text">you registered!</p>
			</div>
			<div class="success__login">
				<p>Have an account?
					<a href="#" class="success__login__link">Login</a>
				</p>
			</div>
		`;

		form.replaceWith(success);
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
				check = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g.test(value);
				break;

			case "confirm":
				let pass1 = document.getElementById("password").value;
				pass1 === value ? check = true : check = false;
		}

		this.classList.remove("invalid");
		this.classList.remove("valid");

		if (this.nextElementSibling) {
			this.nextElementSibling.style.display = "none";
		}

		if (check) {
			this.classList.add("valid");
		} else {
			this.classList.add("invalid");

			if (this.nextElementSibling) {
				this.nextElementSibling.style.display = "block";
			}
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