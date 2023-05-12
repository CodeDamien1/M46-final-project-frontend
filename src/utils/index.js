import {writeCookie} from '../common'

export const loginUser = async (username, password) =>
{
    console.log('login User - username ' + username)
    console.log('login User - password ' + password)

    try 
    {
        const response = await fetch
        (`${process.env.REACT_APP_BASE_URL}/users/login`,
            {method: 'POST'
            ,headers: {"Content-Type": "application/json"}
            ,body: JSON.stringify
                (
                    {"username":username
                    ,"password":password
                    }
                )
            }
        )

        const data = await response.json()
        console.log('After response: ' + JSON.stringify(data))
        
        writeCookie('jwt_token', data.user.token, 7)
        
        if (data.error)
        {
            return {message:data.error, loginValid:false}
        }
        else
        {
            return {user: data.user, loginValid:true}
        }

    } 
    catch (error) 
    {
        console.log('Login User: ' + error)  
        return {message:'Login error (index.js) - ' + error, loginValid:false}     
    }
}

export const registerUser = async (username, password) =>
{
    try 
    {
        const response = await fetch
        (`${process.env.REACT_APP_BASE_URL}/users/register`,
            {method: 'POST'
            ,headers: {"Content-Type": "application/json"}
            ,body: JSON.stringify
                (
                    {"username":username
                    ,"password": password
                    }
                )
            }
        )

        const data = await response.json()

        if (data.errorMessage)
        {
            return {message:data.errorMessage, userCreated:false}
        }
        else
        {
            return {message:data.message, user:data.user, userCreated:true}
        }
    } 
    catch (error) 
    {
        console.log(error) 
        return {message:'Create User error (index.js) - ' + error.message, userCreated:false}      
    }
}

export const getAllUsers = async (jwtToken) => 
{   
    try 
    {
        const response = await fetch
        (`${process.env.REACT_APP_BASE_URL}/users/getallusers`, 
        {
            method: "GET",
            headers: 
                {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
                },
        })
    
        const data = await response.json();
    
        if (data.errrorMessage)
        {
            return {message:'Get Users error (index.js) - ' + data.errorMessage}
        }
        else
        {
            return {users:data.users, message:data.message}
        }
    
    } 
    catch (error) 
    {
        console.log(error)
        return {message:'Get Users error (index.js) - ' + error.message}
    }
    
}

export const deleteUser = async (username) =>
{
    try 
    {
        const response = await fetch
        (`${process.env.REACT_APP_BASE_URL}/users/deleteuser`,
            {method: 'DELETE'
            ,headers: {"Content-Type": "application/json"}
            ,body: JSON.stringify
            (
                {"username":username}
            )
            }
        )

        const data = await response.json() 
        
        if (data.errorMessage)
        {
            return {deleteSuccessfull:false, message:data.errorMessage}
        }
        else
        {
            return {deleteSuccessfull:true, message:'User ' + username + ' successfully deleted from the table Users'}
        }
    } 
    catch (error) 
    {
        console.log(error)    
        return {message:'Delete error (index.js) - ' + error.message}
    
    }
}
