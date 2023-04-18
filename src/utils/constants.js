export const API_ROUTES = {
    SIGN_UP: '/api/auth/signup',
    SIGN_IN: '/api/auth/signin',
    SIGN_OUT: '/api/auth/signout',
    GET_USER: '/api/auth/getuser',
    GET_CART: '/api/auth/getcart',
}

export const APP_ROUTES = {
    SIGN_UP: '/signup',
    SIGN_IN: '/signin',
    HOME: '/',
    PROFILE: '/profile',
}

export const cookie = {
  cookieName: "next-auth-hyperano",
  password: "complex_password_at_least_32_characters_long_hyperano",
  cookieOptions: { secure: true },
};

export const baseUrl = "https://hyperano.ir/api/"