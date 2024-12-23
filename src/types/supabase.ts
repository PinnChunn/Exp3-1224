export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string
          title: string
          description: string
          date: string
          time: string
          max_seats: number
          current_seats: number
          price: number
          created_at: string
          updated_at: string
          is_virtual: boolean
        }
        Insert: {
          id?: string
          title: string
          description: string
          date: string
          time: string
          max_seats?: number
          current_seats?: number
          price?: number
          created_at?: string
          updated_at?: string
          is_virtual?: boolean
        }
        Update: {
          id?: string
          title?: string
          description?: string
          date?: string
          time?: string
          max_seats?: number
          current_seats?: number
          price?: number
          created_at?: string
          updated_at?: string
          is_virtual?: boolean
        }
      }
      registrations: {
        Row: {
          id: string
          user_id: string
          event_id: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          event_id: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          event_id?: string
          status?: string
          created_at?: string
        }
      }
    }
  }
}