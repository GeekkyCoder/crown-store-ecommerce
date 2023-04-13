import {createSelector} from "reselect"

 const catogoriesSelectorReducer = (state) => state.catogories
 
 export const isLoadingSelector = (state) => state.catogories.isLoading
 
 export const selectCatogories = (createSelector(
    [catogoriesSelectorReducer],
    (catogoriesSlice) => {
        return catogoriesSlice.catogories
    }))
 

export const getCatogories = createSelector(
    [selectCatogories],
    (catogories) => {
        return catogories
    }
)

//  function getCatogories(state){
//     const catogories = state.catogories.catogories
//     return catogories
// }