
interface IRoles {
    User: string,
    Editor: string,
    Admin: string
}

interface IScopes {
    canRead: string,
    canWrite: string,
    canExecute: string
}

interface IPermission {
    USER: string[]
    EDITOR: string[]
    ADMIN: string[]
}

const ROLES = {
    User: 'USER',
    Editor: 'EDITOR',
    Admin: 'ADMIN'
}

const SCOPES = {
    canRead: 'can-read',
    canWrite: 'can-write',
    canExecute: 'can-execute'
}

export const PERMISSION = {
    [ROLES.User]: [SCOPES.canRead],  //https://262.ecma-international.org/6.0/#sec-object-initializer "ComputedProperyName"
    [ROLES.Editor]: [SCOPES.canRead, SCOPES.canWrite],
    [ROLES.Admin]: [SCOPES.canRead, SCOPES.canWrite, SCOPES.canExecute]
}

const PermissionWrapper = () => <></>

export default PermissionWrapper 