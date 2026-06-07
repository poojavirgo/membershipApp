export const REGISTRATION = {
  pageTitle: "Club Membership Registration",
  loading: "Loading…",
  errorMessage: "We couldn’t load the registration form. Please try again.",

  steps: {
    membership: "Membership",
    details: "Details",
    review: "Review",
  },

  memberType: {
    heading: "Choose a membership type",
    ariaLabel: "Membership type",
    required: "Please select a membership type.",
  },

  details: {
    title: "Your details",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone number",
    birthDate: "Birth date",
  },

  review: {
    title: "Review your registration",
    membership: "Membership",
    price: "Price",
    name: "Name",
    email: "Email",
    phone: "Phone",
    birthDate: "Birth date",
  },

  actions: {
    back: "Back",
    continue: "Continue",
    submit: "Submit registration",
    submitting: "Submitting…",
  },

  success: {
    title: "You're all signed up!",
    body: "Thanks {name}! We've received your registration for {type}. A confirmation has been sent to {email}.",
    again: "Register another",
  },
  closed: {
    title: "Registration isn't open yet",
    body: "Sign-up for {title} opens on {date}. Please check back then.",
  },
  validation: {
    required: "{label} is required.",
    nameLetters: "{label} can only contain letters.",
    emailRequired: "Email is required.",
    emailInvalid: "Enter a valid email address.",
    phoneRequired: "Phone number is required.",
    phoneCountryCode:
      "Enter a valid phone number including country code (e.g. +47…).",
    phoneInvalid: "Enter a valid phone number.",
    birthRequired: "Birth date is required.",
    birthInvalid: "Enter a valid date.",
    birthFuture: "Birth date cannot be in the future.",
    birthTooOld: "Enter a valid birth date.",
  },
} as const;

export const STEP_LABELS = [
  REGISTRATION.steps.membership,
  REGISTRATION.steps.details,
  REGISTRATION.steps.review,
] as const;

export const REGISTRATION_DEFAULTS = {
  registrant: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
  },
} as const;
