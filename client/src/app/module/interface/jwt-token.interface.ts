export interface JwtToken {
    //nome do usuario logado no sistema
    name: string,

    // id unico do usuario que está logado no sistema,
    // esse valor é gerado pelo keycloak
    sub: string
}
