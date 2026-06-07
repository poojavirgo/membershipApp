package model

import (
	"regexp"
	"strings"
	"time"
)

var (
	emailRe = regexp.MustCompile(`^[^\s@,]+@[^\s@,]+\.[^\s@,]+$`)
	nameRe  = regexp.MustCompile(`^[\p{L}][\p{L}\s'-]*$`)
	digitRe = regexp.MustCompile(`\d`)
)

type ValidationErrors map[string]string

func (r Registration) Validate(validMemberTypeIDs map[string]bool) ValidationErrors {
	errs := ValidationErrors{}

	switch {
	case strings.TrimSpace(r.FirstName) == "":
		errs["firstName"] = "First name is required."
	case !nameRe.MatchString(strings.TrimSpace(r.FirstName)):
		errs["firstName"] = "First name can only contain letters."
	}

	switch {
	case strings.TrimSpace(r.LastName) == "":
		errs["lastName"] = "Last name is required."
	case !nameRe.MatchString(strings.TrimSpace(r.LastName)):
		errs["lastName"] = "Last name can only contain letters."
	}

	switch {
	case strings.TrimSpace(r.Email) == "":
		errs["email"] = "Email is required."
	case !emailRe.MatchString(strings.TrimSpace(r.Email)):
		errs["email"] = "Enter a valid email address."
	}

	// Phone: must start with + and contain 8–15 digits total (country code + number).
	phone := strings.TrimSpace(r.Phone)
	switch {
	case phone == "":
		errs["phone"] = "Phone number is required."
	case !strings.HasPrefix(phone, "+"):
		errs["phone"] = "Enter a valid phone number including country code (e.g. +47…)."
	default:
		digits := len(digitRe.FindAllString(phone, -1))
		if digits < 8 || digits > 15 {
			errs["phone"] = "Enter a valid phone number."
		}
	}

	if r.BirthDate == "" {
		errs["birthDate"] = "Birth date is required."
	} else if t, err := time.Parse("2006-01-02", r.BirthDate); err != nil {
		errs["birthDate"] = "Enter a valid date."
	} else if t.After(time.Now()) {
		errs["birthDate"] = "Birth date cannot be in the future."
	}

	if strings.TrimSpace(r.FormID) == "" {
		errs["formId"] = "Form ID is required."
	}

	switch {
	case strings.TrimSpace(r.MemberTypeID) == "":
		errs["memberTypeId"] = "Member type is required."
	case !validMemberTypeIDs[r.MemberTypeID]:
		errs["memberTypeId"] = "Unknown member type."
	}

	return errs
}