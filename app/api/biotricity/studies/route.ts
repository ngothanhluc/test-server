import { NextRequest, NextResponse } from 'next/server'
import { saveRequest } from '@/lib/dataStorage'

const AUTH_USER = process.env.AUTH_USER || 'bty_user'
const AUTH_PASS = process.env.AUTH_PASS || 'Testing123!'

function parseBasicAuth(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return null
  }

  try {
    const base64Credentials = authHeader.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
    const [username, password] = credentials.split(':')
    return { username, password }
  } catch {
    return null
  }
}

function checkAuth(username: string, password: string) {
  return username === AUTH_USER && password === AUTH_PASS
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const credentials = parseBasicAuth(authHeader)

  if (!credentials || !checkAuth(credentials.username, credentials.password)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { 
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Biotricity API"',
        },
      }
    )
  }

  try {
    const body = await request.json()
    
    // Save request data
    const savedRequest = await saveRequest({
      method: request.method,
      endpoint: 'api/biotricity/studies',
      headers: Object.fromEntries(request.headers.entries()),
      body,
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    })

    return NextResponse.json({
      message: 'Request received and saved successfully',
      id: savedRequest.id,
      timestamp: savedRequest.timestamp,
    })
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}