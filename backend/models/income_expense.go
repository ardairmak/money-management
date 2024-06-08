package models

type IncomeExpense struct {
	IsIncome    bool    `json:"isIncome"`
	Name        string  `json:"name"`
	Category    string  `json:"category"`
	Price       float64 `json:"price"`
	Date        string  `json:"date"`
	Description string  `json:"description"`
}
