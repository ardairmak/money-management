package models

type Event struct {
	Name          string `json:"name"`
	Date          string `json:"date"`
	IsAllDay      bool   `json:"isAllDay"`
	TimeStart     string `json:"timeStart"`
	TimeEnd       string `json:"timeEnd"`
	Reminder      string `json:"reminder"`
	RenewalPeriod string `json:"renewalPeriod"`
	Color         string `json:"color"`
	Description   string `json:"description"`
}
