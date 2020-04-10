import { graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import kebabCase from "lodash/kebabCase"
import PropTypes from "prop-types"
import React from "react"
import Layout from "../components/Layout"
import Link from "../components/Link"
import Chip from '@material-ui/core/Chip'

const TagsPage = ({
                    data: {
                      allMdx: { group },
                      site: {
                        siteMetadata: { title },
                      },
                    },
                    location,
                  }) => (

  <Layout location={location} noMeta="true" title="标签页">
    <div>
      {group.map((tag) => (
        <Chip
          label={`${tag.fieldValue}(${tag.totalCount})`}
          variant="outlined"
          component={"a"}
          clickable
          href={"/tags/" + kebabCase(tag.fieldValue)}
          style={{margin: 4}}
        />
      ))}
    </div>
  </Layout>
)

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired,
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
