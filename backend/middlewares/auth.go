package middlewares

import (
	"context"
	"net/http"
	"strings"

	"firebase.google.com/go/auth"
)

func AuthMiddleware(authClient *auth.Client, next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("Authorization")
		if token == "" {
			http.Error(w, "Authorization header is missing", http.StatusUnauthorized)
			return
		}

		token = strings.TrimSpace(strings.Replace(token, "Bearer", "", 1))
		_, err := authClient.VerifyIDToken(context.Background(), token)
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		next(w, r)
	}
}
