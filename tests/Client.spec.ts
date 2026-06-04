import {test,expect} from "@playwright/test";
 
test("test client application", async ({page})=>{
 
await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash")
console.log(await page.title())
await expect(page).toHaveTitle("Let's Shop")
 
const prodName = "iphone 13 pro"
 const email = page.getByPlaceholder("email@example.com")
 const pwd = page.locator("#userPassword")
 const signin = page.locator(".login-btn")
 
await email.fill("anshika@gmail.com");
await pwd.fill("Iamking@000");
await signin.click();
 
const allprods = page.locator(".card-body")
await allprods.locator("b").last().waitFor()
const prodslist = allprods.locator("b")
console.log(await prodslist.allTextContents())
 
for(let i=0; i< await prodslist.count(); i++){
if (await prodslist.nth(i).textContent()===prodName){
    await allprods.nth(i).getByText("Add To Cart").click()
    break;
}
}
 
 
 
await page.locator("[routerlink= '/dashboard/cart']").click()
 
const cartitemslist = page.locator(".ng-star-inserted")
const cartitems = await cartitemslist.locator(".cartSection h3")
await cartitems.last().waitFor()
console.log(await cartitems.allTextContents())
 
for(let i=0; i< await cartitems.count() ; i++){
    if (await cartitems.nth(i).textContent()=== prodName){
        console.log(await cartitems.nth(i).textContent())
 
         expect(await cartitems.nth(i).textContent()).toBe('iphone 13 pro')
        break;
 
    }
 
}
 
await page.getByRole("button", {name : "Checkout"}).click()
 
const country = page.getByPlaceholder("Select Country")
await country.pressSequentially("Au",{delay: 150})
 
 
   
const countrylist = page.locator(".ta-results button")
await countrylist.first().waitFor()
for(let i=0; i< await countrylist.count() ; i++){
     console.log(await countrylist.nth(i).textContent())
     if(await countrylist.nth(i).textContent() === " Austria"){
        await countrylist.nth(i).click()
        break;
     }
 
}
console.log(await country.inputValue())
expect(await country.inputValue()).toBe("Austria")
await page.locator(".action__submit").click()
console.log(await page.locator(".hero-primary").textContent())
expect(await page.locator(".hero-primary").textContent()).toBe(" Thankyou for the order. ")
 const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
 
//await page.pause()
})