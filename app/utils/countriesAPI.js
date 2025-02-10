import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com",  
  cache: new InMemoryCache(),  
});

const GET_COUNTRIES_QUERY = gql`
 query GetCountries {
  countries(filter: { currency: { eq: "USD" } }) {
    name
    code
    languages {
      name
    }
    continent {
      name
    }
  }
 }
 `;

export async function fetchCountries() {
    try {
      const { data } = await client.query({query: GET_COUNTRIES_QUERY});
      return data.countries
    } 
    catch (err) {
      console.error("Error fetching data:", err);
      return([]);
    }
};

