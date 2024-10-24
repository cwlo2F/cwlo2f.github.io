import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"


const AboutPage = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.title

    return (
        <Layout location={location} title={siteTitle}>
            <h1>About cwlo2F</h1>
            <p>공사중!!!</p>
            <p>잡동사니 블로그</p>
            <h1>About Kisoo Kim</h1>
            <p>김기수는 수학을 공부하는 작은 학생입니다.</p>
        </Layout>
    )
}

export const Head = () => <Seo title="About" />

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`