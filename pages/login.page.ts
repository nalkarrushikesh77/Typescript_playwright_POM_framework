import {Page, Locator} from "@playwright/test"
export class LoginPage{

readonly page:Page;
readonly userName:Locator;
readonly passWord:Locator;
readonly loginButton:Locator;

constructor(page:Page){

this.page=page;
this.userName= page.getByPlaceholder("Username")
this.passWord=page.getByPlaceholder("Password")
this.loginButton=page.getByRole("button", { name: "Login" })

}

async fillUsername(username:string){
    await this.userName.fill(username)
}

async fillpassword(pass:string){
    await this.passWord.fill(pass)
}

async clickLogin(){

    await this.loginButton.click()
}


async performLogin(username:string, pass:string)
{
    await this.fillUsername(username)
    await this.fillpassword(pass)
    await this.clickLogin()
}


}
