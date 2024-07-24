import { Link, useNavigate } from "react-router-dom";
import {LabelBox} from "./LableBox.tsx";
import React, {useState} from "react";
import {SignInInput, SignUpInput} from "@dev-rvk/medium-common";
import axios from "axios";
import { SIGNIN_URL, SIGNUP_URL } from "../config.ts";

export const AuthSignIn = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState<SignInInput> ({
        email: '',
        password: ''
      })
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const {name, value} = e.target;
          setFormData(prevData => ({...prevData, [name]: value}))
      }
      async function handleSubmit(){
          try {
            const response = await axios.post(SIGNIN_URL, formData);
            const jwt = response.data;
            if (typeof jwt === 'string') {
              localStorage.setItem('token', jwt);
              navigate('/blogs');
              console.log(response);
            } else {
              throw new Error('Invalid token received');
            }
          } catch (error) {
            // alert the user
            alert('Cannot Sign In');
            console.error(error);
          }
        }
    
      return(
              <div className="h-screen flex justify-center items-center flex-col align-centre">
                  <div>
                      <div className="text-left text-3xl font-bold px-12">Welcome back</div>
                      <div className="text-left text-md font-extralight mt-2 text-gray-400 px-12">Don't have an account? <Link className={"underline"} to="/signup">Register</Link></div>
                      <div>
                          <LabelBox name="email" value={formData.email} fieldName="Email" placeHolder="johndoe@email.com" type="email" onChange={handleChange} />
                          <LabelBox name="password" value={formData.password} fieldName="Password" placeHolder="******" type="password" onChange={handleChange} />
                      </div>
                      <div>
                          <button className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-6" type="submit" onClick={handleSubmit}>Continue</button>
                      </div>
                  </div>
              </div>    
    )
};

export const AuthSignUp = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState<SignUpInput> ({
        email: '',
        name: '',
        password: ''
      })
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const {name, value} = e.target;
          setFormData(prevData => ({...prevData, [name]: value}))
      }
      async function handleSubmit(){
        try {
          const response = await axios.post(SIGNUP_URL, formData);
          const jwt = response.data;
          if (jwt) {
            localStorage.setItem('token', `Bearer ${jwt}`);
            navigate('/blogs');
            console.log(response);
          }
        } catch (error) {
          // alert the user
          alert("Cannot SignUp");
          console.error(error);
        }
      }
    
      return(
              <div className="h-screen flex justify-center items-center flex-col align-centre">
                  <div>
                      <div className="text-left text-3xl font-bold px-12">Create an Account</div>
                      <div className="text-left text-md font-extralight mt-2 text-gray-400 px-12">Already have an account? <Link className={"underline"} to="/signin">Log In</Link></div>
                      <div>
                          <LabelBox name='name' value={formData.name || ""} fieldName="Name" placeHolder="John Doe" type="text" onChange={handleChange}/>
                          <LabelBox name='email' value={formData.email} fieldName="Email" placeHolder="johndoe@email.com" type="email" onChange={handleChange} />
                          <LabelBox name='password' value={formData.password} fieldName="Password" placeHolder="******" type="password" onChange={handleChange} />
                      </div>
                      <div>
                          <button className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-6" type="submit" onClick={handleSubmit}>Register</button>
                      </div>
                  </div>
              </div>    
    )
};