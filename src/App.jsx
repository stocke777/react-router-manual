import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


const Router = ({ routes, children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {

    console.log("rerendered")
    const handlePopState = () => {
      console.log("poppped")
      setCurrentPath(window.location.pathname);
    };

    // Listen for changes to the URL
    window.addEventListener('popstate', handlePopState);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  
  }, [])
  

  console.log(currentPath, routes)

  const route = routes.find(route => route.path === currentPath)
  console.log(route)
  if (!route) {
    return <>NOT FOUND {children}</>
  } else {
    return <>{route.component} {children}</>
  }

}

const First = () => {
  return <>First</>
}
const Second = () => {
  return <>Second</>
}
const Third = () => {
  return <>Third</>
}


function App() {
  const [count, setCount] = useState(0)

  const routes = [{
    path: "/First",
    component: <First />
  }, {
    path: "/Second",
    component: <Second />
  }, {
    path: "/Third",
    component: <Third />
  }]


  const handleClick = (e, to) => {
    e.preventDefault()
    console.log(to)
    window.history.pushState({}, '', to)
    console.log(window.history)
  }

  return (
    <>
      <Router routes={routes}><a onClick={(e) => handleClick(e, "/First")} href='/First'>First</a>
        <a onClick={(e) => handleClick(e,'/Second' )} href='/Second'>Second</a>
        <a onClick={(e) => handleClick(e, '/Third')} href='/Third'>Third</a></Router>
    </>
  )
}

export default App
