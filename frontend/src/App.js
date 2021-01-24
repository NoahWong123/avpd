import './App.scss';
import {
  BrowserRouter,
  Route,
  /*useNavigate,*/
} from 'react-router-dom';
import {
  Switch
} from 'react-router';
import ReportScreen from "./ReportScreen";
import NavBar from "./NavBar";
import React, {useEffect, useState} from "react";
import axios from "axios";
import configData from "./config.json"
import LoginButton from "./user/login-button";
import SignupButton from "./user/signup-button";
import {useAuth0} from "@auth0/auth0-react";
import LogoutButton from "./user/logout-button";

function App() {
  return (
    <Main />
  );
}

function Main() {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/report" component={ReportScreen}/>
      <Route exact path="/home" component={AuthenticatedHome}/>
      <Route exact path="/create-classroom" component={CreateClassroomForm}/>
    </Switch>
  )
}

function Home(props) {
  const { isAuthenticated } = useAuth0()

  return isAuthenticated ? AuthenticatedHomeBuffer(props) : UnauthenticatedHome(props)
}

function UnauthenticatedHome(props) {
  return (
    <div>
      <LoginButton/>
      <SignupButton/>
    </div>
  )
}

function AuthenticatedHome(props) {
  const data = props.location.state

  if (data['user_type'] === 'student') {
    return <StudentHomePage props={props}/>
  } else {
    return <InstructorHomePage props={props}/>
  }
}

function AuthenticatedHomeBuffer(props) {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();

  const retrieveUserInfo = async () => {
    try {
      const token = await getAccessTokenSilently();

      await axios({
        method: 'get',
        url: `${serverUrl}/user`,
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then((response) => {
        props.history.push('/home', response.data)
      }, (error) => {
        console.log(error)
      });
    } catch (error) {
      console.log(error)
    }
  }

  retrieveUserInfo().then();

  return <div/>
}

function StudentHomePage(props) {
  return (
    <div>
      <p>Student</p>
      <LogoutButton/>
    </div>
  )
}

function InstructorHomePage(props) {
  return (
    <div>
      <p>Instructor</p>
      <LogoutButton/>
      <Classrooms props={props}/>
    </div>
  )
}

function Classrooms(props) {
  console.log('hi')
  console.log(props)
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();
  const [classroomTitles, setClassroomTitles] = useState();

  const retrieveClassrooms = async () => {
    const token = await getAccessTokenSilently();

    await axios({
      method: 'get',
      url: `${serverUrl}/instructor/classrooms`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then((response) => {
      setClassroomTitles(
        response.data.map((data) => <li>{data['title']}</li>)
      );
    });
  }

  retrieveClassrooms().then()

  return (
    <div>
      <ul>
        {classroomTitles}
      </ul>
      <button onClick={() => props.history.push('/create-classroom')}>Create Classroom</button>
    </div>
  )
}

function CreateClassroomForm(props) {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [title, setTitle] = useState("");
  const { getAccessTokenSilently } = useAuth0();

  function handleChange(event) {
    setTitle(event.target.value);
  }

  function handleSubmit(event) {
    const apiCreateClassroom = async () => {
      const token = await getAccessTokenSilently();

      await axios({
        method: 'post',
        url: `${serverUrl}/instructor/classrooms`,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: {
          'title': title
        },
      }).then((response) => {
          props.history.push('/')
        }
      )
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={handleChange}/>
      </label>
      <input type="submit" value="Submit"/>
    </form>
  )
}

// This is a react functional component. It is basically a class disguised as a function. Functional components need to
// return JSX. JSX is just HTML with some added quirks so that you can write it directly within javascript instead of
// as its own file. The JSX that is returned whenever this component is evaluated is what the component will look like.
// function Home(props) {
//   const [lastEssay, setLastEssay] = useState("");
//
//   function gradeEssay() {
//     console.log("Hi")
//     console.log(lastEssay)
//     if (lastEssay === "") {
//       return;
//     }
//
//     const url = configData['SERVER_URL'] + lastEssay + '/report';
//     const HTTP = axios.create({
//       withCredentials: false
//     });
//
//     const resp = HTTP.get(url);
//     props.history.push('/report', resp.data);
//   }
//
//   // This is what will be rendered whenever this component is called.
//   return (
//     <div className="HomePage">
//       <NavBar/>
//       <EssayUploadForm informParent={loc => setLastEssay(loc)}/>
//       <button
//         className="btn grade-essay-btn"
//         onClick={gradeEssay}
//       >
//         Grade Essay
//       </button>
//     </div>
//   )
// }
//
// function EssayUploadForm(props) {
//   function handleSubmit(event) {
//     event.preventDefault();
//     if (essay === null) {
//       return;
//     }
//
//     const url = configData["SERVER_URL"] + "/users/steve_beve/essays";
//     const formData = new FormData();
//
//     for (let key in essay) {
//       formData.append(key, essay[key])
//     }
//     // const xhr = XMLHttpRequest();
//
//     // headers: {
//     //   "Content-Type": "multipart/form-data"
//     // },
//
//     fetch(url, {
//       method: 'POST',
//       // headers: {
//       //   'content-type': 'multipart/form-data'
//       // },
//       body: formData
//     }).then(
//       resp => console.log(resp)
//     ).catch(
//       error => console.log(error)
//     );
//
//     // axios.post(url, formData, {
//     //   headers: {
//     //     'content-type': 'multipart/form-data',
//     //     'Access-Control-Allow-Origin': '*'
//     //   },
//     //   timeout: 21432140231598213653
//     // }).then((resp) => {
//     //   const location = resp.headers['Location'];
//     //   props.informParent(location);
//     // }, (error) => {
//     //   console.log(error.message);
//     //   console.log(error.code)
//     // });
//   }
//
//   const [essay, setEssay] = useState(null)
//
//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="btn">
//         File Upload
//       </div>
//       <h1>
//         File Upload
//       </h1>
//       <button className="btn" type="submit">
//         Upload
//       </button>
//       <input type="file" onChange={e => setEssay(e.target.files[0])}/>
//     </form>
//   )
// }

export default App;
