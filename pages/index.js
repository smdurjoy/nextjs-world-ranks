import Layout from "../components/Layout/Layout";
import styles from '../styles/Home.module.css'
import SearchInput from "../components/SearchInput/SearchInput";
import CountriesTable from "../components/CountryTable/CountriesTable";
import {useState} from "react";

export default function Home({ countries }) {
    const [keyword, setKeyword] = useState("")

    const filteredCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(keyword) ||
        country.region.toLowerCase().includes(keyword) ||
        country.subregion.toLowerCase().includes(keyword)
    )

    const handleInputChange = (e) => {
        setKeyword(e.target.value)
    }

    return (
      <Layout>
          <div className={styles.inputContainer}>
              <div className={styles.counts}>Found {countries.length} countries</div>
              <div className={styles.input}>
                  <SearchInput placeholder="Filter by Name, Region or SubRegion" onChange={handleInputChange}/>
              </div>
          </div>
          <CountriesTable countries={filteredCountries}/>
      </Layout>
    )
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all")
  const countries = await res.json();
  return {
    props: {
      countries
    }
  }
}