package model

type MemberType struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type FormDetails struct {
	ClubID            string       `json:"clubId"`
	MemberTypes       []MemberType `json:"memberTypes"`
	FormID            string       `json:"formId"`
	Title             string       `json:"title"`
	RegistrationOpens string       `json:"registrationOpens"`
}

type Registration struct {
	FormID       string `json:"formId"`
	MemberTypeID string `json:"memberTypeId"`
	FirstName    string `json:"firstName"`
	LastName     string `json:"lastName"`
	Email        string `json:"email"`
	Phone        string `json:"phone"`
	BirthDate    string `json:"birthDate"`
}