const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const productPageTemplate = path.resolve('./src/templates/product-page.tsx')
    resolve(
      graphql(
        `
          {
            allContentfulProductPage {
              edges {
                node {
                  slug
                  contentful_id
                }
              }
            }
          }
        `,
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const pages = result.data.allContentfulProductPage.edges
        console.log(result.data.allContentfulProductPage)
        pages.forEach((page) => {
          createPage({
            path: `/produkter/${page.node.slug}/`,
            component: productPageTemplate,
            context: {
              slug: page.node.slug,
              pageId: page.node.contentful_id,
            },
          })
        })
        resolve()
      }),
    )
  })
}
