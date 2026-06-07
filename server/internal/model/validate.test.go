package model

import "testing"

func validIDs() map[string]bool {
	return map[string]bool{
		"8FE4113D4E4020E0DCF887803A886981": true,
		"4237C55C5CC3B4B082CBF2540612778E": true,
	}
}

func validRegistration() Registration {
	return Registration{
		FormID:       "B171388180BC457D9887AD92B6CCFC86",
		MemberTypeID: "8FE4113D4E4020E0DCF887803A886981",
		FirstName:    "Ada",
		LastName:     "Lovelace",
		Email:        "ada@example.com",
		Phone:        "+4787654322",
		BirthDate:    "1990-12-10",
	}
}

func TestValidate_ValidRegistration(t *testing.T) {
	r := validRegistration()
	errs := r.Validate(validIDs())
	if len(errs) != 0 {
		t.Fatalf("expected no errors, got %v", errs)
	}
}

func TestValidate_RequiredFields(t *testing.T) {
	r := Registration{} 
	errs := r.Validate(validIDs())

	for _, field := range []string{"firstName", "lastName", "email", "phone", "birthDate", "formId", "memberTypeId"} {
		if _, ok := errs[field]; !ok {
			t.Errorf("expected a required error for %q, got none", field)
		}
	}
}

func TestValidate_Name(t *testing.T) {
	cases := []struct {
		name    string
		first   string
		wantErr bool
	}{
		{"letters", "Ada", false},
		{"accented", "José", false},
		{"hyphen", "Anne-Marie", false},
		{"apostrophe", "O'Brien", false},
		{"digits rejected", "Ada1", true},
		{"symbol rejected", "@", true},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			r := validRegistration()
			r.FirstName = c.first
			errs := r.Validate(validIDs())
			_, got := errs["firstName"]
			if got != c.wantErr {
				t.Errorf("FirstName=%q: wantErr=%v, got error=%v (%v)", c.first, c.wantErr, got, errs["firstName"])
			}
		})
	}
}

func TestValidate_Email(t *testing.T) {
	cases := []struct {
		email   string
		wantErr bool
	}{
		{"ada@example.com", false},
		{"a@b.co", false},
		{"notanemail", true},
		{"missing@domain", true},
		{"a,b@c.com", true},
		{"", true},
	}
	for _, c := range cases {
		t.Run(c.email, func(t *testing.T) {
			r := validRegistration()
			r.Email = c.email
			errs := r.Validate(validIDs())
			_, got := errs["email"]
			if got != c.wantErr {
				t.Errorf("Email=%q: wantErr=%v, got=%v", c.email, c.wantErr, got)
			}
		})
	}
}

func TestValidate_Phone(t *testing.T) {
	cases := []struct {
		phone   string
		wantErr bool
	}{
		{"+4787654322", false}, 
		{"+1234567", true},     
		{"87654322", true}, 
		{"+47876543221234567", true},
		{"", true},     
	}
	for _, c := range cases {
		t.Run(c.phone, func(t *testing.T) {
			r := validRegistration()
			r.Phone = c.phone
			errs := r.Validate(validIDs())
			_, got := errs["phone"]
			if got != c.wantErr {
				t.Errorf("Phone=%q: wantErr=%v, got=%v", c.phone, c.wantErr, got)
			}
		})
	}
}

func TestValidate_BirthDate(t *testing.T) {
	cases := []struct {
		name    string
		date    string
		wantErr bool
	}{
		{"valid past", "1990-01-01", false},
		{"future", "2999-01-01", true},
		{"malformed", "not-a-date", true},
		{"empty", "", true},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			r := validRegistration()
			r.BirthDate = c.date
			errs := r.Validate(validIDs())
			_, got := errs["birthDate"]
			if got != c.wantErr {
				t.Errorf("BirthDate=%q: wantErr=%v, got=%v", c.date, c.wantErr, got)
			}
		})
	}
}

func TestValidate_MemberType(t *testing.T) {
	t.Run("known id passes", func(t *testing.T) {
		r := validRegistration()
		if _, got := r.Validate(validIDs())["memberTypeId"]; got {
			t.Error("expected no error for a known member type")
		}
	})
	t.Run("unknown id rejected", func(t *testing.T) {
		r := validRegistration()
		r.MemberTypeID = "DOES_NOT_EXIST"
		if _, got := r.Validate(validIDs())["memberTypeId"]; !got {
			t.Error("expected an error for an unknown member type")
		}
	})
	t.Run("empty id rejected", func(t *testing.T) {
		r := validRegistration()
		r.MemberTypeID = ""
		if _, got := r.Validate(validIDs())["memberTypeId"]; !got {
			t.Error("expected an error for an empty member type")
		}
	})
}