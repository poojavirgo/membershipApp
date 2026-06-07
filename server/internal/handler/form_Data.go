package handler

import "github.com/britsport/membership-api/internal/model"

var formDetails = model.FormDetails{
	ClubID: "britsport",
	MemberTypes: []model.MemberType{
		{ID: "8FE4113D4E4020E0DCF887803A886981", Name: "Active Member"},
		{ID: "4237C55C5CC3B4B082CBF2540612778E", Name: "Social Member"},
	},
	FormID:            "B171388180BC457D9887AD92B6CCFC86",
	Title:             "Coding camp summer 2025",
    RegistrationOpens: "2024-12-16T00:00:00Z",
}

func validMemberTypeIDs() map[string]bool {
	set := make(map[string]bool, len(formDetails.MemberTypes))
	for _, mt := range formDetails.MemberTypes {
		set[mt.ID] = true
	}
	return set
}