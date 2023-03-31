const form = document.getElementById( "signUp");
const formElements = document.querySelectorAll(".registration__main__line > div");

function slideUp() {
	setTimeout(function iter(i) {
		formElements[i].classList.add("slideUp");
		formElements[i].style.opacity = "100";
		if (++i < formElements.length) {
			setTimeout(iter, i * 150, i);
		}
	}, 0, 0);
}
slideUp();

function fetchJSONFile(path, callback) {
	let httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState === 4) {
			if (httpRequest.status === 200) {
				let data = JSON.parse(httpRequest.responseText);
				if (callback) callback(data);
			}
		}
	};
	httpRequest.open('GET', path);
	httpRequest.send();
}

function buildSuccessMessage() {
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

form.addEventListener("submit",  function(event) {
	event.preventDefault();
		fetchJSONFile('http://localhost:63342/validationForm/server-error.json', function(data){
			if (data.success === true) {
				buildSuccessMessage();
			} else {
				let completeBtn = document.querySelector(".footer__btn");
				completeBtn.classList.add("footer__btn-shake");

				data.errors.map(error => {
					let input = document.querySelector(`.main__input.${error.field}`);
					if (input) {
						validateInputs(error, input);
					}
				})
			}
		});
});

function validateInputs(error, input) {
	let rule = input.dataset.rule;
	let value = input.value;
	let check;

	switch (rule) {
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

	input.classList.remove("invalid");
	input.classList.remove("valid");

	if (input.nextElementSibling) {
		input.nextElementSibling.style.display = "none";
	}

	if (check) {
		input.classList.add("valid");
	} else {
		input.classList.add("invalid");

		if (input.nextElementSibling) {
			input.nextElementSibling.style.display = "block";
			let errorSpan = document.querySelector(`.validation__error.${error.field}`);
			errorSpan.innerHTML = error.message;
			errorSpan.style.display = "block";
		}
	}
}