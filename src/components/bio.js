/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            email
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <a href="/about">
        <StaticImage
          className="bio-avatar"
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/kisoo-kim.jpeg"
          width={50}
          height={50}
          quality={95}
          alt="Kisoo Kim's profile picture"
        />
      </a>
      {author?.name && (
        <p>
          <strong>{author.name}</strong>는 {author.summary}
          <br></br>
          {social.email}
          {/* <a href={`https://twitter.com/${social?.twitter || ``}`}>
            You should follow them on Twitter
          </a> */}
        </p>
      )}
    </div>
  )
}

export default Bio
