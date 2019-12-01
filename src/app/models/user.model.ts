export interface Roles {
    store?: boolean
    admin?: boolean
}

export interface User {
    uid?: string
    email?: string
    userName?: string
    displayName?: string
    password?: string
    status?: string
    roles: Roles
}