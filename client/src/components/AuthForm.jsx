import { useState } from "react";

const AuthForm = ({ setToken }) => {
  const [alert, setAlert] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data;

    if (isSignIn) {
      const result = await fetch("/auth/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      data = await result.json();
    } else {
      const result = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, username, password }),
      });

      data = await result.json();
    }

    if (data.token) {
      setAlert("");
      setToken(data.token);
    } else {
      setAlert(<p>Invalid Login</p>);
    }
  };

  return (
    <>
      <p>
        {isSignIn ? "Sign in" : "Register"} to see trains or{" "}
        <a href="#" onClick={() => setIsSignIn(!isSignIn)}>
          {isSignIn ? "register as a new user" : "sign in"}
        </a>
      </p>
      {alert}
      <form onSubmit={handleSubmit}>
        <label hidden={isSignIn}>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label hidden={isSignIn}>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AuthForm;