import { Auth, } from "aws-amplify";
import { useEffect, useState } from "react";
import awsconfig from "../../../aws-exports";
import { API, graphqlOperation } from "aws-amplify";

export default function User(props:any) {
  API.configure(awsconfig);
  const [user, updateUser] = useState(null)
  const [uname, setUsername] = useState(null)
  const [email, setEmail] = useState(null)
  // const [pw, setPassword] = useState(null)
  const [newPassword, setNewPassword] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [loggedIn,setLoggedIn] = useState(false)

  async function changePw() {
    Auth.currentAuthenticatedUser()
    .then(user => {
       return Auth.changePassword(user, oldPassword, newPassword);
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }

  useEffect(() => {
    async function AccessLoggedInState() {
      try {
          const user = await Auth.currentAuthenticatedUser();
          // updateUser(user);
          setUsername(user.username);
          setEmail((user.attributes.email));
          // setPassword(user.password) // cant get pw!!
          // const email = user.attribute
          setLoggedIn(true);
          console.log(user);
          return true
      } catch {
        setLoggedIn(false);
        return false
      }
    }

    AccessLoggedInState()
  }, [])

  return (
    <div>
      Hello {user}!<br />
      Username: {uname}<br />
      Email: {email}<br />
      Password: {oldPassword}<br />
      <div>
        <input value={oldPassword} type="password" placeholder="Enter Your Old Password" onChange={e=> setOldPassword(e.target.value)} />
        <input type="password" placeholder="Enter New Password" value = {newPassword}onChange={e=> setNewPassword(e.target.value)} /><br />
        {newPassword}<br />
        <button onClick={()=>changePw()}>Change</button>
      </div>
    </div>    
  )
}
