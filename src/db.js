import {createClient} from '@supabase/supabase-js'
import { writable } from 'svelte/store'

const supabase = createClient(
  import.meta.env.SNOWPACK_PUBLIC_SUPABASE_URL,
  import.meta.env.SNOWPACK_PUBLIC_SUPABASE_KEY,
)

const userStore = writable(supabase.auth.currentUser)

supabase.auth.onAuthStateChange((event, session) => {
  if (event == 'SIGNED_IN') {
    userStore.set(session.user)
  } else if (event == 'SIGNED_OUT') {
    userStore.set(null)
  }
})

export default {
  get user() {
    return userStore
  },
  signIn(email) {
    return supabase.auth.signIn({email})
  },
  signOut() {
    return supabase.auth.signOut()
  },
  async getBoards() {
    const {body} = await supabase
      .from('boards')
      .select('*')

    return body
  },
  async getBoard(id) {
    const {body} = await supabase
      .from('boards')
      .select('id, title, lists ( id, title, position, cards ( id, description, position ))')
      .eq('id', id)
      .single()

    return body
  },
  async createBoard() {
    const {body} = await supabase
      .from('boards')
      .insert({title: 'Untitled'})

    return body[0]
  },
  async updateBoard(board) {
    const {body} = await supabase
      .from('boards')
      .update({title: board.title})
      .match({id: board.id})

    return body[0]
  },
  async createList(board, title) {
    const {body} = await supabase
      .from('lists')
      .insert({board_id: board.id, title})

    const list = body[0]

    return {...list, cards: []}
  },
  async updateList(list) {
    const {body} = await supabase
      .from('lists')
      .update({title: list.title})
      .match({id: list.id})

    return body[0]
  },
  async createCard(list, description) {
    const {body} = await supabase
      .from('cards')
      .insert({list_id: list.id, description})

    return body[0]
  },
  async updateCard(card) {
    const {body} = await supabase
      .from('cards')
      .update({description: card.description})
      .match({id: card.id})

    return body[0]
  },
}
