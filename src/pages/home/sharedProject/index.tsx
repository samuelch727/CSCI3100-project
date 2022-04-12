import { Auth, API, graphqlOperation} from "aws-amplify";
import { useEffect, useState } from "react";
import awsconfig from "../../../aws-exports";
import * as queries from "../../../graphql/queries";
import * as mutations from "../../../graphql/mutations";

export default function sharedProject(props:any) {
  const [ project, setProject ] = useState<any[]>([]);
  const [ sharedProject, setSharedProject ] = useState<any[]>([]);
  const [uname, setUsername] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    async function AccessLoggedInState() {
      // if user is admin?
      try {
        const user = await Auth.currentAuthenticatedUser();
        // updateUser(user);
        setUsername(user.username);
        setLoggedIn(true);
        console.log(user);
      } catch {
        setLoggedIn(false);
      }
    }

    AccessLoggedInState()
    
    const fetchProject = async ()  => {
        const project = await API.graphql(graphqlOperation(queries.listProjects));
        console.log(project)
        setProject(project.data.listProjects.items)
        // setProject(project.data.items)
        // return project

        const sharedProject = await API.graphql(graphqlOperation(queries.listProjects, {filter: {shareTo: {attributeExists: true}}}))
        console.log(sharedProject.data.listProjects.items)
        setSharedProject(sharedProject.data.listProjects.items)
    };

    fetchProject();

  }, []);

  return (
    <div className="sharedProjectList">
      <h1><b>Projects that Share to you</b></h1>
      {
        loggedIn && sharedProject.map(item => {
          return (
            <li key={item.id}>
              <button onClick={()=>{console.log("Onclick:", item.id)}}>
              {item.projectName}{item.language}{item.updatedAt}{item.shareTo}</button>
            </li>
          )  
        })
      }       
    </div>
  )
}