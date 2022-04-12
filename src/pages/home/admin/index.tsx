import { Auth, API} from "aws-amplify";
import { useEffect, useState } from "react";
import awsconfig from "../../../aws-exports";

export default function Admin(props:any) {
  API.configure(awsconfig);
  const [user, updateUser] = useState(null)
  const [uname, setUsername] = useState(null)
  const [email, setEmail] = useState(null)
  // const [pw, setPassword] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [admin, setAdmin] = useState(false)
  // const [user, setUser] = useState(false)

  // list user in admin page
  let nextToken;

  async function listAdmin(){
    let apiName = 'AdminQueries';
    let path = '/listUsersInGroup';
    let myInit = { 
        queryStringParameters: {
          "groupname": "Admin",
          "token": nextToken
        },
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        }
    }
    const { NextToken, ...rest } =  await API.get(apiName, path, myInit);
    nextToken = NextToken;
    return rest;
  }
  // add user to admin grp
  async function addToGroup() { 
    let apiName = 'AdminQueries';
    let path = '/addUserToGroup';
    let myInit = {
        body: {
          "username" : "richard",
          "groupname": "Admin"
        }, 
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        } 
    }
    return await API.post(apiName, path, myInit);
  }

  // delete user by admin

  useEffect(() => {
    async function AccessLoggedInState() {
      // if user is admin?
      try {
        const user = await Auth.currentAuthenticatedUser();
        // updateUser(user);
        setUsername(user.username);
        setLoggedIn(true);
        console.log(user);
        const group = user.signInUserSession.accessToken.payload["cognito:groups"]
    
        if (group.includes('Admin')) {
          setAdmin(true);
          console.log(group)
        }
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
      <div>
      <button onClick={() => addToGroup()}>Add to Group</button>
      <button onClick={() => listAdmin()}>List Editors</button>
      </div>
    </div>    
  )
}
