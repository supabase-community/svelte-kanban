import { createClient } from '@supabase/supabase-js'
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
  boards: {
    async all() {
      const {body} = await supabase
        .from('boards')
        .select('*')
        .order('position')

      return body
    },

    async get(id) {
      const {body} = await supabase
        .from('boards')
        .select('id, title, lists ( id, title, position, cards ( id, description, position ))')
        .eq('id', id)
        .order('position')
        .order('position', {foreignTable: 'lists'})
        .order('position', {foreignTable: 'lists.cards'})
        .single()

      return body
    },

    async create(board) {
      const {body} = await supabase
        .from('boards')
        .insert(board)

      return body[0]
    },

    async update(board) {
      const {body} = await supabase
        .from('boards')
        .update({title: board.title})
        .match({id: board.id})

      return body[0]
    },

    async sort(board) {
      const {body} = await supabase
        .rpc('sort_board', {
          board_id: board.id,
          list_ids: board.lists.map(list => list.id)
        })

      return body
    }
  },

  lists: {
    async create(board, data) {
      const {body} = await supabase
        .from('lists')
        .insert({board_id: board.id, ...data})

      const list = body[0]

      return {...list, cards: []}
    },

    async update(list) {
      const {body} = await supabase
        .from('lists')
        .update({title: list.title})
        .match({id: list.id})

      return body[0]
    },

    async sort(list) {
      const {body} = await supabase
        .rpc('sort_list', {
          list_id: list.id,
          card_ids: list.cards.map(card => card.id)
        })

      return body
    }
  },

  cards: {
    async create(list, data) {
      const {body} = await supabase
        .from('cards')
        .insert({list_id: list.id, ...data})

      return body[0]
    },

    async update(card) {
      const {body} = await supabase
        .from('cards')
        .update({description: card.description})
        .match({id: card.id})

      return body[0]
    },
  }
}
