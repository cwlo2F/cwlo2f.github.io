import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"


const AboutPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <h1>About cwlo2F</h1>
      <p>
        cwlo2F는 김기수가 아무렇게나 만든 이름입니다.
        이전에 "틀리게" 만든 이름과 다르다는 성질을 가지고 있습니다.
        이는 cwlo2F가 올바르게 만든 이름임을 함의하지 않습니다.
        GitHub 핸들과 같기도 하고, 어쨌든 블로그에 이름이 필요하기도 했고?
      </p>
      <p>
        주로 Codeforces, AtCoder 등에서의 경쟁 프로그래밍과 BOJ 등 알고리즘 문제 해결에 관한 포스트를 남기고 있습니다.
      </p>
      <h2>cwlo2F를 발음하는 방법</h2>
      <p>
        해시값을 발음하실 줄 아십니까?
      </p>
      <p>
        저는 모르는데, 당분간은 계속 몰랐으면 합니다. 이래서 이름을 잘 지었어야 했는데.
      </p>
      <h1>About Kisoo Kim</h1>
      <p>
        김기수는 수학을 공부하는 작은 학생입니다.
        수학을 잘 못한다고 상상하여 작다고 씁니다.
        정수론에 관심이 있습니다.
      </p>
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