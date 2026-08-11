import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma.js'


// Register User
export const registerUser = async (fullName, email, password) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (existingUser) {
    throw new Error('Email is already registered')
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      passwordHash,
    },
  })

  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
  }
}


// Login User
export const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    throw new Error('Invalid email or password')
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  )

  if (!isPasswordValid) {
    throw new Error('Invalid email or password')
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  )

  return {
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    },
  }
}