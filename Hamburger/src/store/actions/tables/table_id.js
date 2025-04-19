import * as types from '../type.js'

export const TableSelect = (table_id) => {
    return {
        type:types.TABLE_SELECT,
        table_id
    }
}
