import { Auth, API} from "aws-amplify";
import { setDefaultResultOrder } from "dns";
import { useEffect, useState } from "react";
import awsconfig from "../../../aws-exports";
import { deleteUser } from "../../../graphql/mutations";

export default function Admin(props:any) {
  API.configure(awsconfig);
  // const [user, updateUser] = useState(null)
  const [uname, setUsername] = useState(null)
  // const [pw, setPassword] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [userList, setUserList] = useState([])
  const [searchUserInput, setSearchUser] = useState([])

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
          // console.log(group)
        }
      } catch {
        setLoggedIn(false);
      }
    }

    AccessLoggedInState()
    listUser()
  }, [])

  // list user in admin page
  let nextToken;

  async function listUser(){
    let apiName = 'AdminQueries';
    let path = '/listUsers';
    let myInit = { 
      queryStringParameters: {
        "token": nextToken
      },
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    }
    
    const { NextToken, ...rest } =  await API.get(apiName, path, myInit);
    nextToken = NextToken;
    console.log(rest.Users)
    setUserList(rest.Users)
    // console.log(userList)
  }

  // add user to admin grp by search bar
  async function addToGroup(uname: String) { 
    let apiName = 'AdminQueries';
    let path = '/addUserToGroup';
    let myInit = {
        body: {
          "username" : uname,
          "groupname": "Admin"
        }, 
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        } 
    }
    console.log("Success add user", uname, "to Admin Group");
    return await API.post(apiName, path, myInit);
  }

  // delete user by admin
  async function deleteUser(uname: String) { 
    let apiName = 'AdminQueries';
    let path = '/disableUser';
    let myInit = {
        body: {
          "username" : uname,
        }, 
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        } 
    }
    console.log("Success delete user", uname);
    return await API.post(apiName, path, myInit);
  }

  return (
    <div>
      Username: {uname}<br />
      {admin ? 
        <div>
          <div>
            <input value={searchUserInput} placeholder="Search user here..." onChange={(e)=>{setSearchUser(e.target.value)}} />
            {searchUserInput !== "" ?
            <div>
              {userList.map(item=>{
                if (item.Username.includes(searchUserInput)) {
                  return (
                    <li key={item.Username}>
                      {item.Username}
                    <button value={item.Username} onClick={e=>addToGroup(e.target.value)}>Promote to admin</button>
                    <button value={item.Username} onClick={e=>deleteUser(e.target.value)}>Delete</button>
                    </li>
                  )
                }
              })}
            </div>: <div>No user found</div>}
          </div>
          <h1><b>User List here</b></h1>
          <div>
          {
            userList&&userList.map(item => {
              return (
                <li key={item.Username}>
                  {item.Username}
                  {/* {item.Enabled} */}
                  <button value={item.Username} onClick={e=>addToGroup(e.target.value)}>Promote to admin</button>
                  <button value={item.Username} onClick={e=>deleteUser(e.target.value)}>Delete</button>
                  {/* <button onClick={()=>deleteUser()}>Delete</button> */}
                </li>
              );
            })
          }
          </div>
        </div> : null
      }
      </div>  
  )
}
