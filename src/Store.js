import { Store } from "pullstate";

export const AppStore = new Store({
  auth: {token : false},
  userId:"",
  username : "",
  adminToken : "",
  livreurId : "",
  
});