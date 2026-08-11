import { registerUser, loginUser } from '../services/authService.js'


// Register
export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body

    const user = await registerUser(fullName, email, password)

    res.status(201).json({
      message: 'Registration successful',
      user,
    })
  } catch (error) {
    console.error(error)

    res.status(400).json({
      message: error.message,
    })
  }
}


// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const result = await loginUser(email, password)

    res.status(200).json({
      message: 'Login successful',
      ...result,
    })
  } catch (error) {
    console.error(error)

    res.status(401).json({
      message: error.message,
    })
  }
}