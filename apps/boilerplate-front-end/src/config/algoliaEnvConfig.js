// ------------------------------------------
// Config Index and Search Client
// ------------------------------------------

import algoliarecommend from '@algolia/recommend'

import algoliasearch from 'algoliasearch'
import { atom, selector } from 'recoil'

// ADJUST THE APIKEY AND APPID TO YOUR OWN
export const searchClientCreds = {
  APIKey: '1bc06bbf6de499f6b826a8a0e6902568',
  appID: '853MYZ81KY',
  // Used to get the Persona Strat and score if you haven't got one you have to create one in you API Keys
  // https://www.algolia.com/doc/rest-api/personalization/#get-the-current-personalization-strategy
  personaStrategyAPIKey: '4983f1e3449111609c1e7688209b787b',
}

// ADJUST THE DEFAULT VALUE TO YOUR MAIN INDEX
export const mainIndex = atom({
  key: 'mainIndex', // unique ID (with respect to other atoms/selectors)
  default: 'flagship_fashion', // default value (aka initial value)
})

// ADJUST THE VALUES FOR EACH INDEX NAME IF YOU HAVE THEM
// IF YOU DO NOT HAVE ONE, IGNORE THE VALUE - DO NOT CHANGE IT
export const indexNames = selector({
  key: 'indexNames', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    return {
      suggestionsIndex: `${get(mainIndex)}_query_suggestions`,
      articlesIndex: `${get(mainIndex)}_articles`,
      injectedContentIndex: `${get(mainIndex)}_influencers`,
    }
  },
})

/* DO NOT ADJUST ANYTHING BEYOND THIS POINT */

export const url = atom({
  key: 'url', // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
})

// This export is a single instance Algolia API client
export const searchClient = algoliasearch(
  searchClientCreds.appID,
  searchClientCreds.APIKey
)

export const recommendClient = algoliarecommend(
  searchClientCreds.appID,
  searchClientCreds.APIKey
)

// ADJUST THE DEFAULT VALUE TO YOUR MAIN INDEX
// This is used in the custom hook to fetch algolia rules which are currently being applied
export const mainIndexClient = searchClient.initIndex('flagship_fashion')
