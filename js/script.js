const steps = document.querySelectorAll('.sidebar__step-item');
const stepSections = document.querySelectorAll('.step-section');
let activeStepNumber = 1;
const personalInfoForm = document.querySelectorAll('#personal-info-form');
const personalInfoFormInputs = document.querySelectorAll(
	'#personal-info-form input'
);
const infoName = document.getElementById('name');
const infoEmail = document.getElementById('email');
const infoPhoneNumber = document.getElementById('phone');
const formErrorTexts = document.querySelectorAll('.form-error-text');
const nameErrorText = document.querySelector(
	'.add-ons__form-label[for="name"] span'
);
const emailErrorText = document.querySelector(
	'.add-ons__form-label[for="email"] span'
);
const phoneErrorText = document.querySelector(
	'.add-ons__form-label[for="phone"] span'
);
const backBtn = document.querySelector('.cta-btn--back');
const nextBtn = document.querySelector('.cta-btn--next-confirm');
const plans = document.querySelectorAll('.step-section__step-option');
const planSwitchInput = document.getElementById('plan-switch__input');
let planSpan = 'monthly';
const spanPlans = document.querySelectorAll('.plan-switch__label');
const planOptionCostTexts = document.querySelectorAll('.step-option__cost');
const planOptionMonthFee = document.querySelectorAll(
	'.step-option__cost .monthly-fee'
);
const planOptionYearFee = document.querySelectorAll(
	'.step-option__cost .yearly-fee'
);
const addOns = document.querySelectorAll('.add-ons__form-input');

/*******************************************************
 ************************** Step 1
 ******************************************************/

// check if all inputs are valid to enable next btn
function areInputSiblingsValid(currentInput) {
	const siblings = Array.from(personalInfoFormInputs).filter(
		sibling => sibling != currentInput
	);

	const validSiblings = siblings.every(sibling =>
		sibling.classList.contains('success')
	);

	if (validSiblings) {
		return true;
	} else {
		return false;
	}
}

// enable next button
function enableNextBtnStepOne(input) {
	if (areInputSiblingsValid(input)) {
		nextBtn.classList.add('valid');

		// remove disable from HTML tag attributes
		nextBtn.removeAttribute('disabled');
	}
}

// Step 1 Personal info, on name input change
infoName.addEventListener('input', e => {
	const name = e.target.value;

	if (name.length < 6) {
		e.target.classList.add('error');
		nameErrorText.innerHTML = 'Name must be at least 6 characters';
		nameErrorText.style.visibility = 'visible';
	} else {
		e.target.classList.remove('error');
		e.target.classList.add('success');
		nameErrorText.style.visibility = 'hidden';
		enableNextBtnStepOne(e.target);
	}
});

// Step 1 Personal info, on name input blur
infoName.addEventListener('blur', e => {
	// name is missing
	if (infoName.value === '') {
		e.target.classList.remove('success');
		e.target.classList.add('error');
		nameErrorText.textContent = 'Name is required';
		nameErrorText.style.visibility = 'visible';
		return;
	}

	// invalid name
	if (infoName.value.length < 6) {
		infoName.classList.remove('success');
		infoName.classList.add('error');
		nameErrorText.innerHTML = 'Name must be at least 6 characters';
		nameErrorText.style.visibility = 'visible';

		return;
	}

	e.target.classList.remove('error');
	e.target.classList.add('success');
	nameErrorText.style.visibility = 'hidden';
	enableNextBtnStepOne(infoName);
});

// regex email validation
function validateEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// email validation on input
infoEmail.addEventListener('input', e => {
	//	invalid email
	if (validateEmail(infoEmail.value)) {
		infoEmail.classList.remove('error');
		infoEmail.classList.add('success');
		emailErrorText.style.visibility = 'hidden';
		enableNextBtnStepOne(infoEmail);
	} else {
		emailErrorText.textContent = 'Email is not yet valid';
		emailErrorText.style.visibility = 'visible';
		infoEmail.classList.remove('success');
		infoEmail.classList.add('error');
	}
});

// Step 1 Personal info, email on blur
infoEmail.addEventListener('blur', e => {
	// email is missing
	if (infoEmail.value === '') {
		infoEmail.classList.remove('success');
		infoEmail.classList.add('error');
		emailErrorText.innerHTML = 'Email is required';
		emailErrorText.style.visibility = 'visible';
		return;
	}

	//	invalid email
	if (validateEmail(infoEmail.value)) {
		infoEmail.classList.remove('error');
		infoEmail.classList.add('success');
		emailErrorText.style.visibility = 'hidden';
		enableNextBtnStepOne(infoEmail);
	} else {
		emailErrorText.textContent = 'Please enter a valid email';
		emailErrorText.style.visibility = 'visible';
		infoEmail.classList.remove('success');
		infoEmail.classList.add('error');
	}
});

//	Step 1 Personal info, phone on input change
infoPhoneNumber.addEventListener('input', () => {
	if (infoPhoneNumber.value.length < 9) {
		phoneErrorText.textContent = 'Phone must be at least 9';
		phoneErrorText.style.visibility = 'visible';
		infoPhoneNumber.classList.remove('success');
		infoPhoneNumber.classList.add('error');
		return;
	}

	infoPhoneNumber.classList.remove('error');
	infoPhoneNumber.classList.add('success');
	phoneErrorText.style.visibility = 'hidden';
	enableNextBtnStepOne(infoPhoneNumber);
});

//	Step 1 Personal info, phone on blur
infoPhoneNumber.addEventListener('blur', () => {
	if (infoPhoneNumber.value === '') {
		phoneErrorText.textContent = 'Phone number is required';
		phoneErrorText.style.visibility = 'visible';
		infoPhoneNumber.classList.remove('success');
		infoPhoneNumber.classList.add('error');
		return;
	}

	infoPhoneNumber.classList.remove('error');
	infoPhoneNumber.classList.add('success');
	phoneErrorText.style.visibility = 'hidden';
	enableNextBtnStepOne(infoPhoneNumber);
});

/*******************************************************
 ************************** Step 2
 ******************************************************/

// deselect other plans
function deselectOtherPlans(currentPlan) {
	// plan siblings
	const siblings = Array.from(plans).filter(
		plan => plan.dataset.plan != currentPlan
	);

	// deselect other plans
	siblings.forEach(sibling => {
		sibling.classList.remove('selected');
	});
}

// select the plans
plans.forEach(plan => {
	plan.addEventListener('click', () => {
		if (plan.dataset.plan === 'arcade') {
			// deselect other plan
			deselectOtherPlans(plan.dataset.plan);
			// select the appropriate plan
			plan.classList.add('selected');

			// enable next btn
			enableNextBtnStepTwo();
		} else if (plan.dataset.plan === 'advanced') {
			// deselect other plan
			deselectOtherPlans(plan.dataset.plan);

			// select the appropriate plan
			plan.classList.add('selected');

			// enable next btn
			enableNextBtnStepTwo();
		} else if (plan.dataset.plan === 'pro') {
			// deselect other plan
			deselectOtherPlans(plan.dataset.plan);

			// select the appropriate plan
			plan.classList.add('selected');

			// enable next btn
			enableNextBtnStepTwo();
		}
	});
});

// switch plan span
planSwitchInput.addEventListener('click', () => {
	const checked = planSwitchInput.checked;

	if (checked) {
		planSpan = 'yearly';

		// change plans span
		spanPlans.forEach(span => {
			span.classList.remove('active');
		});

		spanPlans[1].classList.add('active');

		// change span on all plans
		planOptionMonthFee.forEach(planOptionMonth => {
			planOptionMonth.style.display = 'none';
		});

		planOptionYearFee.forEach(planOptionYear => {
			planOptionYear.style.display = 'block';
		});
	} else {
		planSpan = 'monthly';

		spanPlans.forEach(span => {
			span.classList.remove('active');
		});

		spanPlans[0].classList.add('active');

		// change span on all plans
		planOptionYearFee.forEach(planOptionYear => {
			planOptionYear.style.display = 'none';
		});

		planOptionMonthFee.forEach(planOptionMonth => {
			planOptionMonth.style.display = 'block';
		});
	}
});

// enable next button
function enableNextBtnStepTwo() {
	// check if one the plan is selected
	plans.forEach(plan => {
		if (plan.classList.contains('selected')) {
			nextBtn.classList.add('valid');

			// remove disable from HTML tag attributes
			nextBtn.removeAttribute('disabled');
		}
	});
}

/***********************************************
 ********************* Step 3
 **********************************************/

addOns.forEach(addOn => {
	if (addOn.checked) {
	}
});

// enable next button
function enableNextBtnStepTwo() {
	// check if one the plan is selected
	plans.forEach(plan => {
		if (plan.classList.contains('selected')) {
			nextBtn.classList.add('valid');

			// remove disable from HTML tag attributes
			nextBtn.removeAttribute('disabled');
		}
	});
}

/***********************************************
 ********************* Global form elements
 **********************************************/

// update active step number
function updateActiveStepNumber(stepNumber) {
	steps.forEach(step => {
		if (step.classList.contains('active-step')) {
			step.classList.remove('active-step');
		}

		if (+step.dataset.step === stepNumber) {
			step.classList.add('active-step');
		}
	});
}

// updates the active step content
function updateActiveStepContent(activeStepNumber) {
	stepSections.forEach(section => {
		if (section.classList.contains('active-step-content')) {
			section.classList.remove('active-step-content');
		}

		if (+section.dataset.step === activeStepNumber) {
			section.classList.add('active-step-content');
		}
	});
}

// next button on click
nextBtn.addEventListener('click', () => {
	// increase active step number
	activeStepNumber++;

	// update the aside active step number
	updateActiveStepNumber(activeStepNumber);

	// update the active step content
	updateActiveStepContent(activeStepNumber);
});

// go back button onClick
backBtn.addEventListener('click', () => {
	// increase active step number
	activeStepNumber--;

	// update the aside active step number
	updateActiveStepNumber(activeStepNumber);

	// update the active step content
	updateActiveStepContent(activeStepNumber);
});
