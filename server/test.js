
import supabase from './db2'

const { data, error } = await supabase
.from('users')
.select()

console.log(data)