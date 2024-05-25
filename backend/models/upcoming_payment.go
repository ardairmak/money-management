package models

type UpcomingPayment struct {
	Name          string `json:"name"`
	Price         int    `json:"price"`
	RenewalPeriod string `json:"renewal_period"`
	Repetition    int    `json:"repetition"`
	Date          string `json:"date"`
	Reminder      string `json:"reminder"`
	Category      string `json:"category"`
	Description   string `json:"description"`
}
