package handlers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"ardairmak.com/money-management/utils"
	"firebase.google.com/go/auth"
)

type RegisterRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginRequest struct {
	IDToken string `json:"idToken"`
}

type LoginResponse struct {
	UID   string `json:"uid"`
	Email string `json:"email"`
}

type LogoutRequest struct {
	UID string `json:"uid"` // or other necessary fields
}

func Register(w http.ResponseWriter, r *http.Request) {
	var req RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	params := (&auth.UserToCreate{}).
		Email(req.Email).
		Password(req.Password).
		Disabled(false)

	userRecord, err := utils.FirebaseAuth.CreateUser(context.Background(), params)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(userRecord)

	log.Println("User registered successfully.")
}

func Login(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx := context.Background()
	tokenInfo, err := utils.FirebaseAuth.VerifyIDToken(ctx, req.IDToken)
	if err != nil {
		http.Error(w, "Invalid ID token", http.StatusUnauthorized)
		return
	}

	userRecord, err := utils.FirebaseAuth.GetUser(ctx, tokenInfo.UID)
	if err != nil {
		http.Error(w, "Failed to get user record", http.StatusInternalServerError)
		return
	}

	resp := LoginResponse{
		UID:   userRecord.UID,
		Email: userRecord.Email,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)

	log.Println("User logged in successfully.")
}

func Logout(w http.ResponseWriter, r *http.Request) {
	var req LogoutRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err := utils.FirebaseAuth.RevokeRefreshTokens(context.Background(), req.UID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{
		"message": "User logged out successfully.",
	})

	log.Println("User logged out successfully.")
}
