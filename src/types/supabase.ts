export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      community_event_types: {
        Row: {
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
        }
      }
      community_events: {
        Row: {
          createdAt: string | null
          date: string
          description: string
          id: number
          location: string
          name: string
          numAdults: number
          numChildren: number
          type: number
        }
        Insert: {
          createdAt?: string | null
          date: string
          description?: string
          id?: number
          location?: string
          name: string
          numAdults?: number
          numChildren?: number
          type: number
        }
        Update: {
          createdAt?: string | null
          date?: string
          description?: string
          id?: number
          location?: string
          name?: string
          numAdults?: number
          numChildren?: number
          type?: number
        }
      }
      events: {
        Row: {
          createdAt: string
          date: string
          id: number
          name: string
          numServed: number
        }
        Insert: {
          createdAt?: string
          date: string
          id?: number
          name: string
          numServed?: number
        }
        Update: {
          createdAt?: string
          date?: string
          id?: number
          name?: string
          numServed?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
