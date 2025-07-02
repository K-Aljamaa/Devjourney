'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [connected, setConnected] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        const { data, error } = await supabase.from('test').select('*').limit(1)
        if (error && error.code !== 'PGRST116') { // PGRST116 = table doesn't exist, which is fine
          setError(error.message)
        } else {
          setConnected(true)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    }
    
    testConnection()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      {connected ? (
        <p className="text-green-600">✅ Connected to Supabase!</p>
      ) : error ? (
        <p className="text-red-600">❌ Error: {error}</p>
      ) : (
        <p className="text-blue-600">🔄 Testing connection...</p>
      )}
    </div>
  )
}