import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL, credentials: "include" }),
    // tagTypes: ["tagName"],
    endpoints: (builder) => {
        return {

            register: builder.mutation({
                query: Data => {
                    return {
                        url: "/api/auth/register",
                        method: "POST",
                        body: Data
                    }
                },
                // providesTags: ["tagName"]
            }),
            gotoDash: builder.query({
                query: Data => {
                    return {
                        url: "/api/auth/dash",
                        method: "GET",
                        // body: Data
                    }
                },
                // providesTags: ["tagName"]
            }),
            login: builder.mutation({
                query: userData => {
                    return {
                        url: "/api/auth/login",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("user", JSON.stringify(data.result))
                    return data.result
                }
                // invalidatesTags: ["tagName"]
            }),
            logout: builder.mutation({
                query: userData => {
                    return {
                        url: "/api/auth/logout",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("user")
                    return data.result
                }
                // invalidatesTags: ["tagName"]
            }),

        }
    }
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useGotoDashQuery } = authApi
