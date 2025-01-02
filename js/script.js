document.addEventListener('DOMContentLoaded', () => {
	const stepNumbers = document.querySelectorAll('.sidebar__step-item');
	const stepContents = document.querySelectorAll('.step-section');
	let activeStepNumber = 1;

	const personalInfoForm = document.getElementById('personal-info-form');
	const personalInfoFormInputs = document.querySelectorAll(
		'#personal-info-form input'
	);
	const nameInput = document.getElementById('name');
	const emailInput = document.getElementById('email');
	const phoneNumberInput = document.getElementById('phone');
	const nameErrorText = document.querySelector(
		'.add-ons__form-label[for="name"] span'
	);
	const emailErrorText = document.querySelector(
		'.add-ons__form-label[for="email"] span'
	);
	const phoneErrorText = document.querySelector(
		'.add-ons__form-label[for="phone"] span'
	);

	const plans = document.querySelectorAll('.step-section__step-option');
	const planSwitchInput = document.getElementById('plan-switch__input');
	let planSpan = 'monthly';
	const spanPlans = document.querySelectorAll('.plan-switch__label');
	let selectedPlan = undefined;
	const planOptionCostTexts = document.querySelectorAll('.step-option__cost');
	const planOptionMonthFee = document.querySelectorAll(
		'.step-option__cost .monthly-fee'
	);
	const planOptionYearFee = document.querySelectorAll(
		'.step-option__cost .yearly-fee'
	);
	const monthlyPlanFee = [{ arcade: 9 }, { advanced: 12 }, { pro: 15 }];
	const yearlyPlanFee = [{ arcade: 90 }, { advanced: 120 }, { pro: 150 }];

	const backBtn = document.querySelector('.cta-btn--back');
	const nextBtn = document.querySelector('.cta-btn--next-confirm');

	showCorrectStepNumber();

	//*******************************************************
	//************************** Step 1
	//******************************************************

	// checks if name input is valid
	function isNameValid() {
		// if name empty
		if (nameInput.value === '') {
			nameInput.classList.add('error');

			nameErrorText.textContent = 'Name is required';
			nameErrorText.style.visibility = 'visible';

			return false;
		} else if (nameInput.value.length < 3) {
			// if name length is less than 3 characters
			nameInput.classList.add('error');

			nameErrorText.textContent = 'Name must be at least 3 characters';
			nameErrorText.style.visibility = 'visible';

			return false;
		}

		// remove error message
		nameInput.classList.remove('error');

		nameErrorText.style.visibility = 'hidden';

		// if name is valid
		return true;
	}

	// checks if email input is valid
	function isEmailValid() {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		// if email is empty
		if (emailInput.value === '') {
			emailInput.classList.add('error');

			emailErrorText.textContent = 'Email is required';
			emailErrorText.style.visibility = 'visible';

			return false;
		} else if (!emailRegex.test(emailInput.value)) {
			// if email is not valid
			emailInput.classList.add('error');

			emailErrorText.textContent = 'Email is not valid';
			emailErrorText.style.visibility = 'visible';

			return false;
		}

		// remove errors
		emailInput.classList.remove('error');

		emailErrorText.style.visibility = 'hidden';

		// if email is valid
		return true;
	}

	// checks if phone number input is valid
	function isPhoneNumberValid() {
		// if phone number is empty
		if (phoneNumberInput.value === '') {
			phoneNumberInput.classList.add('error');

			phoneErrorText.textContent = 'Phone number is required';
			phoneErrorText.style.visibility = 'visible';

			return false;
		} else if (phoneNumberInput.value.length < 9) {
			// if phone number length is less than 9 characters
			phoneNumberInput.classList.add('error');

			phoneErrorText.textContent = 'Phone must be at least 9 characters';
			phoneErrorText.style.visibility = 'visible';

			return false;
		}

		// remove errors
		phoneNumberInput.classList.remove('error');

		phoneErrorText.style.visibility = 'hidden';

		// if phone number is valid
		return true;
	}

	// checks if the form in step 1 is valid
	function isFormValid() {
		// if all the form fields are valid
		if (isNameValid() && isEmailValid() && isPhoneNumberValid()) {
			return true;
		}

		return false;
	}

	//*******************************************************
	//************************** Step 2
	//******************************************************
	function switchPlansFee(planSpan) {
		// if plan span is monthly
		if (planSpan === 'monthly') {
			plans.forEach((plan, index) => {
				const planDetail = plan.querySelector('.step-option__cost');
				planDetail.textContent = `$${
					monthlyPlanFee[index][plan.dataset.plan]
				}/mo`;
			});
		}

		if (planSpan === 'yearly') {
			plans.forEach((plan, index) => {
				const planDetail = plan.querySelector('.step-option__cost');
				planDetail.textContent = `$${
					yearlyPlanFee[index][plan.dataset.plan]
				}/yr`;
			});
		}
	}

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
			switchPlansFee(planSpan);
		} else {
			planSpan = 'monthly';

			spanPlans.forEach(span => {
				span.classList.remove('active');
			});

			spanPlans[0].classList.add('active');

			// change span on all plans
			switchPlansFee(planSpan);
		}
	});

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

				// update selected plan
				selectedPlan = plan;
			} else if (plan.dataset.plan === 'advanced') {
				// deselect other plan
				deselectOtherPlans(plan.dataset.plan);

				// select the appropriate plan
				plan.classList.add('selected');

				// update selected plan
				selectedPlan = plan;
			} else if (plan.dataset.plan === 'pro') {
				// deselect other plan
				deselectOtherPlans(plan.dataset.plan);

				// select the appropriate plan
				plan.classList.add('selected');

				// update selected plan
				selectedPlan = plan;
			}
		});
	});

	function isPlanSelected() {
		const selectedPlan = Array.from(plans).find(plan =>
			plan.classList.contains('selected')
		);

		if (selectedPlan === undefined) {
			alert('You must select a plan to continue');

			return false;
		}

		return true;
	}

	// buttons events
	nextBtn.addEventListener('click', () => nextStep());
	backBtn.addEventListener('click', () => previousStep());

	// show the next active step content
	function nextStep() {
		// current active step
		let currentActiveStep = Array.from(stepNumbers).find(stepNumber =>
			stepNumber.classList.contains('active-step')
		);

		// current active step content
		let currentActiveStepContent = Array.from(stepContents).find(
			stepContent => stepContent.classList.contains('active-step-content')
		);

		// step 1
		if (+currentActiveStep.dataset.step === 1) {
			// check if form is valid
			if (isFormValid()) {
				// save to local storage
				saveStepOne();

				// update active step
				showNextStep(currentActiveStep, currentActiveStepContent);

				// update active step number
				activeStepNumber++;

				// show back btn
				showBackBtn();
			}
		}

		// step 2
		if (+currentActiveStep.dataset.step === 2) {
			// save step two
			saveStepTwo();

			// check there is a plan selected
			if (isPlanSelected()) {
				// update active step
				showNextStep(currentActiveStep, currentActiveStepContent);

				// update active step number
				activeStepNumber++;
			}
		}

		// step 3
		if (+currentActiveStep.dataset.step === 3) {
			showNextStep(currentActiveStep, currentActiveStepContent);

			// update active step number
			activeStepNumber++;
		}

		// step 4
		if (+currentActiveStep.dataset.step === 4) {
			showNextStep(currentActiveStep, currentActiveStepContent);

			// update active step number
			activeStepNumber++;
		}
	}

	// show the previous step content
	function previousStep() {
		// current active step
		let currentActiveStep = Array.from(stepNumbers).find(stepNumber =>
			stepNumber.classList.contains('active-step')
		);

		// current active step content
		let currentActiveStepContent = Array.from(stepContents).find(
			stepContent => stepContent.classList.contains('active-step-content')
		);

		// show back btn
		if (+currentActiveStep.dataset.step === 2) {
			hideBackBtn();
		}

		showPreviousStep(currentActiveStep, currentActiveStepContent);
	}

	// highlight the correct step number according to the visible content
	function showCorrectStepNumber() {
		const activeContentStep = Array.from(stepContents).find(content =>
			content.classList.contains('active-step-content')
		);

		stepNumbers.forEach(stepNumber => {
			stepNumber.classList.remove('active-step');
		});

		// highlight the active step number
		const currentStepNumber = Array.from(stepNumbers).find(
			stepNumber =>
				stepNumber.dataset.step ===
				activeContentStep.dataset.step.toString()
		);
		currentStepNumber.classList.add('active-step');
	}

	// hide back btn
	function hideBackBtn() {
		if (!backBtn.classList.contains('hidden')) {
			backBtn.classList.add('hidden');
		}
	}

	// show back btn
	function showBackBtn() {
		if (backBtn.classList.contains('hidden')) {
			backBtn.classList.remove('hidden');
		}
	}

	// show next step
	function showNextStep(step, content) {
		// is step 5
		if (+content.dataset.step === 4) {
			const LAST_STEP_NUMBER = Array.from(stepNumbers).find(
				stepNumber => +stepNumber.dataset.step === 4
			);
			const LAST_STEP_CONTENT = Array.from(stepContents).find(
				stepContent => +stepContent.dataset.step === 5
			);
			const CTA_SECTION = document.querySelector('.cta-section');

			// active the last step number
			if (!LAST_STEP_NUMBER.classList.contains('active-step')) {
				LAST_STEP_NUMBER.classList.add('active-step');
			}

			// active the last step content
			LAST_STEP_CONTENT.previousElementSibling.classList.remove(
				'active-step-content'
			);
			LAST_STEP_CONTENT.classList.add('active-step-content');

			// hide the cta section
			CTA_SECTION.style.display = 'none';

			return;
		}

		step.nextElementSibling.classList.add('active-step');
		step.classList.remove('active-step');

		// update content
		content.nextElementSibling.classList.add('active-step-content');
		content.classList.remove('active-step-content');
	}

	// show previous step
	function showPreviousStep(step, content) {
		// update step number
		step.previousElementSibling.classList.add('active-step');
		step.classList.remove('active-step');

		// update content
		content.previousElementSibling.classList.add('active-step-content');
		content.classList.remove('active-step-content');
	}

	// save step one
	function saveStepOne() {
		// step one form data
		const MY_FORM_DATA = new FormData(personalInfoForm);

		// is there a record in local storage
		let storedStepOne = localStorage.getItem('stepOne');

		if (storedStepOne) {
			storedStepOne = JSON.parse(storedStepOne);

			// update stored step one
			for (const [KEY, VALUE] of MY_FORM_DATA) {
				storedStepOne[KEY] = VALUE;
			}

			localStorage.setItem('stepOne', JSON.stringify(storedStepOne));
		} else {
			const FORM_DATA_ENTRIES = {};

			for (const [KEY, VALUE] of MY_FORM_DATA) {
				FORM_DATA_ENTRIES[KEY] = VALUE;
			}

			localStorage.setItem('stepOne', JSON.stringify(FORM_DATA_ENTRIES));
		}
	}

	// save step two
	function saveStepTwo() {
		let planObj = {
			planName: '',
			planCost: 0,
			planSpan: '',
		};

		const SELECTED_PLAN = selectedPlan;

		// is there a record in local storage
		let storedStepTwo = localStorage.getItem('stepTwo');

		if (storedStepTwo) {
			storedStepTwo = JSON.parse(storedStepTwo);

			if (planSpan === 'monthly') {
				const myPlanFee = monthlyPlanFee.find(planFee => {
					for (const [key, value] of Object.entries(planFee)) {
						if (SELECTED_PLAN.dataset.plan === key) {
							return value;
						}
					}
				});

				storedStepTwo.planName = SELECTED_PLAN.dataset.plan;
				storedStepTwo.planCost = myPlanFee[SELECTED_PLAN.dataset.plan];
				storedStepTwo.planSpan = planSpan;
			}

			if (planSpan === 'yearly') {
				const myPlanFee = yearlyPlanFee.find(planFee => {
					for (const [key, value] of Object.entries(planFee)) {
						if (SELECTED_PLAN.dataset.plan === key) {
							return value;
						}
					}
				});

				storedStepTwo.planName = SELECTED_PLAN.dataset.plan;
				storedStepTwo.planCost = myPlanFee[SELECTED_PLAN.dataset.plan];
				storedStepTwo.planSpan = planSpan;
			}

			localStorage.setItem('stepTwo', JSON.stringify(storedStepTwo));
		} else {
			if (planSpan === 'monthly') {
				const myPlanFee = monthlyPlanFee.find(planFee => {
					for (const [key, value] of Object.entries(planFee)) {
						if (SELECTED_PLAN.dataset.plan === key) {
							return value;
						}
					}
				});

				planObj.planName = SELECTED_PLAN.dataset.plan;
				planObj.planCost = myPlanFee[SELECTED_PLAN.dataset.plan];
				planObj.planSpan = planSpan;
			}

			if (planSpan === 'yearly') {
				const myPlanFee = yearlyPlanFee.find(planFee => {
					for (const [key, value] of Object.entries(planFee)) {
						if (SELECTED_PLAN.dataset.plan === key) {
							return value;
						}
					}
				});

				planObj.planName = SELECTED_PLAN.dataset.plan;
				planObj.planCost = myPlanFee[SELECTED_PLAN.dataset.plan];
				planObj.planSpan = planSpan;
			}

			localStorage.setItem('stepTwo', JSON.stringify(planObj));
		}
	}

	// save step three
});
